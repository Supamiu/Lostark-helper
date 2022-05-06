import { Injectable } from "@angular/core";
import { filter } from "rxjs/operators";
import { map, ReplaySubject } from "rxjs";
import { Auth, signInAnonymously, User } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private authState$ = new ReplaySubject<User | null>();

  public uid$ = this.authState$.pipe(
    filter(Boolean),
    map(state => state.uid),
    filter(Boolean)
  );

  public isAnonymous$ = this.authState$.pipe(
    filter(Boolean),
    map(state => state.isAnonymous)
  );

  constructor(private auth: Auth) {
    this.authState$.subscribe((state) => {
      if (!state) {
        signInAnonymously(auth);
      }
    });
    auth.onAuthStateChanged(this.authState$);
  }
}
