import { LostarkTask } from "../model/lostark-task";
import { TaskScope } from "../model/task-scope";
import { Character } from "../model/character";

export function getCompletionEntryKey(character: { id?: number, name: string }, task: LostarkTask, forceName = false): string {
  if (task.scope === TaskScope.ROSTER) {
    return task.$key;
  }
  if (!forceName && character.id) {
    return `${character.id}:${task.$key}`;
  }
  return `${character.name}:${task.$key}`;
}

export function getCompletionEntry<T>(data: Record<string, T>, character: Character, task: LostarkTask): T {
  const baseKey = getCompletionEntryKey(character, task);
  if (data[baseKey]) {
    return data[baseKey];
  }
  return data[getCompletionEntryKey(character, task, true)];
}

export function setCompletionEntry<T>(data: Record<string, T>, character: Character, task: LostarkTask, entry: T): void {
  data[getCompletionEntryKey(character, task)] = entry;
  if (data[getCompletionEntryKey(character, task, true)]) {
    delete data[getCompletionEntryKey(character, task, true)];
  }
}
