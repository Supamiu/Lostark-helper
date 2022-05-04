import { Component } from "@angular/core";
import { RosterService } from "../../roster/roster.service";
import { TasksService } from "../../tasks/tasks.service";
import { Settings } from "../settings";
import { Observable } from "rxjs";
import { SettingsService } from "../settings.service";

@Component({
  selector: "lostark-helper-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.less"]
})
export class SettingsComponent {
  public settings$: Observable<Settings> = this.settings.settings$;

  constructor(private rosterService: RosterService, private tasksService: TasksService,
              private settings: SettingsService) {
  }

  saveSettings(settings: Settings): void {
    this.settings.save(settings);
  }
}
