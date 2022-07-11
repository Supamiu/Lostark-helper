import { ItemRarity } from "../model/item-rarity";

/**
 * Formula is `Ceil(min + (quality/100) * (max - min))`
 */

export const QualityEffect = {
  necklace: {
    [ItemRarity.RARE]: [130, 350],
    [ItemRarity.EPIC]: [225, 400],
    [ItemRarity.LEGENDARY]: [225, 450],
    [ItemRarity.RELIC]: [400, 500]
  },
  earring: {
    [ItemRarity.RARE]: [75, 210],
    [ItemRarity.EPIC]: [135, 240],
    [ItemRarity.LEGENDARY]: [195, 270],
    [ItemRarity.RELIC]: [240, 300]
  },
  ring: {
    [ItemRarity.RARE]: [50, 140],
    [ItemRarity.EPIC]: [90, 160],
    [ItemRarity.LEGENDARY]: [130, 180],
    [ItemRarity.RELIC]: [160, 200]
  }
};

export function getPieceStatValue(slot: string, rarity: ItemRarity, quality: number): number {
  const effect = QualityEffect[slot.replace(/\d+/, "")][rarity];
  if (!effect) {
    throw new Error("Cannot find quality effect for slot " + slot);
  }
  return Math.ceil(effect[0] + ((effect[1] - effect[0]) * quality / 100));
}
