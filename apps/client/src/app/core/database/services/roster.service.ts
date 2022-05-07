import { Injectable } from "@angular/core";
import { map, Observable, shareReplay, switchMap } from "rxjs";
import { FirestoreStorage } from "../firestore-storage";
import { Roster } from "../../../model/roster";
import { AuthService } from "./auth.service";
import { Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class RosterService extends FirestoreStorage<Roster> {
  public roster$: Observable<Roster> = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.getOne(uid).pipe(
        map(roster => {
          if (roster.notFound) {
            return {
              $key: uid,
              characters: []
            };
          }
          return roster;
        })
      );
    }),
    shareReplay(1)
  );

  constructor(private auth: AuthService, firestore: Firestore) {
    super(firestore);
  }

  override getOne(key: string): Observable<Roster> {
    return super.getOne(key).pipe(
      map(roster => {
        roster.characters = (roster.characters || []).map(c => {
          if (!c.tickets) {
            c.tickets = {
              t1Cube: 0,
              t2BossRush: 0,
              t2Cube: 0,
              t3BossRush: 0,
              t3Cube: 0,
              platinumFields: 0
            };
          }
          return c;
        });
        return roster;
      })
    );
  }

  protected getCollectionName(): string {
    return "roster";
  }
}
