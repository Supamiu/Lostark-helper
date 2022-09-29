import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Gearset } from "../../../model/character/gearset";
import { AuthService } from "./auth.service";
import { Firestore, where } from "@angular/fire/firestore";
import { map, Observable, switchMap } from "rxjs";
import { ItemRarity } from "../../../model/item-rarity";

@Injectable({
  providedIn: "root"
})
export class GearsetService extends FirestoreStorage<Gearset> {

  public gearsets$ = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.query(where("authorId", "==", uid));
    })
  );

  constructor(private auth: AuthService, firestore: Firestore) {
    super(firestore);
  }

  public override getOne(key: string): Observable<Gearset> {
    return super.getOne(key).pipe(
      map(gearset => {
        if (!gearset.notFound) {
          [
            "necklace",
            "earring1",
            "earring2",
            "ring1",
            "ring2"
          ].forEach(key => {
            if (!gearset[key] || !gearset[key].engravings|| gearset[key].engravings.length === 0) {
              gearset[key] = {
                quality: 100,
                rarity: ItemRarity.LEGENDARY,
                stats: [],
                engravings: [
                  { engravingId: 0, nodes: 0 },
                  { engravingId: 0, nodes: 0 },
                  { engravingId: 0, nodes: 0 }
                ]
              };
            }
          });
          if (!gearset.stone || !gearset.stone.engravings || gearset.stone.engravings.length === 0) {
            gearset.stone = {
              rarity: ItemRarity.LEGENDARY,
              engravings: [
                { engravingId: 0, nodes: 0 },
                { engravingId: 0, nodes: 0 },
                { engravingId: 0, nodes: 0 }
              ]
            };
          }
          if (!gearset.engravings || gearset.engravings.length === 0) {
            gearset.engravings = [
              { engravingId: 0, nodes: 0 },
              { engravingId: 0, nodes: 0 }
            ];
          }
        }
        return gearset;
      })
    );
  }

  protected getCollectionName(): string {
    return "gearsets";
  }
}
