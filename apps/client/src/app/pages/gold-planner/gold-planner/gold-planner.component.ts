import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, of, pluck, startWith } from "rxjs";
import { goldTasks } from "../gold-tasks";
import { GoldTask, Gate, resetType } from "../gold-task";
import { LostarkTask } from "../../../model/lostark-task";
import { RosterService } from "../../../core/database/services/roster.service";
import { SettingsService } from "../../../core/database/services/settings.service";
import { TasksService } from "../../../core/database/services/tasks.service";
import { CompletionService } from '../../../core/database/services/completion.service';
import { Character } from "../../../model/character/character";
import { TimeService } from "../../../core/time.service";
import { ManualWeeklyGoldEntry, Settings } from "../../../model/settings";
import { UpdateData } from "@angular/fire/firestore";
import { getCompletionEntry } from '../../../core/get-completion-entry-key';
import { Completion } from "../../../model/completion";

interface chestsData {
  task?: LostarkTask,
  line: PlannerLine,
  goldDetails: {
    hide: boolean | false,
    takingChest: boolean,
    indeterminateTakingChest: boolean,
    takingGold: boolean,
    indeterminateTakingGold: boolean,
    canRunHM: boolean,
    canRunSolo: boolean,
    goldReward: number
    chestPrice: number,
    runningMode: string,
  }[],
}

interface PlannerLine {
  name: string;
  gTask: GoldTask;
  expand?: boolean;
  gate?: Gate;
  parent?: PlannerLine
}

interface GoldPlannerDisplay {
  chestsData: chestsData[];
  chaos: Record<string, number>;
  other: Record<string, number>;
  tracking: Record<string, boolean>;
  raidModesForGoldPlanner: Record<string, string>;
  total: number[];
  grandTotal: number;
  boundGold: number;
  unboundGold: number;
  plannerLines: PlannerLine[]
}

@Component({
  selector: "lostark-helper-gold-planner",
  templateUrl: "./gold-planner.component.html",
  styleUrls: ["./gold-planner.component.less"]
})
export class GoldPlannerComponent {
  public rawRoster$ = this.rosterService.roster$;
  public roster$ = this.rosterService.roster$.pipe(
    map(roster => roster.characters)
  );

  public settings$ = this.settings.settings$;
  public tasks$ = this.tasksService.tasks$;
  public completion$ = this.completionService.completion$;

  public tracking$ = this.settings.settings$.pipe(pluck("goldPlannerConfiguration"));
  public manualGoldEntries$ = this.settings.settings$.pipe(pluck("manualGoldEntries"));
  public raidModesForGoldPlanner$ = this.settings.settings$.pipe(pluck("raidModesForGoldPlanner"))

