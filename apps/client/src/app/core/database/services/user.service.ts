import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { LAHUser } from "../../../model/lah-user";
import { Firestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { combineLatest, map, of, switchMap } from "rxjs";
import {
  TextQuestionPopupComponent
} from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { NzModalService } from "ng-zorro-antd/modal";

@Injectable({
  providedIn: "root"
})
export class UserService extends FirestoreStorage<LAHUser> {

  public user$ = combineLatest([
    this.auth.uid$,
    this.auth.isAnonymous$
  ]).pipe(
    switchMap(([uid, anonymous]) => {
      return this.getOne(uid).pipe(
        switchMap(user => {
          if (!anonymous && !user.name) {
            return this.modal.create({
              nzTitle: "Set a user name",
              nzContent: TextQuestionPopupComponent,
              nzComponentParams: {
                placeholder: "Username",
                type: "input"
              },
              nzFooter: null,
              nzClosable: false,
              nzMaskClosable: false
            })
              .afterClose
              .pipe(
                switchMap(name => {
                  return this.setOne(user.$key, { ...user, name });
                }),
                map(() => user)
              );
          }
          return of(user);
        })
      );
    })
  );

  public friendIds$ = this.user$.pipe(
    map(user => user?.friends || [])
  );

  public friends$ = this.friendIds$.pipe(
    switchMap((ids) => {
      if (ids.length === 0) {
        return of([]);
      }
      return combineLatest([
        ids.map(friendId => this.getOne(friendId))
      ]);
    })
  );

  constructor(firestore: Firestore, private auth: AuthService,
              private modal: NzModalService) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "users";
  }
}
