import { Component } from "@angular/core";
import { GearsetService } from "../../../core/database/services/gearset.service";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs";
import { RosterService } from "../../../core/database/services/roster.service";
import { ItemRarity } from "../../../model/item-rarity";
import { GearsetPiece } from "../../../model/character/gearset-piece";
import { Gearset } from "../../../model/character/gearset";
import { filter } from "rxjs/operators";
import { NzModalService } from "ng-zorro-antd/modal";
import { TextQuestionPopupComponent } from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { HoningOptimizer } from "./honing-optimizer";

const slots = [
  "headgear",
  "shoulders",
  "chestpiece",
  "legwear",
  "gloves",
  "weapon"
];

@Component({
  selector: "lostark-helper-gear-manager",
  templateUrl: "./gear-manager.component.html",
  styleUrls: ["./gear-manager.component.less"]
})
export class GearManagerComponent {

  public ItemRarity = ItemRarity;

  public gearset$ = this.route.paramMap.pipe(
    switchMap(params => {
      return this.gearsetService.getOne(params.get("id") || "nope");
    })
  );

  public optimizerIlvl = 1415;

  public roster$ = this.rosterService.roster$;

  public gearsetDisplay$ = this.gearset$.pipe(
    map(gearset => {
      const pieces = slots.map(slot => {
        let maxHoning = 15;
        switch (gearset[slot].rarity) {
          case ItemRarity.LEGENDARY:
            maxHoning = 20;
            break;
          case ItemRarity.RELIC:
            maxHoning = 25;
            break;
        }
        return {
          slot: `${slot.slice(0, 1).toUpperCase()}${slot.slice(1)}`,
          piece: gearset[slot],
          possibleHonings: new Array(maxHoning)
            .fill(null)
            .map((_, i) => i + 1)
            .filter(i => i > 5 || gearset[slot].rarity < ItemRarity.LEGENDARY),
          honingCost: this.gearsetService.getHoningCost(gearset[slot], slot)
        };
      });
      return {
        pieces,
        ilvl: pieces.reduce((acc, piece) => {
          return acc + this.gearsetService.getIlvl(piece.piece);
        }, 0) / 6,
        targetIlvl: pieces.reduce((acc, piece) => {
          return acc + this.gearsetService.getIlvl({ ...piece.piece, honing: piece.piece.targetHoning });
        }, 0) / 6,
        honingCost: pieces.reduce((acc, piece) => {
          if (piece.piece.rarity > ItemRarity.EPIC) {
            acc.GHleapstones += piece.honingCost?.leapstones || 0;
            acc.fusionMaterial += piece.honingCost?.fusionMaterial || 0;
          } else {
            acc.leapstones += piece.honingCost?.leapstones || 0;
            acc.lowFusionMaterial += piece.honingCost?.fusionMaterial || 0;
          }
          acc.shards += piece.honingCost?.shards || 0;
          if (piece.slot === "Weapon") {
            acc.Wstones += piece.honingCost?.stones || 0;
          } else {
            acc.stones += piece.honingCost?.stones || 0;
          }
          acc.gold += piece.honingCost?.gold || 0;
          acc.silver += piece.honingCost?.silver || 0;
          return acc;
        }, {
          GHleapstones: 0,
          leapstones: 0,
          shards: 0,
          stones: 0,
          Wstones: 0,
          gold: 0,
          silver: 0,
          fusionMaterial: 0,
          lowFusionMaterial: 0
        })
      };
    })
  );

  constructor(private gearsetService: GearsetService, private rosterService: RosterService,
              private route: ActivatedRoute, private nzModal: NzModalService) {
  }

  public saveSet(gearset: Gearset, piece: GearsetPiece, slot: string): void {
    if (piece.targetHoning < piece.honing) {
      piece.targetHoning = piece.honing;
    }
    this.gearsetService.updateOne(gearset.$key, {
      [slot.toLowerCase()]: piece,
      currentIlvl: slots.reduce((acc, slot) => {
        return acc + this.gearsetService.getIlvl(gearset[slot]);
      }, 0) / 6,
      targetIlvl: slots.reduce((acc, slot) => {
        return acc + this.gearsetService.getIlvl({ ...gearset[slot], honing: gearset[slot].targetHoning });
      }, 0) / 6
    });
  }

  renameGearset(gearset: Gearset): void {
    this.nzModal.create<TextQuestionPopupComponent, string | undefined>({
      nzContent: TextQuestionPopupComponent,
      nzTitle: "Rename gearset",
      nzComponentParams: {
        baseText: gearset.name,
        type: "input"
      },
      nzFooter: null
    }).afterClose.pipe(
      filter(Boolean),
      switchMap(name => {
        return this.gearsetService.updateOne(gearset.$key, { name });
      })
    ).subscribe();
  }

  optimizeHoning(gearset: Gearset, ilvl: number): void {
    const optimized = new HoningOptimizer(gearset, ilvl, this.gearsetService).run();
    slots.forEach((slot, i) => {
      gearset[slot].targetHoning = optimized[i];
    });
    this.gearsetService.setOne(gearset.$key, gearset);
  }
}
