import { DataModel } from "../../core/database/data-model";
import { LostarkRegion } from "../lostark-region";
import { CharacterReference } from "../../core/database/character-reference";
import { GuildVisibility } from "./guild-visibility";

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
  server: string;
  discordServer?: string;
  visibility: GuildVisibility;
  // This is not a CharacterReference because it's used to query guilds per user ID
  users: string[];
}