  public display$: Observable<GoldPlannerDisplay> = combineLatest([
    this.roster$,
    this.tasks$,
    this.tracking$,
    of(goldTasks),
    this.manualGoldEntries$,
    this.raidModesForGoldPlanner$,
    this.timeService.lastWeeklyReset$,
    this.timeService.lastBiWeeklyReset$,
    this.timeService.lastBiWeeklyOffsetReset$,
    this.rawRoster$,
    this.completion$
  ]).pipe(
    map(([roster, tasks, tracking, gTasks, manualGoldEntries, raidModesForGoldPlanner, lastWeeklyReset, lastBiWeeklyReset, lastBiWeeklyOffsetReset, rawRoster, completion]) => {
      const plannerLines: PlannerLine[] = [];
      gTasks.forEach(gTask => {

        const raidLine: PlannerLine = {
          name: gTask.name,
          gTask: gTask,
          expand: tracking[this.getExpandRaidFlag(gTask)]
        }

        if (gTask.gates.length === 1) {
          // For raids with only 1 gate, we add that gate to the main raid line
          // Further code will check for its presence to adapt display
          raidLine.gate = gTask.gates[0]
          plannerLines.push(raidLine)
        } else {
          // If a raid has several gates, we need several lines
          // - 1 main line for the raid that will always be visible and explandable
          // - 1 child line (which has the main line as parent) per gate, that will only be visible when parent line is expanded
          plannerLines.push(raidLine)
          gTask.gates.forEach(gate => {
            plannerLines.push({
              name: gate.name,
              gTask: gTask,
              gate: gate,
              parent: raidLine
            })
          })
        }
      })

      const chestsData = plannerLines
        .map(line => {
          let task: LostarkTask | undefined
          if (line.gate && line.gate.taskName) {
            task = tasks.find(t => t.label === line.gate?.taskName && !t.custom);
          } else {
            task = tasks.find(t => t.label === line.gTask.taskName && !t.custom);
          }
          return {
            task,
            line
          };
        })
        .filter(({ task }) => {
          return !task || (task.enabled
            && roster.some(c => c.ilvl >= (task.minIlvl || 0) && c.ilvl <= (task.maxIlvl || Infinity)));
        })
        .map(({ line, task }) => {
          const lineReset = this.findLineReset(lastWeeklyReset, lastBiWeeklyReset, lastBiWeeklyOffsetReset, line)

          const goldDetails = roster.map((character) => {

            const cantDoTask = task && (!task.enabled || character.ilvl < (task.minIlvl || 0) || character.ilvl >= (task.maxIlvl || Infinity));

            // Check if the cell (raid or gate) should be visible when looking at Remaining for the week
            let hideAlreadyDoneRaidOrGate

            if (line.gate) {
              hideAlreadyDoneRaidOrGate = this.shouldHideGateBasedOnWeeklyCompletion(line.gate, character, tasks, tracking, completion, lineReset, task)
            } else {
              hideAlreadyDoneRaidOrGate = line.gTask.gates.every(gate => {
                return this.shouldHideGateBasedOnWeeklyCompletion(gate, character, tasks, tracking, completion, lineReset, task)
              })
            }

            // Used to activate/deactivate the Hard option on the mode selection radio 
            let canRunHM
            if (line.gate) {
              canRunHM = this.canRunHardModeForGateAndCharacter(line.gate, character)
            } else {
              canRunHM = line.gTask.gates.every(gate => {
                return this.canRunHardModeForGateAndCharacter(gate, character)
              })
            }

            // Determine state of Taking Gold and Taking Chest tick boxes
            // They can be indeterminate for main raid line if gate lines have different values
            let takingGold = false
            let indeterminateTakingGold = false
            let takingChest = false
            let indeterminateTakingChest = false

            if (line.gate) {
              takingGold = tracking[this.getGoldTakingFlagNameForGate(character.name, line.gate)];
              indeterminateTakingGold = false
              takingChest = tracking[this.getChestTakingFlagNameForGate(character.name, line.gate)];
              indeterminateTakingChest = false
            } else {
              if (tracking['hideAlreadyDoneTasks']) {
                const firstUndoneGate = line.gTask.gates.find(gate => !this.shouldHideGateBasedOnWeeklyCompletion(gate, character, tasks, tracking, completion, lineReset, task))

                takingGold = firstUndoneGate ? tracking[this.getGoldTakingFlagNameForGate(character.name, firstUndoneGate)] : false
                indeterminateTakingGold = firstUndoneGate ? !line.gTask.gates.every(gate => {
                  if (this.shouldHideGateBasedOnWeeklyCompletion(gate, character, tasks, tracking, completion, lineReset, task)) {
                    return true
                  } else {
                    return tracking[this.getGoldTakingFlagNameForGate(character.name, gate)] === takingGold
                  }
                }) : false

                takingChest = firstUndoneGate ? tracking[this.getChestTakingFlagNameForGate(character.name, firstUndoneGate)] : false
                indeterminateTakingChest = firstUndoneGate ? !line.gTask.gates.every(gate => {
                  if (this.shouldHideGateBasedOnWeeklyCompletion(gate, character, tasks, tracking, completion, lineReset, task)) {
                    return true
                  } else {
                    return tracking[this.getChestTakingFlagNameForGate(character.name, gate)] === takingChest
                  }
                }) : false
              } else {
                takingGold = tracking[this.getGoldTakingFlagNameForGate(character.name, line.gTask.gates[0])]
                indeterminateTakingGold = !line.gTask.gates.every(gate => {
                  return this.characterHasRequiredILvlForGate(gate, character, tasks, task) ?
                    tracking[this.getGoldTakingFlagNameForGate(character.name, gate)] === takingGold
                    : true
                })

                takingChest = tracking[this.getChestTakingFlagNameForGate(character.name, line.gTask.gates[0])];
                indeterminateTakingChest = !line.gTask.gates.every(gate => {
                  return this.characterHasRequiredILvlForGate(gate, character, tasks, task) ?
                    tracking[this.getChestTakingFlagNameForGate(character.name, gate)] === takingChest
                    : true
                })
              }
            }

            let goldReward = 0
            let chestPrice = 0
            if (line.gate) {
              const runningMode = line.gate.modes.find(mode => mode.name === this.getRunningModeFlag(raidModesForGoldPlanner, character.name, line))
              goldReward = runningMode ? runningMode.goldILvlLimit > character.ilvl ? runningMode.goldReward : 0 : 0
              chestPrice = runningMode ? runningMode.chestPrice : 0
            } else {
              line.gTask.gates.forEach(gate => {
                if (!this.shouldHideGateBasedOnWeeklyCompletion(gate, character, tasks, tracking, completion, lineReset, task)) {
                  const runningMode = gate.modes.find(mode => mode.name === this.getRunningModeFlagForGate(raidModesForGoldPlanner, character.name, gate))
                  goldReward += runningMode ? runningMode.goldILvlLimit > character.ilvl ? runningMode.goldReward : 0 : 0
                  chestPrice += runningMode ? runningMode.chestPrice : 0
                }
              })
            }

            const goldDetail = {
              hide: false || cantDoTask || !character.weeklyGold || (task ? getCompletionEntry(rawRoster.trackedTasks, character, task, true) === false : false) || hideAlreadyDoneRaidOrGate,
              runningMode: this.getRunningModeFlag(raidModesForGoldPlanner, character.name, line),
              takingChest,
              indeterminateTakingChest,
              takingGold,
              indeterminateTakingGold,
              canRunHM,
              canRunSolo: line.gTask.gates[0].modes.find(mode => mode.name === 'Solo') !== undefined,
              goldReward,
              chestPrice
            }

            return goldDetail;
          })

          return {
            task,
            line,
            goldDetails
          };
        })
        .filter(({ goldDetails }) => {
          return goldDetails.some(f => !f.hide);
        });

      const chaos = roster.reduce((acc, c) => {
        return {
          ...acc,
          [c.name]: this.getManualGoldEntry("chaos", c.name, lastWeeklyReset, manualGoldEntries || {})
        };
      }, {});

      const other = roster.reduce((acc, c) => {
        return {
          ...acc,
          [c.name]: this.getManualGoldEntry("other", c.name, lastWeeklyReset, manualGoldEntries || {})
        };
      }, {});

      let unboundGold = 0;
      let boundGold = 0;

      const total = chestsData
        .filter(row => row.task && row.line && row.line.gate)
        .reverse()
        .reduce((acc, row) => {
          const { goldDetails } = row;
          goldDetails.forEach((flag, i) => {
            if (!flag.hide) {
              if (flag.takingGold) {
                if (flag.runningMode === 'Solo') {
                  boundGold += flag.goldReward
                }
                else {
                  unboundGold += flag.goldReward
                }

                acc[i] += flag.goldReward
              }

              if (flag.takingChest) {
                acc[i] -= flag.chestPrice
              }
            }
          });
          return acc;
        }, new Array(roster.length).fill(0));

      roster.forEach((char, i) => {
        total[i] += chaos[char.name];
        total[i] += other[char.name];
      });

      return {
        chestsData: chestsData,
        total,
        tracking,
        raidModesForGoldPlanner,
        grandTotal: total.reduce((acc, v) => acc + v, 0),
        boundGold,
        unboundGold,
        chaos,
        other,
        plannerLines
      };
    })
  );

