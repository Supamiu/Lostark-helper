import { Component } from "@angular/core";
import { combineLatest, map, Observable, of, pluck } from "rxjs";
import { goldTasks } from "../gold-tasks";
import { GoldTask } from "../gold-task";
import { LostarkTask } from "../../../model/lostark-task";
import { RosterService } from "../../../core/database/services/roster.service";
import { SettingsService } from "../../../core/database/services/settings.service";
import { TasksService } from "../../../core/database/services/tasks.service";
import { Character } from "../../../model/character/character";

interface GoldPlannerDisplay {
  chestsData: {
    task?: LostarkTask,
    gTask: GoldTask,
    flags: { value: boolean | null, force: boolean | null }[]
  }[];
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
    map(roster => roster.characters.slice(0, 6))
  );

  public settings$ = this.settings.settings$;

  public tasks$ = this.tasksService.tasks$;

  public tracking$ = this.settings.settings$.pipe(pluck("chestConfiguration"));
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
    this.forceAbyss$
  ]).pipe(
    map(([roster, tasks, tracking, gTasks, forceAbyss]) => {
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
          const flagsData = roster.map(character => {
            if (!task) {
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
                  force: gTask.canForce ? false : null,
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
        chestGold
      };
    })
  );

  constructor(private rosterService: RosterService,
              private tasksService: TasksService,
              private settings: SettingsService) {
  }

  private getGoldChestFlag(characterName: string, gTask: GoldTask): string {
    if (gTask.chestId) {
      return `${characterName}:gold:chest:${gTask.chestId}`;
    }
    return `${characterName}:gold:${gTask.name}`;
  }

  setChestFlag(settingsKey: string, tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[this.getGoldChestFlag(character.name, gTask)] = flag;
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
