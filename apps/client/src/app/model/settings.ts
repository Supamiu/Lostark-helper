import { DataModel } from "../core/database/data-model";

export interface Settings extends DataModel {
  crystallineAura: boolean;
  lazytracking: Record<string, boolean>;
  // True = skip chest, False = take chest
  chestConfiguration: Record<string, boolean>;
  forceAbyss: Record<string, boolean>;
}
