import { DataModel } from "../core/database/data-model";
import { LostarkRegion } from "./lostark-region";
import { Availability } from "./availability/availability";

export interface LAHUser extends DataModel {
  name: string;
  friends: string[];
  region: LostarkRegion;
  availability?: Availability;
}
