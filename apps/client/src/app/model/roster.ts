import { DataModel } from "../core/database/data-model";
import { Character } from "./character/character";

export interface Roster extends DataModel {
  characters: Character[];
  // Used to set some tasks to untracked per character when setting a flag to false
  trackedTasks: Record<string, boolean | undefined>;
}
