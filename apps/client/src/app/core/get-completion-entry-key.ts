import { LostarkTask } from "../model/lostark-task";
import { TaskScope } from "../model/task-scope";

export function getCompletionEntryKey(characterName: string, task: LostarkTask): string {
  if (task.scope === TaskScope.ROSTER) {
    return `${task.label}:${task.frequency}`;
  }
  return `${characterName}:${task.label}:${task.frequency}`;
}
