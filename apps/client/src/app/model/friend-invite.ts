import { DataModel } from "../core/database/data-model";

export interface FriendInvite extends DataModel {
  from: string;
  to: string;
  date: number;
}
