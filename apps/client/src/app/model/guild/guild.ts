import { DataModel } from "../../core/database/data-model";
import { LostarkRegion } from "../lostark-region";
import { CharacterReference } from "../../core/database/character-reference";

/**
 * Represents a guild ingame, all the user references are made using `<userId>:<characterId>`
 */
export interface Guild extends DataModel {
  name: string;
  leader: CharacterReference;
  officiers: CharacterReference[];
  guests: CharacterReference[];
  members: CharacterReference[];
  candidates: {
    ref: CharacterReference,
    message?: string
  }[];
  region: LostarkRegion;
  discordServer?: string;
  privateMembers?: boolean;
  // This is not a CharacterReference because it's used to query guilds per user ID
  users: string[];
}
