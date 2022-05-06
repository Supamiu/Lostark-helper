import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Firestore, where } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { switchMap } from "rxjs";
import { FriendInvite } from "../../../model/friend-invite";

@Injectable({
  providedIn: "root"
})
export class FriendInvitesService extends FirestoreStorage<FriendInvite> {

  public invitesSent$ = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.query(where("from", "==", uid));
    })
  );

  public invitesReceived$ = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.query(where("to", "==", uid));
    })
  );

  constructor(firestore: Firestore, private auth: AuthService) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "friend-invites";
  }
}
