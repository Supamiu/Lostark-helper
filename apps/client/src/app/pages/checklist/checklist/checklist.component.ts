import {Component} from '@angular/core';
import {BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, timer} from "rxjs";
import {LostarkTask} from "../../../model/lostark-task";
import {Character} from "../../../model/character";
import {subDays} from "date-fns";
import {TaskFrequency} from "../../../model/task-frequency";
import {TaskScope} from "../../../model/task-scope";
import {Completion} from "../../../model/completion";
import {RosterService} from "../../roster/roster.service";
import {TasksService} from "../../tasks/tasks.service";

@Component({
  selector: 'lostark-helper-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.less'],
})
export class ChecklistComponent {

  public TaskFrequency = TaskFrequency;

  private completionReloader$ = new BehaviorSubject<void>(void 0);

  public roster$: Observable<Character[]> = this.rosterService.roster$;

  public completion$: Observable<Completion> = this.completionReloader$.pipe(
    map(() => {
      return JSON.parse(localStorage.getItem('completion') || '{}');
    })
  );

  public tasks$: Observable<LostarkTask[]> = combineLatest([
    this.roster$,
    this.tasksService.tasks$
  ]).pipe(
    map(([roster, tasks]) => {
      return tasks.filter(task => {
        return task.enabled &&
          (!task.maxIlvl || roster.some(c => c.ilvl < task.maxIlvl && c.ilvl > task.minIlvl));
      })
    })
  );

  public lastDailyReset$ = timer(0, 1000).pipe(
    map(() => {
      // Only supports EU servers for now.
      let reset = new Date();
      reset.setUTCSeconds(0);
      reset.setUTCMinutes(0);
      reset.setUTCMilliseconds(0);
      if (reset.getUTCHours() < 10) {
        // This means the reset was yesterday
        reset = subDays(reset, 1);
      }
      reset.setUTCHours(10);
      return reset.getTime();
    }),
    distinctUntilChanged()
  );

  public lastWeeklyReset$ = timer(0, 1000).pipe(
    map(() => {
      // Target reset day Thursday
      const weeklyReset = 4;
      // Only supports EU servers for now.
      const reset = new Date();
      reset.setUTCSeconds(0);
      reset.setUTCMinutes(0);
      reset.setUTCMilliseconds(0);
      // Last Thursday
      reset.setDate(reset.getDate() - (reset.getDay() == weeklyReset ? 7 : (reset.getDay() + (7 - weeklyReset)) % 7));
      reset.setUTCHours(10);
      return reset.getTime();
    }),
    distinctUntilChanged()
  );

  public tableDisplay$ = combineLatest([
    this.roster$,
    this.tasks$,
    this.completion$,
    this.lastDailyReset$,
    this.lastWeeklyReset$
  ]).pipe(
    map(([roster, tasks, completion, dailyReset, weeklyReset]) => {
      const data = tasks
        .map(task => {
          const completionData = roster.map(character => {
            return {
              done: this.isTaskDone(
                task,
                character,
                completion,
                dailyReset,
                weeklyReset
              ),
              doable: character.ilvl >= task.minIlvl && character.ilvl <= task.maxIlvl
            }
          });
          return {
            task,
            completion: completionData.map(row => row.done),
            allDone: completionData.every(({doable, done}) => !doable || done >= task.amount)
          }
        })
        .reduce((acc, row) => {
          const frequencyKey = row.task.frequency === TaskFrequency.DAILY ? 'daily' : 'weekly';
          const scopeKey = row.task.scope === TaskScope.CHARACTER ? 'Character' : 'Roster';
          return {
            ...acc,
            [`${frequencyKey}${scopeKey}`]: [
              ...acc[`${frequencyKey}${scopeKey}`],
              row
            ]
          }
        }, {dailyCharacter: [], weeklyCharacter: [], dailyRoster: [], weeklyRoster: []})
      return {
        dailyReset,
        weeklyReset,
        data
      }
    })
  );

  public isEmpty$ = this.roster$.pipe(
    map(roster => roster.length === 0)
  );

  constructor(private rosterService: RosterService, private tasksService: TasksService) {
  }

  public markAsDone(completion: Completion, characterName: string, task: LostarkTask, roster: Character[], done: boolean, dailyReset: number, weeklyReset: number): void {
    const reset = task.frequency === TaskFrequency.DAILY ? dailyReset : weeklyReset;
    if (done) {
      const existingEntry = completion[this.getCompletionEntryKey(characterName, task)];
      if (existingEntry?.updated < reset) {
        existingEntry.amount = 0;
      }
      completion[this.getCompletionEntryKey(characterName, task)] = {
        ...(existingEntry || {}),
        amount: (existingEntry?.amount || 0) + 1,
        updated: Date.now()
      };
    } else if (task.scope === TaskScope.ROSTER && !done) {
      roster.forEach(c => {
        delete completion[this.getCompletionEntryKey(c.name, task)];
      })
    } else {
      delete completion[this.getCompletionEntryKey(characterName, task)];
    }
    localStorage.setItem('completion', JSON.stringify(completion));
    this.completionReloader$.next();
  }

  private isTaskDone(task: LostarkTask, character: Character, completion: Completion, dailyReset: number, weeklyReset: number): number {
    const completionFlag = completion[this.getCompletionEntryKey(character.name, task)];
    const reset = task.frequency === TaskFrequency.DAILY ? dailyReset : weeklyReset;
    if (!completionFlag) {
      return 0;
    }
    return completionFlag.updated < reset ? 0 : completionFlag.amount;
  }

  trackByEntry(index: number, entry: { task: LostarkTask, completion: number[] }): string {
    return entry.task.label;
  }

  private getCompletionEntryKey(characterName: string, task: LostarkTask): string {
    if (task.scope === TaskScope.ROSTER) {
      return `${task.label}:${task.frequency}`;
    }
    return `${characterName}:${task.label}:${task.frequency}`;
  }
}
