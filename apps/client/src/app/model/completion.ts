import { DataModel } from "../core/database/data-model";
import { CompletionEntry } from "./completion-entry";

export interface Completion extends DataModel {
  data: {
    [index: string]: CompletionEntry
  };
}
