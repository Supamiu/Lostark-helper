import { GearsetRarity } from "../gearset-rarity";

export interface GearsetPiece {
  //TODO item ID?
  rarity: GearsetRarity;
  quality: number;
  honing: number;
  targetHoning: number;
  // TODO tripods
}
