import { CharacterReference } from "../../core/database/character-reference";
import { DataModel } from "../../core/database/data-model";
import { GearsetPiece } from "./gearset-piece";
import { Accessory } from "./accessory";
import { EngravingEntry } from "../engraving-entry";

export interface Gearset extends DataModel {
  authorId: string;
  name: string;
  currentIlvl: number;
  targetIlvl: number;
  character?: CharacterReference;
  t30strongholdBuff?: boolean;
  t31strongholdBuff?: boolean;


  // Left-hand side
  headgear: GearsetPiece;
  shoulders: GearsetPiece;
  chestpiece: GearsetPiece;
  legwear: GearsetPiece;
  gloves: GearsetPiece;
  weapon: GearsetPiece;

  engravings: [EngravingEntry, EngravingEntry] | [];

  necklace: Accessory;
  earring1: Accessory;
  earring2: Accessory;
  ring1: Accessory;
  ring2: Accessory;
  // wrist: Accessory;
  stone: Omit<Accessory, "stats" | "quality">;
}
