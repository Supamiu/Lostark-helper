import { Injectable } from "@angular/core";
import { catchError, filter, first } from "rxjs/operators";
import { EMPTY, from, map, mapTo, Observable, shareReplay, switchMap } from "rxjs";
import {
  Auth,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup, sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword, signInWithPopup,
  signOut,
  user,
  UserCredential
} from "@angular/fire/auth";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private authState$ = user(this.auth);

  public uid$ = this.authState$.pipe(
    filter(Boolean),
    map(state => state.uid),
    filter(Boolean),
    shareReplay(1)
  );

  public isAnonymous$ = this.authState$.pipe(
    filter(Boolean),
    map(state => state.isAnonymous),
    shareReplay(1)
  );

  constructor(private auth: Auth, private message: NzMessageService) {
    this.authState$.subscribe((state) => {
      if (!state) {
        signInAnonymously(auth);
      }
    });
  }

  public register(email: string, password: string): Observable<UserCredential> {
    return this.authState$.pipe(
      filter(Boolean),
      first(),
      switchMap((user) => {
        return from(linkWithCredential(user, EmailAuthProvider.credential(email, password)));
      }),
      catchError((err) => {
        this.message.error(err);
        return EMPTY;
      })
    );
  }

  public login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((err) => {
        this.message.error(err);
        return EMPTY;
      }),
      mapTo(void 0)
    );
  }

  public googleOauthRegister(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.authState$.pipe(
      filter(Boolean),
      first(),
      switchMap((user) => {
        return from(linkWithPopup(user, provider));
      }),
      catchError((err) => {
        this.message.error(err);
        return EMPTY;
      })
    );
  }

  public googleOauthLogin(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      catchError((err) => {
        this.message.error(err);
        return EMPTY;
      }),
      mapTo(void 0)
    );
  }


  disconnect(): void {
    signOut(this.auth);
  }

  sendResetPassword(email: string): void {
    sendPasswordResetEmail(this.auth, email);
  }
}
