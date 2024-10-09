import { TaskFrequency } from "./task-frequency";
import { TaskScope } from "./task-scope";
import { DataModel } from "../core/database/data-model";

export const TASKS_VERSION = 52;

export interface LostarkTask extends DataModel {
  authorId?: string;
  version: number;
  index: number;
  daysFilter: number[];
  canEditDaysFilter: boolean;
  enabled: boolean;
  custom: boolean;
  shared: boolean;
  partySize: number;
  label: string;
  minIlvl: number;
  frequency: TaskFrequency;
  scope: TaskScope;
  amount: number;
  maxIlvl?: number;
  iconPath?: string;
}

export function createTask(
  label: string,
  minIlvl: number,
  frequency: TaskFrequency,
  scope: TaskScope,
  amount = 1,
  maxIlvl = 9999,
  iconPath?: string,
  additionalParams: Partial<LostarkTask> = {}
): LostarkTask {
  return {
    label,
    minIlvl,
    frequency,
    scope,
    amount,
    maxIlvl,
    iconPath,
    version: TASKS_VERSION,
    index: -1,
    daysFilter: [],
    enabled: true,
    custom: false,
    shared: false,
    partySize: 0,
    canEditDaysFilter: true,
    ...additionalParams
  } as LostarkTask;
}
