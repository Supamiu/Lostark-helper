import { ItemRarity } from "../item-rarity";
import { EngravingEntry } from "../engraving-entry";
import { LostArkStat } from "../../data/lost-ark-stat";

export interface Accessory {
  //TODO item ID?
  quality: number;
  rarity: ItemRarity;

  stats: [LostArkStat] | [LostArkStat, LostArkStat] | [];

  engravings: EngravingEntry[];
}
