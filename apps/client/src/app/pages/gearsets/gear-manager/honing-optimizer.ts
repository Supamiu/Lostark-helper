import { Gearset } from "../../../model/character/gearset";
import { ItemRarity } from "../../../model/item-rarity";
import { HoningService } from "../../../core/services/honing.service";

type Genome = [number, number, number, number, number, number];

const slots = [
  "headgear",
  "shoulders",
  "chestpiece",
  "legwear",
  "gloves",
  "weapon"
];

interface HoningCost {
  leapstones: number;
  shards: number;
  stones: number;
  gold: number;
  silver: number;
  fusionMaterial: number;
}

export class HoningOptimizer {
  private static POPULATION_SIZE = 100;
  private static MAX_GENERATIONS = 150;

  private readonly maxHoning: Genome;
  private readonly minHoning: Genome;

  private population!: Genome[];

  private costCache: Record<string, HoningCost> = {};
  private genomeFitnessCache: Record<string, number> = {};

  constructor(private gearset: Gearset, private ilvl: number, private honingService: HoningService) {
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

    const freeHoning = {
      leapstones: 0,
      shards: 0,
      stones: 0,
      gold: 0,
      silver: 0,
      fusionMaterial: 0
    };
    new Array(25).fill(null).forEach((_, i) => {
      const honing = i + 1;
      slots.forEach(slot => {
        this.costCache[`${slot}:${honing}`] = this.honingService.getHoningCost({ ...gearset[slot], targetHoning: honing }, slot) || freeHoning;
      });
    });
  }

  public run(): Genome {
    if (this.getIlvl(this.maxHoning) <= this.ilvl) {
      return this.maxHoning;
    }
    if (this.gearset.currentIlvl >= this.ilvl) {
      return this.minHoning;
    }

    this.population = new Array(HoningOptimizer.POPULATION_SIZE)
      .fill(null)
      .map(() => this.newGenome());

    for (let generation = 0; generation < HoningOptimizer.MAX_GENERATIONS; generation++) {
      const ranked = this.population.sort((a, b) => this.fitness(a) - this.fitness(b));
      const winners = ranked.slice(0, Math.floor(ranked.length / 2));
      const renewPopulation = Math.floor(winners.length / 10);
      const children = winners.slice(0, -renewPopulation).map(winner => this.makeChild(winner));
      const newGenomes = new Array(renewPopulation).fill(null).map(() => this.newGenome());
      this.population = [...winners, ...children, ...newGenomes];
    }

    return this.population.sort((a, b) => this.fitness(a) - this.fitness(b))[0];
  }

  public fitness(genome: Genome): number {
    if (!this.genomeFitnessCache[JSON.stringify(genome)]) {
      let penalty = this.getIlvl(genome) != this.ilvl ? 2 : 1;
      const cost = slots.reduce((acc, slot, i) => {
        const piece = this.gearset[slot];
        let bonus = 1;
        switch (slot) {
          case "weapon":
            bonus = 0.5;
            break;
          case "gloves":
            bonus = 0.7;
            break;
          case "shoulders":
            bonus = 0.8;
            break;
        }
        const honingCost = this.costCache[`${slot}:${genome[i]}`];
        if (piece.rarity > ItemRarity.EPIC) {
          acc.GHleapstones += (honingCost?.leapstones || 0) * bonus;
          acc.fusionMaterial += (honingCost?.fusionMaterial || 0) * bonus;
        } else {
          acc.leapstones += (honingCost?.leapstones || 0) * bonus;
          acc.lowFusionMaterial += (honingCost?.fusionMaterial || 0) * bonus;
        }
        acc.shards += (honingCost?.shards || 0) * bonus;
        if (slot === "weapon") {
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
      if (cost.stones === 0 || cost.Wstones === 0) {
        penalty += 1;
      }
      this.genomeFitnessCache[JSON.stringify(genome)] = (cost.GHleapstones * 100
        + cost.leapstones * 20
        + cost.shards / 20
        + cost.stones * 0.8
        + cost.Wstones * 0.8
        + cost.gold
        + cost.silver / 10000
        + cost.fusionMaterial * 8
        + cost.lowFusionMaterial * 8) * penalty;
    }
    return this.genomeFitnessCache[JSON.stringify(genome)];
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
    ].reduce((acc, key, i) => acc + this.honingService.getIlvl({ ...this.gearset[key], honing: genome[i] }), 0) / 6;
  }

  private makeChild(genome: Genome, iterations = 0): Genome {
    const child = [...genome] as Genome;
    // Make one reduction
    let indexReduction: number;
    do {
      indexReduction = Math.floor(Math.random() * child.length);
    } while (child[indexReduction] === this.minHoning[indexReduction]);
    child[indexReduction]--;

    // Then compensate for it
    while (this.getIlvl(child) < this.ilvl) {
      const index = Math.floor(Math.random() * child.length);
      child[index] = Math.max(Math.min(child[Math.floor(Math.random() * child.length)] + 1, this.maxHoning[index]), this.minHoning[index]);
    }

    // If we already made one like that or it's above ilvl, let's mutate more !
    if ((this.genomeFitnessCache[JSON.stringify(child)] || this.getIlvl(genome) > this.ilvl) && iterations < 10) {
      return this.makeChild(child, iterations + 1);
    }

    return child;
  }
}
