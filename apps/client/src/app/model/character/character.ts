import { LostarkClass } from "./lostark-class";

export interface Character {
  id?: number;
  name: string;
  ilvl: number;
  lazy: boolean;
  class: LostarkClass;
  index?: number;
  isPrivate?: boolean;
  isHide?: boolean;
  weeklyGold: boolean;
  note?: string;
  tickets: {
    EbonyCubeLevel1: number;
    EbonyCubeLevel2: number;
    EbonyCubeLevel3: number;
    EbonyCubeLevel4: number;
    EbonyCubeLevel5: number;
    EbonyCube1stUnlock: number;
    EbonyCube2ndUnlock: number;
    EbonyCube3rdUnlock: number;
    EbonyCube4thUnlock: number;
  };
}
