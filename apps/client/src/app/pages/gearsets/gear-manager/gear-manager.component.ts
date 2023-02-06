import { Component } from "@angular/core";
import { GearsetService } from "../../../core/database/services/gearset.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, combineLatest, map, shareReplay, switchMap } from "rxjs";
import { RosterService } from "../../../core/database/services/roster.service";
import { ItemRarity } from "../../../model/item-rarity";
import { GearsetPiece } from "../../../model/character/gearset-piece";
import { Gearset } from "../../../model/character/gearset";
import { filter, first } from "rxjs/operators";
import { NzModalService } from "ng-zorro-antd/modal";
import { TextQuestionPopupComponent } from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { HoningOptimizer } from "./honing-optimizer";
import { HoningService } from "../../../core/services/honing.service";
import { AuthService } from "../../../core/database/services/auth.service";
import { LostArkStat } from "../../../data/lost-ark-stat";
import { EngravingsService } from "../../../core/services/engravings.service";
import { getPieceStatValue } from "../../../data/quality-effect";
import { LostarkClass } from "../../../model/character/lostark-class";
import { isSameCharacter } from "../../../core/database/character-reference";
import { Roster } from "../../../model/roster";
import { NzMessageService } from "ng-zorro-antd/message";
import { EngravingEntry } from "../../../model/engraving-entry";
import { LostArkEngraving } from "../../../data/lost-ark-engraving";
import { GearsetRarity } from "../../../model/gearset-rarity";

const slots = [
  "headgear",
  "shoulders",
  "chestpiece",
  "legwear",
  "gloves",
  "weapon"
];

const engravingsSlots = [
  "engravings",
  "necklace",
  "earring1",
  "earring2",
  "ring1",
  "ring2",
  "stone"
];

const statsSlots = [
  "necklace",
  "earring1",
  "earring2",
  "ring1",
  "ring2"
];

@Component({
  selector: "lostark-helper-gear-manager",
  templateUrl: "./gear-manager.component.html",
  styleUrls: ["./gear-manager.component.less"]
})
export class GearManagerComponent {

  public GearsetRarity = GearsetRarity;
  public ItemRarity = ItemRarity;
  public LostArkStat = LostArkStat;

  public stats;

  public gearset$ = this.route.paramMap.pipe(
    switchMap(params => {
      return this.gearsetService.getOne(params.get("id") || "nope");
    })
  );

  public optimizerIlvl = 1415;

  public roster$ = this.rosterService.roster$;

  public pity$ = new BehaviorSubject<boolean>(false);

  public readonly$ = combineLatest([
    this.auth.uid$,
    this.gearset$
  ]).pipe(
    map(([uid, gearset]) => gearset.authorId !== uid),
    shareReplay(1)
  );

