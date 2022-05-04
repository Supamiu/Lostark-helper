import { Component } from "@angular/core";
import { RosterService } from "../../roster/roster.service";
import { TasksService } from "../../tasks/tasks.service";
import { Settings } from "../settings";
import { combineLatest, map, Observable, pluck } from "rxjs";
import { SettingsService } from "../settings.service";
import { TaskFrequency } from "../../../model/task-frequency";
import { Character } from "../../../model/character";
import { TaskScope } from "../../../model/task-scope";
import { LostarkTask } from "../../../model/lostark-task";

@Component({
  selector: "lostark-helper-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.less"]
})
export class SettingsComponent {
  public settings$: Observable<Settings> = this.settings.settings$;

  public lazyTracking$ = this.settings$.pipe(pluck("lazytracking"));

  public roster$ = this.rosterService.roster$.pipe(
    map(roster => roster.filter(c => c.lazy))
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

  constructor(private rosterService: RosterService, private tasksService: TasksService,
              private settings: SettingsService) {
  }

  saveSettings(settings: Settings): void {
    this.settings.save(settings);
  }

  trackByTask(index: number, row: { task: LostarkTask, flags: boolean[] }): string {
    return row.task.label;
  }

  setLazyFlag(tracking: Record<string, boolean>, task: LostarkTask, character: Character, flag: boolean): void {
    tracking[`${character.name}:${task.label}:${task.scope}:${task.amount}`] = flag;
    this.settings.patch({
      lazytracking: tracking
    });
  }
}
