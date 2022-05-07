import { LostarkTask } from "./lostark-task";
import { Subtask } from "../pages/party-planner/subtask";

export class LostarkTaskWithSubtask extends LostarkTask {
  constructor(parent: LostarkTask, public readonly subTask: Subtask, maxIlvl = 9999) {
    super();
    Object.assign(this, parent);
    this.minIlvl = subTask.minIlvl;
    this.maxIlvl = maxIlvl;
  }
}
