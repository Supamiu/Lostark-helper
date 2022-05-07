import { Component } from "@angular/core";
import { UserService } from "../../../core/database/services/user.service";
import { AuthService } from "../../../core/database/services/auth.service";
import { FriendInvitesService } from "../../../core/database/services/friend-invites.service";
import { FriendInvite } from "../../../model/friend-invite";
import { combineLatest, map, Observable, of, switchMap } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { first, mapTo } from "rxjs/operators";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";

@Component({
  selector: "lostark-helper-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.less"]
})
export class FriendsComponent {
  public anonymous$ = this.auth.isAnonymous$;

  public uid$ = this.auth.uid$;

  public friendIds$ = this.userService.friendIds$;

  public invites$: Observable<{ sent: FriendInvite[], received: FriendInvite[] }> = combineLatest([
    this.friendInvitesService.invitesSent$,
    this.friendInvitesService.invitesReceived$
  ]).pipe(
    map(([sent, received]) => ({ sent, received }))
  );

  public form = this.fb.group({
    uid: [null, [Validators.required, Validators.maxLength(28), Validators.minLength(28)]]
  });

  constructor(private userService: UserService, private auth: AuthService,
              private friendInvitesService: FriendInvitesService, private fb: FormBuilder,
              private message: NzMessageService) {
  }

  inviteFriend(uid: string, invitesSent: FriendInvite[], invitesReceived: FriendInvite[], friendIds: string[]): void {
    const form = this.form.getRawValue();
    this.form.reset();
    if (uid === form.uid) {
      this.message.error(`Why are you trying to invite yourself as friend? Are you so lonely?`);
      return;
    }
    if (invitesSent.some(i => i.to === form.uid)) {
      this.message.error(`Cannot add another invite for user ID ${form.uid}.`);
      return;
    }
    if (invitesReceived.some(i => i.from === form.uid)) {
      this.message.error(`User with ID ${form.uid} is in your pending invites.`);
      return;
    }
    if (friendIds.includes(form.uid)) {
      this.message.error(`User with ID ${form.uid} is already your friend.`);
      return;
    }
    this.userService.getOne(form.uid).pipe(
      first(),
      switchMap(user => {
        if (user.notFound) {
          return of(false);
        }
        return this.friendInvitesService.addOne({
          from: uid,
          to: form.uid,
          date: Date.now()
        }).pipe(
          mapTo(user.name)
        );
      })
    ).subscribe(res => {
      if (res) {
        this.message.success(`Friend invite sent to ${res}.`);
      } else {
        this.message.error(`No users found with ID ${form.uid}.`);
      }
    });
  }

  acceptInvite(invite: FriendInvite): void {
    combineLatest([
      this.userService.updateOne(invite.to, { friends: arrayUnion(invite.from) }),
      this.userService.updateOne(invite.from, { friends: arrayUnion(invite.to) })
    ]).pipe(
      switchMap(() => {
        return this.friendInvitesService.deleteOne(invite.$key);
      })
    ).subscribe(() => {
      this.message.success("Friend invite accepted");
    });
  }

  cancelInvite(invite: FriendInvite): void {
    this.friendInvitesService.deleteOne(invite.$key).subscribe(() => {
      this.message.success("Invite cancelled");
    });
  }

  trackByInvite(index: number, invite: FriendInvite): string {
    return invite.$key;
  }

  trackByFriendId(index: number, id: string): string {
    return id;
  }

  removeFriend(uid: string, friend: string): void {
    combineLatest([
      this.userService.updateOne(friend, { friends: arrayRemove(uid) }),
      this.userService.updateOne(uid, { friends: arrayRemove(friend) })
    ]).subscribe(() => {
      this.message.success(`Removed user with ID ${friend} from your friends.`);
    });
  }
}
