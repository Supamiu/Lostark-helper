import { LostarkClass } from "./lostark-class";
import { CharacterReference } from "../../core/database/character-reference";

export interface Character {
  id?: number;
  name: string;
  ilvl: number;
  lazy: boolean;
  class: LostarkClass;
  index?: number;
  isPrivate?: boolean;
  note?: string;
  tickets: {
    t1Cube: number;
    t2BossRush: number;
    t2Cube: number;
    t3BossRush: number;
    t3Cube: number;
    platinumFields: number;
  };
  ref?: CharacterReference;
}
