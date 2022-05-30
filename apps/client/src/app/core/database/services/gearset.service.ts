import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Gearset } from "../../../model/character/gearset";
import { AuthService } from "./auth.service";
import { Firestore, where } from "@angular/fire/firestore";
import { switchMap } from "rxjs";
import { GearsetPiece } from "../../../model/character/gearset-piece";
import { ItemRarity } from "../../../model/item-rarity";
import { HoningCost } from "../../../pages/gearsets/gear-manager/honing-cost";
import { HoningChances, honingChances } from "../../../pages/honing-cost-optimizer/honing-chances";

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

  public getIlvl(gearPiece: GearsetPiece): number {
    let baseIlvl = 1302;
    switch (gearPiece.rarity) {
      case ItemRarity.LEGENDARY:
      case ItemRarity.RELIC:
        baseIlvl = 1340;
        break;
    }
    let honingIlvlBonus: number;
    if (gearPiece.rarity <= ItemRarity.EPIC) {
      honingIlvlBonus = Math.max(Math.min(gearPiece.honing, 1), 0) * 2
        + Math.max(Math.min(gearPiece.honing - 1, 2), 0) * 3
        + Math.max(Math.min(gearPiece.honing - 3, 12), 0) * 5
        + Math.max(gearPiece.honing - 15, 0) * 15;
    } else {
      honingIlvlBonus = Math.min(gearPiece.honing, 15) * 5
        + Math.max(gearPiece.honing - 15, 0) * 15;
    }
    return baseIlvl + honingIlvlBonus;
  }

  public getHoningCost(piece: GearsetPiece, slot: string): HoningCost | null {
    if (piece.honing >= piece.targetHoning) {
      return null;
    }
    const chancesRarity = piece.rarity > ItemRarity.EPIC ? "legendary/relic" : "epic";
    const honingRows = honingChances.filter(row => {
      return row.rarity === chancesRarity
        && (slot === "weapon" ? row.type === "weapon" : row.type === "armor")
        && row.target > piece.honing
        && row.target <= piece.targetHoning;
    });
    return honingRows.reduce((acc, row) => {
      const tentatives = this.getHoningChancesAvgTentatives(row);
      acc.leapstones += tentatives * row.leapstones;
      acc.shards += tentatives * row.shards;
      acc.stones += tentatives * row.stones;
      acc.gold += tentatives * (row.gold || 0);
      acc.silver += tentatives * row.silver;
      acc.fusionMaterial += tentatives * (row.fusionMaterial || 0);
      return acc;
    }, {
      leapstones: 0,
      shards: 0,
      stones: 0,
      gold: 0,
      silver: 0,
      fusionMaterial: 0
    });
  }

  private getHoningChancesAvgTentatives(row: HoningChances): number {
    let tries = 1;
    let chances = row.chances;
    while (chances < 100) {
      tries++;
      chances += chances;
      if (chances < row.chances * 2) {
        chances += (row.chances * 0.1);
      }
    }
    return tries;
  }

  protected getCollectionName(): string {
    return "gearsets";
  }
}