  public gearsetDisplay$ = combineLatest([this.gearset$, this.pity$]).pipe(
    map(([gearset, pity]) => {
      const pieces = slots.map(slot => {
        let maxHoning = 15;
        switch (gearset[slot].rarity) {
          case GearsetRarity.LEGENDARY:
            maxHoning = 20;
            break;
          case GearsetRarity.RELIC:
            maxHoning = 25;
            break;
          case GearsetRarity.BREL_RELIC:
            maxHoning = 20;
            break;
        }
        return {
          slot: `${slot.slice(0, 1).toUpperCase()}${slot.slice(1)}`,
          piece: gearset[slot],
          possibleHonings: new Array(maxHoning)
            .fill(null)
            .map((_, i) => i + 1)
            .filter(i => i > 5 || gearset[slot].rarity < GearsetRarity.LEGENDARY),
          honingCost: this.honingService.getHoningCost(gearset[slot], slot, gearset, pity)
        };
      });
      return {
        pieces,
        ilvl: pieces.reduce((acc, piece) => {
          return acc + this.honingService.getIlvl(piece.piece);
        }, 0) / 6,
        targetIlvl: pieces.reduce((acc, piece) => {
          return acc + this.honingService.getIlvl({ ...piece.piece, honing: piece.piece.targetHoning });
        }, 0) / 6,
        honingCost: pieces.reduce((acc, piece) => {
          if (piece.piece.rarity >= GearsetRarity.BREL_RELIC) {
            acc.MVleapstones += piece.honingCost?.leapstones || 0;
            acc.superiorFusionMaterial += piece.honingCost?.fusionMaterial || 0;
          }
          else if (piece.piece.rarity > GearsetRarity.EPIC) {
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
          MVleapstones: 0,
          GHleapstones: 0,
          leapstones: 0,
          shards: 0,
          stones: 0,
          Wstones: 0,
          gold: 0,
          silver: 0,
          superiorFusionMaterial: 0,
          fusionMaterial: 0,
          lowFusionMaterial: 0
        })
      };
    })
  );

  public engravingsDisplay$ = this.gearset$.pipe(
    map(gearset => {
      return engravingsSlots.map(slot => {
        const piece = gearset[slot];
        const isStone = slot === "stone";
        const isRare = piece.rarity === ItemRarity.RARE;
        const showNegative = ( !isRare || isStone ) && slot !== "engravings";

        // For Stone: Rare = 6, Epic = 8, Legendary = 9, Relic = 10
        // For other: Rare = 1, Epic = 2, Legendary = 4
        const maxNodesBaseCountForStone = isRare ? 1 : piece?.rarity;
        const maxNodesInitial = isStone ? maxNodesBaseCountForStone + 5 : piece?.rarity + -1;

        const minNodes = isStone ? 0 : 1;
        let maxNodes = new Array(2).fill(maxNodesInitial);

        // Relic = 5 to one, 3 to another
        if (piece?.rarity === ItemRarity.RELIC && !isStone) {
          maxNodes = [5, 5];
          const maxBonusIndex = gearset[slot]?.engravings.findIndex(e => e.nodes > 3);
          if (maxBonusIndex > -1) {
            maxNodes[(maxBonusIndex + 1) % 2] = 3;
          }
        }

        // Negative engraving (only applied for +RARE)
        if (showNegative) {
          // For Stone: Same than positive engravings
          // For other: 3
          maxNodes.push(isStone ? maxNodesInitial : 3);

          // Migrating old data to negative engraving
          if (piece?.engravings?.length === 2) {
            piece.engravings.push({ engravingId: 0, nodes: 0 });
          }
        }

        return {
          slot,
          name: `${slot.slice(0, 1).toUpperCase()}${slot.slice(1).replace(/\d+/, "")}`,
          piece,
          minNodes,
          maxNodes,
          pieceStatValue: gearset[slot]?.quality > -1 ? getPieceStatValue(slot, gearset[slot].rarity, gearset[slot].quality) : 0,
          showNegative
        };
      });
    })
  );

  public engravings$ = this.engravingsService.engravings$;

  public allEngravings$ = this.engravingsService.allEngravings$;

  public statsDisplay$ = combineLatest([this.gearset$, this.allEngravings$]).pipe(
    map(([gearset, engravings]) => {
      const allEngravings = this.engravingsService.getTotalEngravings(gearset)
        .map(engraving => this.mapEngravingToDisplay(engraving, engravings))
        .sort((a, b) => b.nodes - a.nodes)
        .filter(e => e.nodes > 0)

      return {
        engravings: allEngravings.filter(e => e.type !== 'negative'),
        negativeEngravings: allEngravings.filter(e => e.type === 'negative'),
        stats: this.getStatsTotal(gearset)
      };
    })
  );

  constructor(private gearsetService: GearsetService, private honingService: HoningService, private rosterService: RosterService,
              private route: ActivatedRoute, private nzModal: NzModalService, private auth: AuthService,
              private engravingsService: EngravingsService, private message: NzMessageService) {
  }

  private mapEngravingToDisplay(engraving: EngravingEntry, engravings: LostArkEngraving[]) {
    const data = engravings.find(e => e.id === engraving.engravingId);
    const level = Math.min(Math.floor(engraving.nodes / 5), 3);
    const description = data?.nodes?.[ level-1 ] ?? 'No effect';

    return {
      ...engraving,
      type: data?.type,
      name: data?.name,
      description,
      overflow: Math.max(engraving.nodes - 15, 0),
      level
    };
  }


  public saveSet(gearset: Gearset, piece: GearsetPiece, slot: string): void {
    if (piece.targetHoning < piece.honing) {
      piece.targetHoning = piece.honing;
    }
    this.gearsetService.updateOne(gearset.$key, {
      [slot.toLowerCase()]: piece,
      currentIlvl: slots.reduce((acc, slot) => {
        return acc + this.honingService.getIlvl(gearset[slot]);
      }, 0) / 6,
      targetIlvl: slots.reduce((acc, slot) => {
        return acc + this.honingService.getIlvl({ ...gearset[slot], honing: gearset[slot].targetHoning });
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

  updateLink(gearset: Gearset): void {
    this.gearsetService.updateOne(gearset.$key, {character: gearset.character})
  }

  updateIlvl(gearset: Gearset, roster: Roster): void {
    const updated = {
      ...roster, characters: roster.characters.map(c => {
        if (isSameCharacter(gearset.character || "a:0", roster.$key, c.id || 1)) {
          return {
            ...c,
            ilvl: Math.floor(gearset.currentIlvl * 100) / 100
          };
        }
        return c;
      })
    };
    this.rosterService.updateOne(roster.$key, updated);
    this.message.success("Ilvl applied to your character in roster settings");
  }

  optimizeHoning(gearset: Gearset, ilvl: number): void {
    this.roster$.pipe(
      first(),
      map(roster => {
        let cClass = LostarkClass.SORCERESS;
        if (gearset.character) {
          cClass = roster.characters.find(c => isSameCharacter(gearset.character || "a:0", roster.$key, c.id || 1))?.class || LostarkClass.SORCERESS;
        }
        const optimized = new HoningOptimizer(gearset, ilvl, this.honingService, cClass).run();
        slots.forEach((slot, i) => {
          gearset[slot].targetHoning = optimized[i];
        });
        gearset.targetIlvl = ilvl;
        return gearset;
      })
    ).subscribe(optimized => {
      this.gearsetService.setOne(gearset.$key, optimized);
    });
  }

  saveEngravingsChange(gearset: Gearset): void {
    this.gearsetService.setOne(gearset.$key, gearset);
  }

  saveStatsChange(gearset: Gearset, slot: string, stats: LostArkStat | LostArkStat[]): void {
    if (Array.isArray(stats)) {
      this.gearsetService.updateOne(gearset.$key, { [`${slot}.stats`]: stats });
    } else {
      this.gearsetService.updateOne(gearset.$key, { [`${slot}.stats`]: [stats] });
    }
  }

  floor(n: number): number {
    return Math.floor(n);
  }

  private getStatsTotal(gearset: Gearset): { stat: LostArkStat, value: number }[] {
    return statsSlots.reduce((acc, slot) => {
      gearset[slot].stats.forEach(stat => {
        const existingEntry = acc.find(e => e.stat === stat);
        if (existingEntry) {
          existingEntry.value += getPieceStatValue(slot, gearset[slot].rarity, gearset[slot].quality);
        } else {
          acc.push({
            stat,
            value: getPieceStatValue(slot, gearset[slot].rarity, gearset[slot].quality)
          });
        }
      });
      return acc;
    }, [] as { stat: LostArkStat, value: number }[]);
  }

  public trackBySlot(index: number, row: { slot: string }): string {
    return row.slot;
  }
}
