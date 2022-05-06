import { Component } from "@angular/core";
import { TasksService } from "../../tasks/tasks.service";
import { Settings } from "../settings";
import { BehaviorSubject, combineLatest, map, Observable, pluck } from "rxjs";
import { SettingsService } from "../settings.service";
import { TaskFrequency } from "../../../model/task-frequency";
import { Character } from "../../../model/character";
import { TaskScope } from "../../../model/task-scope";
import { LostarkTask } from "../../../model/lostark-task";
import { Energy } from "../../../model/energy";
import { getCompletionEntryKey } from "../../../core/get-completion-entry-key";
import { RosterService } from "../../../core/database/services/roster.service";

@Component({
  selector: "lostark-helper-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.less"]
})
export class SettingsComponent {
  public energyReloader$ = new BehaviorSubject<void>(void 0);

  public settings$: Observable<Settings> = this.settings.settings$;

  public lazyTracking$ = this.settings$.pipe(pluck("lazytracking"));

  public energy$ = this.energyReloader$.pipe(
    map(() => JSON.parse(localStorage.getItem("energy") || "{}") as Energy)
  );

  public roster$ = this.rosterService.roster$.pipe(
    map(roster => roster.characters.filter(c => c.lazy))
  );

  public fullRoster$ = this.rosterService.roster$.pipe(
    pluck('characters')
  );

  public lazyFlags$ = combineLatest([
    this.tasksService.tasks$,
    this.roster$,
    this.lazyTracking$
  ]).pipe(
    map(([tasks, roster, tracking]) => {
      return tasks
        .filter(task => task.frequency === TaskFrequency.DAILY && task.scope === TaskScope.CHARACTER)
        .map(task => {
          return {
            task,
            flags: roster
              .map(character => {
                const flag = tracking[`${character.name}:${task.label}:${task.scope}:${task.amount}`];
                return flag === undefined ? true : flag;
              })
          };
        });
    })
  );

  public restBonus$ = combineLatest([
    this.tasksService.tasks$,
    this.rosterService.roster$,
    this.energy$
  ]).pipe(
    map(([tasks, roster, energy]) => {
      return tasks
        .filter(task => task.frequency === TaskFrequency.DAILY
          && task.scope === TaskScope.CHARACTER
          && ["Chaos", "Guardian", "Una"].some(n => task.label?.startsWith(n)))
        .map(task => {
          return {
            task,
            energy: roster.characters.map(c => energy[getCompletionEntryKey(c.name, task)]?.amount || 0)
          };
        });
    })
  );

  constructor(private rosterService: RosterService, private tasksService: TasksService,
              private settings: SettingsService) {
  }

  saveSettings(settings: Settings): void {
    this.settings.save(settings);
  }

  trackByTask(index: number, row: { task: LostarkTask }): string {
    return row.task.label;
  }

  trackByIndex(index: number): number {
    return index;
  }

  setLazyFlag(tracking: Record<string, boolean>, task: LostarkTask, character: Character, flag: boolean): void {
    tracking[`${character.name}:${task.label}:${task.scope}:${task.amount}`] = flag;
    this.settings.patch({
      lazytracking: tracking
    });
  }

  setRestBonus(energy: Energy, task: LostarkTask, character: Character, value: number): void {
    energy[getCompletionEntryKey(character.name, task)] = { amount: Math.max(Math.min(100, value), 0) };
    localStorage.setItem("energy", JSON.stringify(energy));
    this.energyReloader$.next();
  }

  resetBonuses(): void {
    localStorage.setItem("energy", "{}");
    this.energyReloader$.next();
  }
}
