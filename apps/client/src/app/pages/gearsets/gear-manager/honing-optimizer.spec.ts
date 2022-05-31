import { HoningOptimizer } from "./honing-optimizer";
import { HoningService } from "../../../core/services/honing.service";
import { Gearset } from "../../../model/character/gearset";

const gearset: Gearset = {
  "earring2": {
    "rarity": 2,
    "quality": 100
  },
  "ring2": {
    "rarity": 2,
    "quality": 100
  },
  "name": "Example gearset",
  "necklace": {
    "rarity": 2,
    "quality": 100
  },
  "targetIlvl": 1417.5,
  "authorId": "DpFEurt0evNnHtDrd7VrbZbis243",
  "currentIlvl": 1400,
  "headgear": {
    "honing": 12,
    "rarity": 4,
    "targetHoning": 14,
    "quality": 100
  },
  "gloves": {
    "honing": 12,
    "rarity": 4,
    "quality": 100,
    "targetHoning": 14
  },
  "ring1": {
    "quality": 100,
    "rarity": 2
  },
  "weapon": {
    "quality": 100,
    "rarity": 4,
    "targetHoning": 15,
    "honing": 12
  },
  "earring1": {
    "rarity": 2,
    "quality": 100
  },
  "legwear": {
    "rarity": 4,
    "honing": 12,
    "targetHoning": 16,
    "quality": 100
  },
  "shoulders": {
    "targetHoning": 16,
    "quality": 100,
    "honing": 12,
    "rarity": 4
  },
  "stone": {
    "rarity": 2
  },
  "character": "DpFEurt0evNnHtDrd7VrbZbis243:421451172",
  "chestpiece": {
    "honing": 12,
    "rarity": 4,
    "targetHoning": 15,
    "quality": 100
  },
  "$key": "DmPtuH2Z3p73OXCoprog"
};

describe("Honing Optimizer", () => {
  it("Should compute fitness properly", () => {
    const optimizer = new HoningOptimizer(gearset, 1415, new HoningService());
    expect(optimizer.fitness([12, 12, 12, 17, 12, 17])).toBeGreaterThan(0);
    expect(optimizer.fitness([12, 12, 12, 17, 12, 17])).toBeLessThan(optimizer.fitness([15, 15, 15, 15, 15, 15]));
    expect(optimizer.fitness([12, 12, 12, 17, 12, 17])).toBeLessThan(optimizer.fitness([17, 12, 12, 17, 12, 12]));
    expect(optimizer.fitness([12, 12, 12, 17, 12, 17])).toBeLessThan(optimizer.fitness([12, 12, 12, 12, 12, 20]));
  });
});
