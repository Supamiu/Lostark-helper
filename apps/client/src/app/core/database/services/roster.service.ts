import { Injectable } from "@angular/core";
import { map, Observable, of, shareReplay, switchMap } from "rxjs";
import { FirestoreStorage } from "../firestore-storage";
import { Roster } from "../../../model/roster";
import { AuthService } from "./auth.service";
import { Firestore } from "@angular/fire/firestore";
import { mapTo } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RosterService extends FirestoreStorage<Roster> {
  public roster$: Observable<Roster> = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.getOne(uid, true).pipe(
        map(roster => {
          if (roster.notFound) {
            return {
              $key: uid,
              characters: [],
              trackedTasks: {},
              showAllTasks: false,
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

  override getOne(key: string, isCurrentUser = false): Observable<Roster> {
    return super.getOne(key).pipe(
      switchMap(roster => {
        let shouldSave = false;
        roster.characters = (roster.characters || []).map((c, i) => {
          if (c.weeklyGold === undefined) {
            shouldSave = true;
            c.weeklyGold = i < 6;
          }
          if (!c.id) {
            shouldSave = true;
            c.id = Math.floor(Math.random() * 1000000000);
          }
          if (!c.tickets) {
            shouldSave = true;
            c.tickets = {
              EbonyCubeLevel1: 0,
              EbonyCubeLevel2: 0,
              EbonyCubeLevel3: 0,
              EbonyCubeLevel4: 0,
              EbonyCubeLevel5: 0,
              EbonyCube1stUnlock: 0,
              EbonyCube2ndUnlock: 0
            };
          }
          return c;
        });
        if (!roster.trackedTasks) {
          roster.trackedTasks = {};
        }
        if (roster.showAllTasks === undefined) {
          shouldSave = true;
          roster.showAllTasks = false;
        }
        if (shouldSave && isCurrentUser && roster.characters.length > 0) {
          return this.setOne(key, roster).pipe(
            mapTo(roster)
          );
        }
        return of(roster);
      })
    );
  }

  protected getCollectionName(): string {
    return "roster";
  }
}
