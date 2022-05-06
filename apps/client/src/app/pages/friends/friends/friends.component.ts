import { Component } from "@angular/core";
import { UserService } from "../../../core/database/services/user.service";
import { AuthService } from "../../../core/database/services/auth.service";
import { FriendInvitesService } from "../../../core/database/services/friend-invites.service";
import { FriendInvite } from "../../../model/friend-invite";
import { combineLatest, map, Observable, of, switchMap } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { first, mapTo } from "rxjs/operators";

@Component({
  selector: "lostark-helper-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.less"]
})
export class FriendsComponent {
  public anonymous$ = this.auth.isAnonymous$;

  public uid$ = this.auth.uid$;

  public friendIds$ = this.userService.friendIds$;
  public friends$ = this.userService.friends$;

  public invites$: Observable<{ from: FriendInvite[], to: FriendInvite[] }> = combineLatest([
    this.friendInvitesService.invitesSent$,
    this.friendInvitesService.invitesReceived$
  ]).pipe(
    map(([from, to]) => ({ from, to }))
  );

  public form = this.fb.group({
    uid: [null, [Validators.required, Validators.maxLength(28), Validators.minLength(28)]]
  });

  constructor(private userService: UserService, private auth: AuthService,
              private friendInvitesService: FriendInvitesService, private fb: FormBuilder,
              private message: NzMessageService) {
  }

  inviteFriend(uid: string, invitesSent: FriendInvite[], friendIds: string[]): void {
    const form = this.form.getRawValue();
    this.form.reset();
    if (invitesSent.some(i => i.to === form.uid)) {
      this.message.error(`Cannot add another invite for user ID ${form.uid}.`);
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
}
