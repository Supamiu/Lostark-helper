import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Completion } from "../../../model/completion";
import { Firestore } from "@angular/fire/firestore";
import { map, Observable, shareReplay, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class CompletionService extends FirestoreStorage<Completion> {
  public completion$: Observable<Completion> = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.getOne(uid).pipe(
        map(completion => {
          if (completion.notFound) {
            return {
              $key: uid,
              data: {}
            };
          }
          return completion;
        })
      );
    }),
    shareReplay(1)
  );

  constructor(firestore: Firestore, private auth: AuthService) {
    super(firestore);
  }

  protected getCollectionName(): string {
    return "completion";
  }
}
