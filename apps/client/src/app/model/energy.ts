import { DataModel } from "../core/database/data-model";

export interface Energy extends DataModel {
  data: Record<string, { amount: number }>;
  updated: number;
}