  private windowResize$ = new BehaviorSubject<void>(void 0);

  public scrolling$ = combineLatest([this.roster$, this.display$, this.windowResize$]).pipe(
    map(([roster, display]) => {
      let y = window.innerHeight - 270;
      if (display.tracking['showExplanations']) {
        y = y - 155
      }

      const scrolling: { x?: string | null, y: string | null } = { y: `${y}px`, x: "1200px" };
      const widthPerCharacter = window.innerWidth < 992 ? 80 : 120;
      if (window.innerWidth < widthPerCharacter * roster.length + 200) {
        scrolling.x = `${window.innerWidth - 64 - 48 - 190 - 20}px`;
      }
      return scrolling;
    }),
    startWith({ x: null, y: null })
  );

  // Utilities for chestsData calculation
  private canRunHardModeForGateAndCharacter(gate: Gate, character: Character): boolean {
    const nmMode = gate.modes.find(mode => mode.name === 'NM')
    if (nmMode && nmMode.HMThreashold) {
      return nmMode.HMThreashold <= character.ilvl
    } else {
      return true
    }
  }

  private shouldHideGateBasedOnWeeklyCompletion(gate: Gate, character: Character, taskList: LostarkTask[], tracking: Record<string, boolean>, completion: Completion, weeklyReset: number, task?: LostarkTask): boolean {
    const tempTask = taskList.find(t => t.label === gate.taskName && !t.custom);

    if (!this.characterHasRequiredILvlForGate(gate, character, taskList, task)) {
      return true
    } else {
      const completionFlag = task && getCompletionEntry(completion.data, character, tempTask ? tempTask : task);
      const gateAlreadyDone = completionFlag && completionFlag.amount >= parseInt(gate.completionId.substring(gate.completionId.length - 1)) && completionFlag.updated > weeklyReset
      const hideAlreadyDoneGate = tracking['hideAlreadyDoneTasks'] && gateAlreadyDone === true
      return hideAlreadyDoneGate
    }
  }

