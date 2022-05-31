import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Gearset } from "../../../model/character/gearset";
import { AuthService } from "./auth.service";
import { Firestore, where } from "@angular/fire/firestore";
import { switchMap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GearsetService extends FirestoreStorage<Gearset> {

  public gearsets$ = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.query(where("authorId", "==", uid));
    })
  );

  constructor(private auth: AuthService, firestore: Firestore) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "gearsets";
  }
}
