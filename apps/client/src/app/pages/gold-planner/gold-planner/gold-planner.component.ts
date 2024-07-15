import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, of, pluck, startWith } from "rxjs";
import { goldTasks } from "../gold-tasks";
import { GoldTask } from "../gold-task";
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

interface GoldPlannerDisplay {
  chestsData: {
    task?: LostarkTask,
    gTask: GoldTask,
    goldDetails: {
      hide: boolean | false,
      takingChest: boolean | null,
      takingGold: boolean | null,
      canRunHM: boolean | null,
      runningHM: boolean | null,
      goldReward: number
      chestPrice: number,
    }[]
  }[];
  chaos: Record<string, number>;
  other: Record<string, number>;
  tracking: Record<string, boolean>;
  total: number[];
  grandTotal: number;
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

  public display$: Observable<GoldPlannerDisplay> = combineLatest([
    this.roster$,
    this.tasks$,
    this.tracking$,
    of(goldTasks),
    this.manualGoldEntries$,
    this.timeService.lastWeeklyReset$,
    this.rawRoster$,
    this.completion$
  ]).pipe(
    map(([roster, tasks, tracking, gTasks, manualGoldEntries, weeklyReset, rawRoster, completion]) => {
      const chestsData = gTasks
        .map(gTask => {
          const task = tasks.find(t => t.label === gTask.taskName && !t.custom);
          return {
            task,
            gTask
          };
        })
        .filter(({ task }) => {
          return !task || (task.enabled
            && roster.some(c => c.ilvl >= (task.minIlvl || 0) && c.ilvl <= (task.maxIlvl || Infinity)));
        })
        .map(({ gTask, task }) => {
          const goldDetails = roster.map((character) => {

            const completionFlag = task && getCompletionEntry(completion.data, character, task);
            const gateAlreadyDone = completionFlag && completionFlag.amount >= parseInt(gTask.completionId.substring(gTask.completionId.length - 1))
            const hideAlreadyDoneGate = tracking['hideAlreadyDoneTasks'] && gateAlreadyDone === true

            const cantDoTask = task && (!task.enabled || character.ilvl < (task.minIlvl || 0) || character.ilvl >= (task.maxIlvl || Infinity));
            const goldChestflag = tracking[this.getGoldChestFlag(character.name, gTask)];
            const takingGoldFlag = tracking[this.getGoldTakingFlag(character.name, gTask)];
            const runningHFlag = tracking[this.getRunningHMFlag(character.name, gTask)];
            const nmMode = gTask.modes && gTask.modes.find(mode => mode.name === 'NM')
            const chosenMode = gTask.modes && gTask.modes.find(mode => (runningHFlag === true || runningHFlag === undefined) ? mode.name === 'NM' : mode.name === 'HM')

            const goldDetail = {
              hide: false || cantDoTask || !character.weeklyGold || (task ? getCompletionEntry(rawRoster.trackedTasks, character, task, true) === false : false) || hideAlreadyDoneGate,
              takingChest: goldChestflag === undefined ? true : goldChestflag,
              takingGold: takingGoldFlag === undefined ? true : takingGoldFlag,
              runningHM: runningHFlag === undefined ? true : runningHFlag,
              canRunHM: nmMode ? character.ilvl >= nmMode.HMThreashold : false,
              goldReward: chosenMode ? chosenMode.goldReward : 0,
              chestPrice: chosenMode ? chosenMode.chestPrice : 0
            }

            return goldDetail;
          });

          return {
            task,
            gTask,
            goldDetails
          };
        })
        .filter(({ goldDetails }) => {
          return goldDetails.some(f => !f.hide);
        });

      const chaos = roster.reduce((acc, c) => {
        return {
          ...acc,
          [c.name]: this.getGoldEntry("chaos", c.name, weeklyReset, manualGoldEntries || {})
        };
      }, {});

      const other = roster.reduce((acc, c) => {
        return {
          ...acc,
          [c.name]: this.getGoldEntry("other", c.name, weeklyReset, manualGoldEntries || {})
        };
      }, {});

      const total = chestsData
        .filter(row => row.task)
        .reverse()
        .reduce((acc, row) => {
          const { goldDetails } = row;
          goldDetails.forEach((flag, i) => {
            if (!flag.hide) {
              // True = skip gold, False = take gold
              if (flag.takingGold === false) {
                acc[i] += flag.goldReward
              }

              // True = skip chest, False = take chest
              if (flag.takingChest === false) {
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
        chestsData,
        total,
        tracking,
        grandTotal: total.reduce((acc, v) => acc + v, 0),
        chaos,
        other
      };
    })
  );

  private windowResize$ = new BehaviorSubject<void>(void 0);

  public scrolling$ = combineLatest([this.roster$, this.windowResize$]).pipe(
    map(([roster]) => {
      const y = window.innerHeight - 64 - 48 - 190 - 20;

      const scrolling: { x?: string | null, y: string | null } = { y: `${y}px`, x: "1200px" };
      const widthPerCharacter = window.innerWidth < 992 ? 80 : 120;
      if (window.innerWidth < widthPerCharacter * roster.length + 200) {
        scrolling.x = `${window.innerWidth - 64 - 48 - 190 - 20}px`;
      }
      return scrolling;
    }),
    startWith({ x: null, y: null })
  );

  constructor(private rosterService: RosterService,
    private tasksService: TasksService,
    private settings: SettingsService,
    private timeService: TimeService,
    private completionService: CompletionService) {
  }

  private getGoldChestFlag(characterName: string, gTask: GoldTask): string {
    if (gTask.chestId) {
      return `${characterName}:gold:chest:${gTask.chestId}`;
    }
    return `${characterName}:gold:${gTask.name}`;
  }

  private getGoldTakingFlag(characterName: string, gTask: GoldTask): string {
    return `${characterName}:gold:taking:${gTask.name}`;
  }

  private getRunningHMFlag(characterName: string, gTask: GoldTask): string {
    return `${characterName}:runningHM:${gTask.name}`;
  }

  private getGoldEntry(type: string, characterName: string, weeklyReset: number, data: Record<string, ManualWeeklyGoldEntry>): number {
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

  setChestFlag(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[this.getGoldChestFlag(character.name, gTask)] = !flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  setGoldTakingFlag(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[this.getGoldTakingFlag(character.name, gTask)] = !flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  setRunningHMFlag(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[this.getRunningHMFlag(character.name, gTask)] = !flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  setHideAlreadyDoneTasksFlag(settingsKey: string, tracking: Record<string, boolean>, flag: boolean): void {
    tracking['hideAlreadyDoneTasks'] = flag;
    this.settings.patch({
      $key: settingsKey,
      goldPlannerConfiguration: tracking
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  manualGoldFormatter(value: number | string): number {
    if (!value || typeof value === 'string') {
      return 0;
    }
    return Math.floor(value);
  };
}
