import { LostarkTask } from "./lostark-task";
import { Subtask } from "../pages/party-planner/subtask";

export interface LostarkTaskWithSubtask extends LostarkTask {
  subTask: Subtask;
}
