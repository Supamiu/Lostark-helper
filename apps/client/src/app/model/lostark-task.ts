import { TaskFrequency } from "./task-frequency";
import { TaskScope } from "./task-scope";
import { DataModel } from "../core/database/data-model";


export const TASKS_VERSION = 9;

export class LostarkTask implements DataModel {
  public $key!: string;
  public notFound?: boolean;
  public authorId!: string;
  public version = TASKS_VERSION;

  public index = -1;
  public daysFilter: number[] = [];
  public enabled = true;
  public custom = false;

  constructor(
    public label?: string,
    public minIlvl?: number,
    public frequency?: TaskFrequency,
    public scope?: TaskScope,
    public amount = 1,
    public maxIlvl = 9999,
    public iconPath?: string,
    additionalParams: Partial<LostarkTask> = {}
  ) {
    Object.assign(this, additionalParams);
  }
}
