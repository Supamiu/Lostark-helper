import { Component, HostListener } from "@angular/core";
import { combineLatest, map, Observable, pluck } from "rxjs";
import { LostarkTask } from "../../../model/lostark-task";
import { Character } from "../../../model/character";
import { subDays, subHours } from "date-fns";
import { TaskFrequency } from "../../../model/task-frequency";
import { TaskScope } from "../../../model/task-scope";
import { Completion } from "../../../model/completion";
import { Energy } from "../../../model/energy";
import { getCompletionEntryKey } from "../../../core/get-completion-entry-key";
import { RosterService } from "../../../core/database/services/roster.service";
import { SettingsService } from "../../../core/database/services/settings.service";
import { EnergyService } from "../../../core/database/services/energy.service";
import { TimeService } from "../../../core/time.service";
import { CompletionService } from "../../../core/database/services/completion.service";
import { TasksService } from "../../../core/database/services/tasks.service";

@Component({
  selector: "lostark-helper-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.less"]
})
export class ChecklistComponent {

  public TaskFrequency = TaskFrequency;
  public TaskScope = TaskScope;

  public roster$: Observable<Character[]> = this.rosterService.roster$.pipe(
    pluck("characters")
  );

  public completion$: Observable<Completion> = this.completionService.completion$;

  public energy$ = this.energyService.energy$;

  public lastDailyReset$ = this.timeService.lastDailyReset$;
  public lastWeeklyReset$ = this.timeService.lastWeeklyReset$;

  public tasks$: Observable<LostarkTask[]> = combineLatest([
    this.roster$,
    this.tasksService.tasks$
  ]).pipe(
    map(([roster, tasks]) => {
      return tasks.filter(task => {
        return task.enabled &&
          (!task.maxIlvl || roster.some(c => c.ilvl <= task.maxIlvl && c.ilvl >= (task.minIlvl || 0)));
      });
    })
  );

  public tableDisplay$ = combineLatest([
    this.roster$,
    this.tasks$,
    this.completion$,
    this.lastDailyReset$,
    this.lastWeeklyReset$,
    this.settings.settings$.pipe(pluck("lazytracking")),
    this.energy$
  ]).pipe(
    map(([roster, tasks, completion, dailyReset, weeklyReset, lazyTracking, energy]) => {
      const data = tasks
        .map(task => {
          const completionData = roster.map(character => {
            return {
              done: this.isTaskDone(
                task,
                character,
                completion,
                dailyReset,
                weeklyReset,
                lazyTracking
              ),
              doable: character.ilvl >= (task.minIlvl || 0) && character.ilvl <= task.maxIlvl,
              energy: energy.data[getCompletionEntryKey(character.name, task)] || 0
            };
          });
          return {
            task,
            hasEnergy: ["Una", "Guardian", "Chaos"].some(n => task.label?.startsWith(n)),
            completion: completionData.map(row => row.done),
            energy: completionData.map(row => row.energy),
            completionData,
            allDone: completionData.every(({ doable, done }) => !doable || done >= task.amount || done === -1)
          };
        })
        .reduce((acc, row) => {
          const frequencyKey = row.task.frequency === TaskFrequency.DAILY ? "daily" : "weekly";
          const scopeKey = row.task.scope === TaskScope.CHARACTER ? "Character" : "Roster";
          return {
            ...acc,
            [`${frequencyKey}${scopeKey}`]: [
              ...acc[`${frequencyKey}${scopeKey}`],
              row
            ]
          };
        }, { dailyCharacter: [], weeklyCharacter: [], dailyRoster: [], weeklyRoster: [] });

      return {
        roster: roster.map((c, i) => {
          const done = [...data.dailyCharacter, ...data.weeklyCharacter].every(
            (row: { completionData: { doable: boolean, done: number }[], task: LostarkTask }) => {
              const completion = row.completionData[i];
              return !completion.doable || !row.task.enabled || completion.done >= row.task.amount;
            });
          return {
            ...c,
            done
          };
        }),
        dailyReset,
        weeklyReset,
        data
      };
    })
  );

  public isEmpty$ = this.roster$.pipe(
    map(roster => roster.length === 0)
  );

  public tableHeight!: number;

  constructor(private rosterService: RosterService, private tasksService: TasksService,
              private settings: SettingsService, private energyService: EnergyService,
              private timeService: TimeService, private completionService: CompletionService) {
    this.setTableHeight();
  }

  @HostListener("window:resize")
  setTableHeight(): void {
    this.tableHeight = window.innerHeight - 64 - 48 - 130;
  }

  public markAsDone(completion: Completion, energy: Energy, characterName: string, task: LostarkTask, roster: Character[], done: boolean, dailyReset: number, weeklyReset: number, clickEvent?: MouseEvent): void {
    const reset = task.frequency === TaskFrequency.DAILY ? dailyReset : weeklyReset;
    if (done) {
      const setAllDone = clickEvent?.ctrlKey;
      const existingEntry = completion.data[getCompletionEntryKey(characterName, task)];
      if (existingEntry?.updated < reset) {
        existingEntry.amount = 0;
      }
      completion.data[getCompletionEntryKey(characterName, task)] = {
        ...(existingEntry || {}),
        amount: setAllDone ? task.amount : (existingEntry?.amount || 0) + 1,
        updated: Date.now()
      };
      if (task.scope === TaskScope.CHARACTER
        && task.frequency === TaskFrequency.DAILY
        && ["Chaos", "Guardian", "Una"].some(n => task.label?.startsWith(n))) {
        const energyEntry = energy.data[getCompletionEntryKey(characterName, task)] || { amount: 0 };
        if (energyEntry.amount >= 20) {
          energyEntry.amount = Math.max(energyEntry.amount - (20 * (setAllDone ? task.amount : 1)), 0);
          this.energyService.updateOne(energy.$key, {
            [`data.${getCompletionEntryKey(characterName, task)}`]: energyEntry
          });
        }
      }
    } else if (task.scope === TaskScope.ROSTER && !done) {
      roster.forEach(c => {
        delete completion.data[getCompletionEntryKey(c.name, task)];
      });
    } else {
      delete completion.data[getCompletionEntryKey(characterName, task)];
    }
    this.completionService.setOne(completion.$key, completion);
  }

  private isTaskDone(task: LostarkTask, character: Character, completion: Completion, dailyReset: number, weeklyReset: number, lazyTracking: Record<string, boolean>): number {
    if (character.lazy) {
      const lazyTrackingFlag = lazyTracking && lazyTracking[`${character.name}:${task.$key}`];
      if (lazyTrackingFlag === undefined || lazyTrackingFlag) {
        dailyReset = subDays(new Date(dailyReset), 2).getTime();
      }
    }
    const currentLADay = subHours(new Date(), 10);
    if (task.daysFilter?.length > 0 && !task.daysFilter?.includes(currentLADay.getUTCDay() - 1)) {
      return -1;
    }
    const completionFlag = completion.data[getCompletionEntryKey(character.name, task)];
    const reset = task.frequency === TaskFrequency.DAILY ? dailyReset : weeklyReset;
    if (!completionFlag) {
      return 0;
    }
    return completionFlag.updated < reset ? 0 : completionFlag.amount;
  }

  trackByEntry(index: number, entry: { task: LostarkTask, completion: number[] }): string | undefined {
    return entry.task.label;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