  private characterHasRequiredILvlForGate(gate: Gate, character: Character, taskList: LostarkTask[], task?: LostarkTask): boolean {
    const tempTask = taskList.find(t => t.label === gate.taskName && !t.custom);
    if (tempTask && tempTask.minIlvl > character.ilvl) {
      return false
    } else if (task && task.minIlvl > character.ilvl) {
      return false
    } else {
      return true
    }
  }

  private findLineReset(lastWeeklyReset: number, lastBiWeeklyReset: number, lastBiWeeklyOffsetReset: number, line: PlannerLine) {
    if (line.gate && line.gate.reset) {
      switch (line.gate.reset) {
        case resetType.biWeekly:
          return lastBiWeeklyReset
        case resetType.biWeeklyOffset:
          return lastBiWeeklyOffsetReset
        default:
          return lastWeeklyReset
      }
    } else {
      return lastWeeklyReset
    }
  }

  // Taking Gold tick box
  private getGoldTakingFlagNameForGate(characterName: string, gate: Gate): string {
    return `${characterName}:gold:taking:${gate.name}`;
  }

  setGoldTakingFlag(settingsKey: string, tracking: Record<string, boolean>, line: PlannerLine, character: Character, flag: boolean): void {
    if (!line.gate) {
      line.gTask.gates.forEach(gate => {
        this.setGoldTakingFlagForGate(settingsKey, tracking, gate, character, flag)
      })
    } else {
      this.setGoldTakingFlagForGate(settingsKey, tracking, line.gate, character, flag)
    }
  }

