import { Component } from "@angular/core";
import { RosterService } from "../../roster/roster.service";
import { TasksService } from "../../tasks/tasks.service";
import { combineLatest, map, Observable, of, pluck } from "rxjs";
import { Character } from "../../../model/character";
import { SettingsService } from "../../settings/settings.service";
import { goldTasks } from "../gold-tasks";
import { GoldTask } from "../gold-task";
import { LostarkTask } from "../../../model/lostark-task";

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
    map(roster => roster.slice(0, 6))
  );

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
            && roster.some(c => c.ilvl >= task.minIlvl && c.ilvl <= task.maxIlvl));
        })
        .map(({ gTask, task }, i, array) => {
          const flagsData = roster.map(character => {
            if (!task) {
              return {
                force: null,
                value: null
              };
            }
            const cantDoTask = task && (character.ilvl < task.minIlvl || character.ilvl > task.maxIlvl);
            const cantDoGoldTask = gTask.overrideMinIlvl && character.ilvl < gTask.overrideMinIlvl;
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
            if (cantDoTask || cantDoGoldTask) {
              if (!forceFlag) {
                return {
                  force: false,
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
        });

      const total = chestsData
        .filter(row => row.task)
        .reduce((acc, row) => {
          const { gTask, flags } = row;
          flags.forEach((flag, i) => {
            // Switch case to avoid null == false
            switch (flag.value) {
              case true:
                acc[i] += (gTask.goldReward || 0);
                break;
              case false:
                acc[i] += (gTask.goldReward || 0) - (gTask.chestPrice || 0);
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

  setChestFlag(tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[this.getGoldChestFlag(character.name, gTask)] = flag;
    this.settings.patch({
      chestConfiguration: tracking
    });
  }

  setForceAbyss(tracking: Record<string, boolean>, gTask: GoldTask, character: Character, flag: boolean): void {
    tracking[`${character.name}:${gTask.name}`] = flag;
    this.settings.patch({
      forceAbyss: tracking
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
