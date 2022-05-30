import { Gearset } from "../../../model/character/gearset";
import { GearsetService } from "../../../core/database/services/gearset.service";
import { ItemRarity } from "../../../model/item-rarity";

type Genome = [number, number, number, number, number, number];

const slots = [
  "headgear",
  "shoulders",
  "chestpiece",
  "legwear",
  "gloves",
  "weapon"
];

export class HoningOptimizer {
  private static MAX_ITERATIONS = 50000;

  private maxHoning: Genome;
  private minHoning: Genome;

  constructor(private gearset: Gearset, private ilvl: number, private gearsetService: GearsetService) {
    this.maxHoning = slots.map(slot => {
      const piece = gearset[slot];
      switch (piece.rarity) {
        case ItemRarity.RARE:
        case ItemRarity.EPIC:
          return 15;
        case ItemRarity.LEGENDARY:
          return 20;
        case ItemRarity.RELIC:
          return 25;
        default:
          return 0;
      }
    }) as Genome;
    this.minHoning = slots.map(slot => gearset[slot]?.honing) as Genome;
  }

  public run(): Genome {
    if (this.gearset.currentIlvl >= this.ilvl) {
      return [
        "headgear",
        "shoulders",
        "chestpiece",
        "legwear",
        "gloves",
        "weapon"
      ].map(slot => this.gearset[slot]?.honing) as Genome;
    }

    let best = this.newGenome();
    for (let i = 0; i < HoningOptimizer.MAX_ITERATIONS; i++) {
      const newRandom = this.newGenome();
      if (this.fitness(newRandom) < this.fitness(best)) {
        best = newRandom;
      }
    }
    return best;
  }

  private fitness(genome: Genome): number {
    const cost = slots.reduce((acc, slot, i) => {
      const piece = this.gearset[slot];
      let bonus = 1;
      switch (slot) {
        case "weapon":
          bonus = 0.2;
          break;
        case "gloves":
          bonus = 0.6;
          break;
        case "headgear":
          bonus = 0.6;
          break;
      }
      const honingCost = this.gearsetService.getHoningCost({ ...piece, targetHoning: genome[i] }, slot);
      if (piece.rarity > ItemRarity.EPIC) {
        acc.GHleapstones += (honingCost?.leapstones || 0) * bonus;
        acc.fusionMaterial += (honingCost?.fusionMaterial || 0) * bonus;
      } else {
        acc.leapstones += (honingCost?.leapstones || 0) * bonus;
        acc.lowFusionMaterial += (honingCost?.fusionMaterial || 0) * bonus;
      }
      acc.shards += (honingCost?.shards || 0) * bonus;
      if (piece.slot === "Weapon") {
        acc.Wstones += (honingCost?.stones || 0) * bonus;
      } else {
        acc.stones += (honingCost?.stones || 0) * bonus;
      }
      acc.gold += (honingCost?.gold || 0) * bonus;
      acc.silver += (honingCost?.silver || 0) * bonus;
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
    });
    return cost.GHleapstones * 100
      + cost.leapstones * 20
      + cost.shards / 20
      + cost.stones * 0.8
      + cost.Wstones * 0.3
      + cost.gold
      + cost.silver / 10000
      + cost.fusionMaterial * 8
      + cost.lowFusionMaterial * 8;
  }

  private newGenome(): Genome {
    const genome: Genome = [0, 0, 0, 0, 0, 0];
    while (this.getIlvl(genome) < this.ilvl) {
      const index = Math.floor(Math.random() * genome.length);
      genome[index] = Math.max(Math.min(genome[Math.floor(Math.random() * genome.length)] + 1, this.maxHoning[index]), this.minHoning[index]);
    }
    return genome;
  }

  private getIlvl(genome: Genome): number {
    return [
      "headgear",
      "shoulders",
      "chestpiece",
      "legwear",
      "gloves",
      "weapon"
    ].reduce((acc, key, i) => acc + this.gearsetService.getIlvl({ ...this.gearset[key], honing: genome[i] }), 0) / 6;
  }
}
