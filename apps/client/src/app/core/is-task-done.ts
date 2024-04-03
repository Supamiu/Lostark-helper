import { LostarkTask } from '../model/lostark-task';
import { Character } from '../model/character/character';
import { Completion } from '../model/completion';
import { subDays, subHours } from 'date-fns';
import { getCompletionEntry } from './get-completion-entry-key';
import { TaskFrequency } from '../model/task-frequency';
import { TaskScope } from '../model/task-scope';

export function isTaskDone(task: LostarkTask, character: Character, completion: Completion, dailyReset: number, weeklyReset: number, biWeeklyReset: number, theamineReset: number, lazyTracking: Record<string, boolean>): number {
  if (character.lazy && task.scope !== TaskScope.ROSTER) {
    const lazyTrackingFlag = lazyTracking && lazyTracking[`${character.name}:${task.$key}`];
    if (lazyTrackingFlag === undefined || lazyTrackingFlag) {
      dailyReset = subDays(new Date(dailyReset), 2).getTime();
    }
  }

  const completionFlag = getCompletionEntry(completion.data, character, task);
  const reset = {
    [TaskFrequency.DAILY]: dailyReset,
    [TaskFrequency.WEEKLY]: weeklyReset,
    [TaskFrequency.BIWEEKLY]: biWeeklyReset,
    [TaskFrequency.BIWEEKLY_OFFSET]: theamineReset,
  }[task.frequency];

  if (!completionFlag) {
    return 0;
  }

  if (task.frequency === TaskFrequency.ONE_TIME) {
    return completionFlag.amount;
  }

  return completionFlag.updated < reset ? 0 : completionFlag.amount;
}

export function isTaskAvailable(task: LostarkTask): boolean {
  const currentLADay = subHours(new Date(), 10);
  const currentUTCDay = currentLADay.getUTCDay();
  const hasDayFilter = task?.daysFilter?.length > 0;
  const isCurrentDay = task.daysFilter?.includes?.(currentUTCDay);

  if (!hasDayFilter) {
    return true;
  }

  if (hasDayFilter && isCurrentDay) {
    return true;
  }

  return false;
}
