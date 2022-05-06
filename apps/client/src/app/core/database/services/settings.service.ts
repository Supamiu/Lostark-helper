import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Firestore } from "@angular/fire/firestore";
import { Settings } from "../../../model/settings";
import { map, Observable, shareReplay, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class SettingsService extends FirestoreStorage<Settings> {
  public settings$: Observable<Settings> = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.getOne(uid).pipe(
        map(settings => {
          if (settings.notFound) {
            return {
              ...settings,
              crystallineAura: true,
              lazytracking: {},
              chestConfiguration: {},
              forceAbyss: {}
            };
          }
          return settings;
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

  public patch(settings: Partial<Settings> & { $key: string }): void {
    this.updateOne(settings.$key, settings);
  }

  protected getCollectionName(): string {
    return "settings";
  }
}