  setGoldTakingFlagForGate(settingsKey: string, tracking: Record<string, boolean>, gate: Gate, character: Character, flag: boolean): void {
    tracking[this.getGoldTakingFlagNameForGate(character.name, gate)] = flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  //Taking Chest tick box
  private getChestTakingFlagNameForGate(characterName: string, gate: Gate): string {
    return `${characterName}:gold:${gate.name}`;
  }

  setChestTakingFlag(settingsKey: string, tracking: Record<string, boolean>, line: PlannerLine, character: Character, flag: boolean): void {
    if (!line.gate) {
      line.gTask.gates.forEach(gate => {
        this.setChestTakingFlagForGate(settingsKey, tracking, gate, character, flag)
      })
    } else {
      this.setChestTakingFlagForGate(settingsKey, tracking, line.gate, character, flag)
    }
  }

  setChestTakingFlagForGate(settingsKey: string, tracking: Record<string, boolean>, gate: Gate, character: Character, flag: boolean): void {
    tracking[this.getChestTakingFlagNameForGate(character.name, gate)] = flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  // Running mode selection utilities
  private getRunningModeFlag(raidModesForGoldPlanner: Record<string, string>, characterName: string, line: PlannerLine): string {
    if (line.gate) {
      return this.getRunningModeFlagForGate(raidModesForGoldPlanner, characterName, line.gate)
    } else {
      const gateOneMode = this.getRunningModeFlagForGate(raidModesForGoldPlanner, characterName, line.gTask.gates[0])
      return line.gTask.gates.every(gate => {
        return this.getRunningModeFlagForGate(raidModesForGoldPlanner, characterName, gate) === gateOneMode
      }) ? gateOneMode : "Mixed"
    }
  }

  setRunningModeFlag(settingsKey: string, raidModesForGoldPlanner: Record<string, string>, line: PlannerLine, character: Character, flag: string): void {
    if (!line.gate || flag === "Solo") {
      line.gTask.gates.forEach(gate => {
        this.setRunningModeFlagForGate(settingsKey, raidModesForGoldPlanner, gate, character, flag)
      })
    } else if (raidModesForGoldPlanner[this.getRunningModeFlagNameForGate(character.name, line.gate)] === 'Solo') {
      line.gTask.gates.forEach(gate => {
        this.setRunningModeFlagForGate(settingsKey, raidModesForGoldPlanner, gate, character, "")
      })
      this.setRunningModeFlagForGate(settingsKey, raidModesForGoldPlanner, line.gate, character, flag)
    } else {
      this.setRunningModeFlagForGate(settingsKey, raidModesForGoldPlanner, line.gate, character, flag)
    }
  }

  private getRunningModeFlagForGate(raidModesForGoldPlanner: Record<string, string>, characterName: string, gate: Gate): string {
    return raidModesForGoldPlanner[this.getRunningModeFlagNameForGate(characterName, gate)];
  }

  setRunningModeFlagForGate(settingsKey: string, raidModesForGoldPlanner: Record<string, string>, gate: Gate, character: Character, flag: string): void {
    raidModesForGoldPlanner[this.getRunningModeFlagNameForGate(character.name, gate)] = flag;
    this.settings.patch({
      $key: settingsKey,
      raidModesForGoldPlanner: raidModesForGoldPlanner
    });
  }

  private getRunningModeFlagNameForGate(characterName: string, gate: Gate): string {
    return `${characterName}:runningMode:${gate.name}`;
  }

  // Raid Row Expander utilities
  private getExpandRaidFlag(gTask: GoldTask): string {
    return `expandRaid:${gTask.name}`;
  }

  setExpandRaidFlag(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, flag: boolean): void {
    tracking[this.getExpandRaidFlag(gTask)] = flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  // Toggle between Full Planning and Remaining for the week
  setHideAlreadyDoneTasksFlag(settingsKey: string, tracking: Record<string, boolean>, flag: boolean): void {
    tracking['hideAlreadyDoneTasks'] = flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  // Manuel gold entries utilities
  private getManualGoldEntry(type: string, characterName: string, weeklyReset: number, data: Record<string, ManualWeeklyGoldEntry>): number {
    const entry: ManualWeeklyGoldEntry = data[`${type}:${characterName}`] || { amount: 0, timestamp: Date.now() };
    if (entry.timestamp < weeklyReset) {
      return 0;
    }
    return entry.amount || 0;
  }

  public setManualGold(settingsKey: string, type: string, characterName: string, newValue: number): void {
    this.settings.updateOne(settingsKey, {
      [`manualGoldEntries.${type}:${characterName}`]: { amount: this.manualGoldFormatter(newValue) || 0, timestamp: Date.now() }
    } as unknown as UpdateData<Settings>);
  }

  // Show/Hide explanations
  toggleExplanations(settingsKey: string, tracking: Record<string, boolean>): void {
    tracking['showExplanations'] = tracking['showExplanations'] ? !tracking['showExplanations'] : true;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  //Miscellaneous
  trackByIndex(index: number): number {
    return index;
  }

  manualGoldFormatter(value: number | string): number {
    if (!value || typeof value === 'string') {
      return 0;
    }
    return Math.floor(value);
  };

  constructor(private rosterService: RosterService,
    private tasksService: TasksService,
    private settings: SettingsService,
    private timeService: TimeService,
    private completionService: CompletionService) {
  }
}
