import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Firestore, UpdateData } from "@angular/fire/firestore";
import { Settings } from "../../../model/settings";
import { mapTo, Observable, of, shareReplay, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class SettingsService extends FirestoreStorage<Settings> {
  public settings$: Observable<Settings> = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.getOne(uid).pipe(
        switchMap(settings => {
          if (settings.notFound || Object.keys(settings).length < 5) {
            const result = {
              ...settings,
              crystallineAura: true,
              lazytracking: {},
              chestConfiguration: {},
              forceAbyss: {}
            };
            return this.setOne(uid, result).pipe(
              mapTo({
                ...result,
                $key: uid
              })
            );
          }
          return of(settings);
        })
      );
    }),
    shareReplay(1)
  );

  constructor(firestore: Firestore, private auth: AuthService) {
    super(firestore);
  }


  public save(settings: Settings): void {
    this.setOne(settings.$key, settings);
  }

  public patch(settings: UpdateData<Settings> & { $key: string }): void {
    this.updateOne(settings.$key, settings);
  }

  protected getCollectionName(): string {
    return "settings";
  }
}
