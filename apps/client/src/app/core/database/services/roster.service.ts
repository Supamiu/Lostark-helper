import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
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
    })
  );

  constructor(private auth: AuthService, firestore: Firestore) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "roster";
  }
}
