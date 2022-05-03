import {TaskFrequency} from "./task-frequency";
import {TaskScope} from "./task-scope";

export class LostarkTask {

  constructor(
    public readonly label: string,
    public readonly minIlvl: number,
    public readonly frequency: TaskFrequency,
    public readonly scope: TaskScope,
    public readonly amount = 1,
    public readonly maxIlvl = 9999,
    public readonly iconPath?: string,
  ) {
  }
}
