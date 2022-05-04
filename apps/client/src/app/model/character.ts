import { LostarkClass } from "./lostark-class";

export interface Character {
  name: string;
  ilvl: number;
  lazy: boolean;
  class: LostarkClass
}
