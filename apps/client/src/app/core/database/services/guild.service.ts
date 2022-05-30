import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Guild } from "../../../model/guild/guild";
import { Firestore, where } from "@angular/fire/firestore";
import { switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class GuildService extends FirestoreStorage<Guild> {

  public userGuilds$ = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.query(
        where("users", "array-contains", uid)
      );
    })
  );

  constructor(firestore: Firestore, private auth: AuthService) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "guilds";
  }
}
