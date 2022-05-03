import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Character} from "../../model/character";

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private reloader$ = new BehaviorSubject<void>(void 0);

  public roster$: Observable<Character[]> = this.reloader$.pipe(
    map(() => {
      return JSON.parse(localStorage.getItem('roster') || '[]');
    })
  );

  public saveRoster(roster: Character[]): void {
    localStorage.setItem('roster', JSON.stringify(roster));
    this.reloader$.next();
  }
}
