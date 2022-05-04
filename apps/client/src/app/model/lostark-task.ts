import { TaskFrequency } from "./task-frequency";
import { TaskScope } from "./task-scope";

export class LostarkTask {
  public readonly createdAt = Date.now();

  constructor(
    public label: string,
    public minIlvl: number,
    public frequency: TaskFrequency,
    public scope: TaskScope,
    public amount = 1,
    public maxIlvl = 9999,
    public iconPath?: string,
    public enabled = true,
    public custom = false,
    public readonly daysFilter: number[] = []
  ) {
  }
}
