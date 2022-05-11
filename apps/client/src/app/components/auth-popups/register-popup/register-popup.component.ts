import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { AuthService } from "../../../core/database/services/auth.service";
import { NzModalRef } from "ng-zorro-antd/modal";
import { switchMap } from "rxjs";
import { UserService } from "../../../core/database/services/user.service";
import { LostarkRegion } from "../../../model/lostark-region";

@Component({
  selector: "lostark-helper-register-popup",
  templateUrl: "./register-popup.component.html",
  styleUrls: ["./register-popup.component.less"]
})
export class RegisterPopupComponent {
  public form = this.fb.group({
    username: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
  }, {
    validators: [this.matchPasswords]
  });

  constructor(private fb: FormBuilder, private auth: AuthService,
              private modalRef: NzModalRef, private userService: UserService) {
  }

  private matchPasswords(AC: AbstractControl): ValidationErrors | null {
    const password = AC.get("password")?.value;
    const confirmPassword = AC.get("confirmPassword")?.value;
    if (password !== confirmPassword) {
      return { matchPassword: true };
    } else {
      return null;
    }
  }

  submit(): void {
    const creds = this.form.getRawValue();
    this.auth.register(creds.email, creds.password)
      .pipe(
        switchMap((res) => {
          return this.userService.setOne(res.user.uid, { name: creds.username, friends: [], region: LostarkRegion.EUROPE_WEST });
        })
      )
      .subscribe(() => {
        this.modalRef.close();
      });
  }

  googleOauth(): void {
    this.auth.googleOauthRegister()
      .subscribe(() => {
        this.modalRef.close();
      });
  }
}
