import { LostarkClass } from "./lostark-class";

export interface Character {
  id?: number;
  name: string;
  ilvl: number;
  lazy: boolean;
  class: LostarkClass;
  className?: string;
  index?: number;
  isPrivate?: boolean;
  isHide?: boolean;
  weeklyGold: boolean;
  note?: string;
  tickets: {
    EbonyCubeLevel1: number;
    EbonyCubeLevel2: number;
    EbonyCubeLevel3: number;
    platinumFields: number;
  };
}
