import { Component } from "@angular/core";
import { AuthService } from "./core/database/services/auth.service";
import { UserService } from "./core/database/services/user.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { RegisterPopupComponent } from "./components/auth-popups/register-popup/register-popup.component";
import { LoginPopupComponent } from "./components/auth-popups/login-popup/login-popup.component";

@Component({
  selector: "lostark-helper-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  isCollapsed = localStorage.getItem("sidebar:collapsed") === "true";

  public user$ = this.userService.user$;

  public anonymous$ = this.auth.isAnonymous$;

  constructor(private userService: UserService,
              private auth: AuthService,
              private modalService: NzModalService) {
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
}
