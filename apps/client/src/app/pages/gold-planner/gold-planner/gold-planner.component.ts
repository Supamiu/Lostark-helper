import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, of, pluck, startWith } from "rxjs";
import { goldTasks } from "../gold-tasks";
import { GoldTask } from "../gold-task";
import { LostarkTask } from "../../../model/lostark-task";
import { RosterService } from "../../../core/database/services/roster.service";
import { SettingsService } from "../../../core/database/services/settings.service";
import { TasksService } from "../../../core/database/services/tasks.service";
import { Character } from "../../../model/character/character";
import { TimeService } from "../../../core/time.service";
import { ManualWeeklyGoldEntry, Settings } from "../../../model/settings";
import { UpdateData } from "@angular/fire/firestore";


interface GoldPlannerDisplay {
  chestsData: {
    task?: LostarkTask,
    gTask: GoldTask,
    flags: { value: boolean | null, force: boolean | null }[]
  }[];
  chaos: Record<string, number>;
  other: Record<string, number>;
  tracking: Record<string, boolean>;
  forceAbyss: Record<string, boolean>;
  total: number[];
  grandTotal: number;
  chestGold: number;
}

@Component({
  selector: "lostark-helper-gold-planner",
  templateUrl: "./gold-planner.component.html",
  styleUrls: ["./gold-planner.component.less"]
})
export class GoldPlannerComponent {
  public roster$ = this.rosterService.roster$.pipe(
    map(roster => roster.characters)
  );

  public settings$ = this.settings.settings$;

  public tasks$ = this.tasksService.tasks$;

  public tracking$ = this.settings.settings$.pipe(pluck("chestConfiguration"));
  public manualGoldEntries$ = this.settings.settings$.pipe(pluck("manualGoldEntries"));
  public forceAbyss$ = this.settings.settings$.pipe(pluck("forceAbyss"));

  private goldChestRewardPerIlvl = {
    1302: 2 * 1250,
    1415: 3 * 1250
  };

  public display$: Observable<GoldPlannerDisplay> = combineLatest([
    this.roster$,
    this.tasks$,
    this.tracking$,
    of(goldTasks),
    this.forceAbyss$,
    this.manualGoldEntries$,
    this.timeService.lastWeeklyReset$
  ]).pipe(
    map(([roster, tasks, tracking, gTasks, forceAbyss, manualGoldEntries, weeklyReset]) => {
      const chestsData = gTasks
        .map(gTask => {
          if (gTask.taskName) {
            const task = tasks.find(t => t.label === gTask.taskName && !t.custom);
            return {
              task,
              gTask
            };
          }
          return {
            gTask
          };
        })
        .filter(({ task }) => {
          return !task || (task.enabled
            && roster.some(c => c.ilvl >= (task.minIlvl || 0) && c.ilvl <= (task.maxIlvl || Infinity)));
        })
        .map(({ gTask, task }, i, array) => {
          const flagsData = roster.map((character) => {
            if (!task || !character.weeklyGold) {
              return {
                force: null,
                value: null
              };
            }
            const cantDoTask = task && (!task.enabled || character.ilvl < (task.minIlvl || 0) || character.ilvl >= (task.maxIlvl || Infinity));
            const ilvlTooLow = gTask.overrideMinIlvl && character.ilvl < gTask.overrideMinIlvl;
            const ilvlTooHigh = gTask.overrideMaxIlvl && character.ilvl >= gTask.overrideMaxIlvl;
            const forceFlag = forceAbyss[`${character.name}:${gTask.name}`];
            if (gTask.entryId) {
              // Find the other ones with same entry ID
              const relevantTasks = array.filter((row) => row.gTask.entryId === gTask.entryId);
              const highestPossible = relevantTasks.filter(row => {
                return character.ilvl >= (row.gTask.overrideMinIlvl || 0);
              }).sort((a, b) => (b.gTask.overrideMinIlvl || 0) - (a.gTask.overrideMinIlvl || 0))[0];
              if (highestPossible.gTask.name !== gTask.name) {
                return {
                  force: null,
                  value: null
                };
              }
            }
            if (cantDoTask || ilvlTooLow || ilvlTooHigh) {
              if (!forceFlag) {
                return {
                  force: gTask.canForce && !ilvlTooHigh ? false : null,
                  value: null
                };
              }
            }
            const flag = tracking[this.getGoldChestFlag(character.name, gTask)];
            if (flag === undefined) {
              return {
                force: forceFlag,
                value: true
              };
            }
            return {
              force: forceFlag,
              value: flag
            };
          });
          return {
            task,
            gTask,
            flags: flagsData
          };
        })
        .filter(({ flags }) => {
          return flags.some(f => f.force !== null || f.value !== null);
        });

      const chestIdsDone = {};

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
          const { gTask, flags } = row;
          flags.forEach((flag, i) => {
            let chestPrice = (gTask.chestPrice || 0);
            if (gTask.chestId && flag.value === false) {
              if (chestIdsDone[`${gTask.chestId}:${i}`]) {
                chestPrice = 0;
              }
              chestIdsDone[`${gTask.chestId}:${i}`] = true;
            }
            // Switch case to avoid null == false
            switch (flag.value) {
              case true:
                acc[i] += (gTask.goldReward || 0);
                break;
              case false:
                acc[i] += (gTask.goldReward || 0) - chestPrice;
                break;
            }
          });
          return acc;
        }, new Array(roster.length).fill(0));

      roster.forEach((char, i) => {
        total[i] += chaos[char.name];
        total[i] += other[char.name];
      });

      const highestIlvl = roster.map(c => c.ilvl).sort((a, b) => b - a)[0];

      const chestGold = this.goldChestRewardPerIlvl[Object.keys(this.goldChestRewardPerIlvl)
        .filter(key => +key <= highestIlvl)
        .sort((a, b) => +b - +a)[0]];
      return {
        chestsData,
        total,
        forceAbyss,
        tracking,
        grandTotal: total.reduce((acc, v) => acc + v, chestGold),
        chestGold,
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
              private timeService: TimeService) {
  }

  private getGoldChestFlag(characterName: string, gTask: GoldTask): string {
    if (gTask.chestId) {
      return `${characterName}:gold:chest:${gTask.chestId}`;
    }
    return `${characterName}:gold:${gTask.name}`;
  }

  private getGoldEntry(type: string, characterName: string, weeklyReset: number, data: Record<string, ManualWeeklyGoldEntry>): number {
    const entry: ManualWeeklyGoldEntry = data[`${type}:${characterName}`] || { amount: 0, timestamp: Date.now() };
    if (entry.timestamp < weeklyReset) {
      return 0;
    }
    return entry.amount || 0;
  }

  public setManualGold(settingsKey: string, type: string, characterName: string, newValue: number): void {
    if (typeof newValue === 'string') {
      return;
    }
    this.settings.updateOne(settingsKey, {
      [`manualGoldEntries.${type}:${characterName}`]: { amount: newValue || 0, timestamp: Date.now() }
    } as unknown as UpdateData<Settings>);
  }

  setChestFlag(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[this.getGoldChestFlag(character.name, gTask)] = !flag;
    this.settings.patch({
      $key: settingsKey,
      chestConfiguration: tracking
    });
  }

  setForceAbyss(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[`${character.name}:${gTask.name}`] = flag;
    this.settings.patch({
      $key: settingsKey,
      forceAbyss: tracking
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
