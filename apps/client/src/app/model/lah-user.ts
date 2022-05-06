import { DataModel } from "../core/database/data-model";

export interface LAHUser extends DataModel {
  name: string;
  friends: string[];
}
