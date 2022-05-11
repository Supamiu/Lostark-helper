import { Component, OnInit } from "@angular/core";
import { AuthService } from "./core/database/services/auth.service";
import { UserService } from "./core/database/services/user.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { RegisterPopupComponent } from "./components/auth-popups/register-popup/register-popup.component";
import { LoginPopupComponent } from "./components/auth-popups/login-popup/login-popup.component";
import { LocalStorageService } from "./core/database/services/local-storage.service";
import { FriendInvitesService } from "./core/database/services/friend-invites.service";
import { filter, pairwise, startWith } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { LostarkRegion } from "./model/lostark-region";
import { LAHUser } from "./model/lah-user";

@Component({
  selector: "lostark-helper-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  isCollapsed = localStorage.getItem("sidebar:collapsed") === "true";

  public allRegions = Object.keys(LostarkRegion)
    .filter((k, i, array) => array.indexOf(k) === i)
    .map(key => {
      return {
        value: key,
        label: key.split("_")
          .map(word => `${word[0]}${word.slice(1).toLowerCase()}`)
          .join(" ")
      };
    });

  public user$ = this.userService.user$;

  public anonymous$ = this.auth.isAnonymous$;

  constructor(private userService: UserService,
              private auth: AuthService,
              private modalService: NzModalService,
              private localStorageService: LocalStorageService,
              private friendInvitesService: FriendInvitesService,
              private message: NzMessageService
  ) {
    friendInvitesService.invitesReceived$
      .pipe(
        startWith([]),
        pairwise(),
        filter(([before, after]) => after.length > before.length)
      )
      .subscribe(([before, after]) => {
        this.message.info(`You have ${after.length - before.length} pending friend invite(s), open friends page to manage them.`, {
          nzDuration: 10000
        });
      });
  }

  saveCollapsed(collapsed: boolean): void {
    localStorage.setItem("sidebar:collapsed", collapsed.toString());
  }

  signIn(): void {
    this.modalService.create({
      nzContent: LoginPopupComponent,
      nzMaskClosable: false,
      nzFooter: null
    });
  }

  register(): void {
    this.modalService.create({
      nzContent: RegisterPopupComponent,
      nzMaskClosable: false,
      nzFooter: null
    });
  }

  disconnect(): void {
    this.auth.disconnect();
  }

  ngOnInit(): void {
    if (localStorage.getItem("tasks:default") !== null && localStorage.getItem("imported") !== "true") {
      this.localStorageService.migrate();
    }
  }

  setUserRegion(user: LAHUser, region: LostarkRegion):void {
    this.userService.updateOne(user.$key, {
      region: region
    })
  }
}
