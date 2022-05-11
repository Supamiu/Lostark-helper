import { DataModel } from "../core/database/data-model";
import { LostarkRegion } from "./lostark-region";

export interface LAHUser extends DataModel {
  name: string;
  friends: string[];
  region: LostarkRegion;
}
