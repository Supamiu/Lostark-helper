import { Injectable } from "@angular/core";
import { BehaviorSubject, map, shareReplay } from "rxjs";
import { Settings } from "./settings";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  private reloader$ = new BehaviorSubject<void>(void 0);

  public settings$ = this.reloader$.pipe(
    map(() => {
      const settings = new Settings();
      Object.assign(
        settings,
        JSON.parse(localStorage.getItem("settings") || "{}")
      );
      return settings;
    }),
    shareReplay(1)
  );

  public save(settings: Settings): void {
    localStorage.setItem("settings", JSON.stringify(settings));
    this.reloader$.next();
  }
}
