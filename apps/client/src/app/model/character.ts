import { LostarkClass } from "./lostark-class";

export interface Character {
  id?: number;
  name: string;
  ilvl: number;
  lazy: boolean;
  class: LostarkClass;
  index?: number;
  isPrivate?: boolean;
}
