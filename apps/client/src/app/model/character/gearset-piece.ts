import { ItemRarity } from "../item-rarity";

export interface GearsetPiece {
  //TODO item ID?
  rarity: ItemRarity;
  quality: number;
  honing: number;
  targetHoning: number;
  // TODO tripods
}
