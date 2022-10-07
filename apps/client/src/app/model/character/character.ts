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
    t1Cube: number;
    t2BossRush: number;
    t2Cube: number;
    t3BossRush: number;
    t3Cube: number;
    platinumFields: number;
  };
}
