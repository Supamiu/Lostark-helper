import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../core/database/services/auth.service";
import { NzModalRef } from "ng-zorro-antd/modal";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "lostark-helper-login-popup",
  templateUrl: "./login-popup.component.html",
  styleUrls: ["./login-popup.component.less"]
})
export class LoginPopupComponent {
  public form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: UntypedFormBuilder, private auth: AuthService,
              private modalRef: NzModalRef, private message: NzMessageService) {
  }

  public sendResetPassword(): void {
    const email = this.form.getRawValue().email;
    this.auth.sendResetPassword(email);
    this.message.success("Reset password email sent");
    this.modalRef.close();
  }

  login(): void {
    const creds = this.form.getRawValue();
    this.auth.login(creds.email, creds.password)
      .subscribe(() => {
        this.modalRef.close();
      });
  }

  googleOauth(): void {
    this.auth.googleOauthLogin()
      .subscribe(() => {
        this.modalRef.close();
      });
  }
}
