import { DataModel } from "../core/database/data-model";

export interface ManualWeeklyGoldEntry {
  timestamp: number;
  amount: number;
}

export interface Settings extends DataModel {
  hiddenOnCompletion: boolean;
  crystallineAura: boolean;
  lazytracking: Record<string, boolean>;
  manualGoldEntries: Record<string, ManualWeeklyGoldEntry>;
  // True = skip chest, False = take chest
  chestConfiguration: Record<string, boolean>;
    // True = skip gold, False = take gold
  goldPlannerConfiguration: Record<string, boolean>;
  forceAbyss: Record<string, boolean>;
}
