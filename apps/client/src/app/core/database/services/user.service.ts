import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { LAHUser } from "../../../model/lah-user";
import { Firestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { combineLatest, map, of, shareReplay, switchMap } from "rxjs";
import {
  TextQuestionPopupComponent
} from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { LostarkRegion } from "../../../model/lostark-region";
import { emptyAvailability } from "../../../model/availability/availability";

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
            this.updateUserName(user)
          }
          return of(user);
        })
      );
    }),
    map(user => {
      if (!user.region) {
        user.region = LostarkRegion.EUROPE_CENTRAL;
      }
      if (!user.availability) {
        user.availability = emptyAvailability();
      }
      return user;
    }),
    shareReplay(1)
  );

  public region$ = this.user$.pipe(
    map(user => user.region || LostarkRegion.EUROPE_CENTRAL)
  );

  public friendIds$ = this.user$.pipe(
    map(user => user?.friends || []),
    shareReplay(1)
  );

  updateUserName(user: LAHUser) {
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
        switchMap((name: string) => {
          console.log()
          return this.setOne(user.$key, { ...user, name, region: LostarkRegion.EUROPE_CENTRAL });
        }),
        map(() => user)
      );
  }

  constructor(firestore: Firestore, private auth: AuthService,
              private modal: NzModalService) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "users";
  }
}
