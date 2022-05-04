import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Character } from "../../model/character";

@Injectable({
  providedIn: "root"
})
export class RosterService {
  private static readonly VERSION = 1;

  private reloader$ = new BehaviorSubject<void>(void 0);

  public roster$: Observable<Character[]> = this.reloader$.pipe(
    map(() => {
      return JSON.parse(localStorage.getItem("roster") || "[]");
    })
  );

  constructor() {
    const version = +(localStorage.getItem("roster:version") || "0");
    if (version < RosterService.VERSION) {
      const roster: Character[] = JSON.parse(localStorage.getItem("roster") || "[]");
      localStorage.setItem("roster", JSON.stringify(roster.map((c, i) => {
        if (!c.id) {
          c.id = i;
        }
        return c;
      })));
      localStorage.setItem("roster:version", RosterService.VERSION.toString());
      this.reloader$.next();
    }
  }

  public saveRoster(roster: Character[]): void {
    localStorage.setItem("roster", JSON.stringify(roster));
    this.reloader$.next();
  }
}
