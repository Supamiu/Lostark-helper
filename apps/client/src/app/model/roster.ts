import { DataModel } from "../core/database/data-model";
import { Character } from "./character";

export interface Roster extends DataModel {
  characters: Character[];
}
