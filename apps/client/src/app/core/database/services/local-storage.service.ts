import { Injectable } from "@angular/core";
import { RosterService } from "./roster.service";
import { SettingsService } from "./settings.service";
import { CompletionService } from "./completion.service";
import { EnergyService } from "./energy.service";
import { TasksService } from "./tasks.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { first } from "rxjs/operators";
import { combineLatest, switchMap } from "rxjs";
import { TaskFrequency } from "../../../model/task-frequency";
import { AuthService } from "./auth.service";
import { GameCode } from "../../../data/game-code";
import { mariTrades } from "../../../pages/mari-optimizer/mari-trades";
import { MariTrade } from "../../../pages/mari-optimizer/mari-trade";
import { PricesService } from "../../services/prices.service";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  constructor(private rosterService: RosterService,
              private settingsService: SettingsService,
              private completionService: CompletionService,
              private energyService: EnergyService,
              private tasksService: TasksService,
              private message: NzMessageService,
              private auth: AuthService,
              private pricesService: PricesService) {
  }

  public canMigrateEverything(): boolean {
    const roster = JSON.parse(localStorage.getItem("roster") || "[]");
    const customTasks = JSON.parse(localStorage.getItem("tasks:custom") || "[]");
    const energy = JSON.parse(localStorage.getItem("energy") || "{}");
    const energyUpdated = +(localStorage.getItem("energy:updated") || "0");
    const settings = JSON.parse(localStorage.getItem("settings") || "{}");
    const completion = JSON.parse(localStorage.getItem("completion") || "{}");
    return roster &&
      customTasks &&
      energy &&
      energyUpdated &&
      settings &&
      completion;
  }

  public clear(): void {
    localStorage.removeItem("roster");
    localStorage.removeItem("tasks:custom");
    localStorage.removeItem("energy");
    localStorage.removeItem("energy:updated");
    localStorage.removeItem("settings");
    localStorage.removeItem("completion");
  }

  migrate(): void {
    this.auth.uid$.pipe(
      first(),
      switchMap((uid) => {
        const roster = JSON.parse(localStorage.getItem("roster") || "[]");
        const customTasks = JSON.parse(localStorage.getItem("tasks:custom") || "[]");
        const energy = JSON.parse(localStorage.getItem("energy") || "{}");
        const energyUpdated = +(localStorage.getItem("energy:updated") || "0");
        const settings = JSON.parse(localStorage.getItem("settings") || "{}");
        const completion = JSON.parse(localStorage.getItem("completion") || "{}");
        const completionMigration$ = combineLatest([
          this.tasksService.tasks$,
          this.tasksService.importTasks(customTasks.map(task => {
            return {
              ...task,
              authorId: uid
            };
          }))
        ]).pipe(
          first(),
          switchMap(([tasks]) => {
            const newCompletionData = {};
            tasks.forEach(task => {
              Object.keys(completion).forEach(key => {
                const split = key.split(":");
                let characterName: string | null = null;
                let taskName = "";
                let frequency: TaskFrequency = TaskFrequency.DAILY;
                if (split.length === 3) {
                  // Character task
                  characterName = split[0];
                  taskName = split[1];
                  frequency = +split[2];
                } else if (split.length === 2) {
                  // Roster task
                  characterName = null;
                  taskName = split[0];
                  frequency = +split[1];
                }
                if (taskName.toLowerCase() === task.label?.toLowerCase() && frequency === task.frequency) {
                  newCompletionData[`${characterName}:${task.$key}`] = completion[key];
                }
              });
            });
            return this.completionService.setOne(uid, { data: newCompletionData });
          })
        );
        return combineLatest([
          this.rosterService.setOne(uid, { characters: roster, trackedTasks: {} }),
          this.energyService.setOne(uid, { data: energy, updated: energyUpdated }),
          this.settingsService.setOne(uid, settings),
          completionMigration$
        ]);
      })
    ).subscribe(() => {
      localStorage.setItem("imported", "true");
      this.message.success("Imported everything from your Local Storage to the database");
    });
  }

  upgrade(previousVersion: number): void {
    if (previousVersion < 2) {
      const honingChancesEntry = localStorage.getItem("honing:chance-items-quantities");
      if (honingChancesEntry) {
        const juiceObj = JSON.parse(honingChancesEntry);
        const newEntry = {
          [GameCode.JUICE_1302_S]: juiceObj.grace != null ? juiceObj.grace : 24,
          [GameCode.JUICE_1302_M]: juiceObj.blessing != null ? juiceObj.blessing : 12,
          [GameCode.JUICE_1302_L]: juiceObj.protection != null ? juiceObj.protection : 4
        };

        localStorage.setItem("honing:chance-items-quantities", JSON.stringify(newEntry));
      }

      const mariItemsEntry = localStorage.getItem("mari:items");
      if (mariItemsEntry) {
        const mariItems = JSON.parse(mariItemsEntry);
        const newEntry = Object.entries(mariItems).reduce((obj, [key, price]) => {
          const name = key.split(":")[0];
          let trade = null as MariTrade | null | undefined;

          switch (name) {
            case "Destruction Stone Crystal":
              trade = mariTrades.find(t => t.gameCode === GameCode.DESTRUCTION_1302);
              break;
            case "Guardian Stone Crystal":
              trade = mariTrades.find(t => t.gameCode === GameCode.GUARDIAN_1302);
              break;
            default:
              trade = mariTrades.find(t => t.name === name);
              break;
          }

          if (trade != null) {
            obj[this.pricesService.getKey(trade)] = price;
          }
          
          return obj;
        }, {});

        localStorage.setItem("mari:items", JSON.stringify(newEntry));
      }
    }

    localStorage.setItem("version", "2");
  }
}
