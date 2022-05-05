import { TaskFrequency } from "./task-frequency";
import { TaskScope } from "./task-scope";

export class LostarkTask {
  public id = Math.floor(Math.random() * Date.now());
  public index = -1;
  public daysFilter: number[] = [];
  public enabled = true;
  public custom = false;

  constructor(
    public label: string,
    public minIlvl: number,
    public frequency: TaskFrequency,
    public scope: TaskScope,
    public amount = 1,
    public maxIlvl = 9999,
    public iconPath?: string,
    public readonly additionalParams: Partial<LostarkTask> = {}
  ) {
    Object.assign(this, additionalParams);
  }
}
