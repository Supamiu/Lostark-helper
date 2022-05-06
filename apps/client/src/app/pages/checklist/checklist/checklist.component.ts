import { Component, HostListener } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, pluck, switchMap, timer } from "rxjs";
import { LostarkTask } from "../../../model/lostark-task";
import { Character } from "../../../model/character";
import { subDays, subHours } from "date-fns";
import { TaskFrequency } from "../../../model/task-frequency";
import { TaskScope } from "../../../model/task-scope";
import { Completion } from "../../../model/completion";
import { TasksService } from "../../tasks/tasks.service";
import { SettingsService } from "../../settings/settings.service";
import { Energy } from "../../../model/energy";
import { getCompletionEntryKey } from "../../../core/get-completion-entry-key";
import { RosterService } from "../../../core/database/services/roster.service";

@Component({
  selector: "lostark-helper-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.less"]
})
export class ChecklistComponent {

  public TaskFrequency = TaskFrequency;
  public TaskScope = TaskScope;

  private completionReloader$ = new BehaviorSubject<void>(void 0);

  public roster$: Observable<Character[]> = this.rosterService.roster$.pipe(
    pluck('characters')
  );

  public completion$: Observable<Completion> = this.completionReloader$.pipe(
    map(() => {
      return JSON.parse(localStorage.getItem("completion") || "{}");
    })
  );

  public energy$: Observable<Energy> = this.completionReloader$.pipe(
    map(() => {
      return {
        energy: JSON.parse(localStorage.getItem("energy") || "{}") as Energy,
        updated: +(localStorage.getItem("energy:updated") || "0")
      };
    }),
    switchMap(({ energy, updated }) => {
      return combineLatest([
        this.lastDailyReset$,
        this.roster$,
        this.tasks$,
        this.completion$
      ]).pipe(
        map(([reset, roster, tasks, completion]) => {
          if (updated < reset) {
            roster.forEach(character => {
              tasks
                .filter(task => ["Una", "Guardian", "Chaos"].some(n => task.label?.startsWith(n)))
                .forEach(task => {
                  const completionEntry = completion[getCompletionEntryKey(character.name, task)];
                  const entry = energy[getCompletionEntryKey(character.name, task)] || {
                    amount: 0
                  };
                  if (completionEntry && (reset - completionEntry.updated) > 86400000) {
                    const daysWithoutDoingIt = Math.floor((reset - completionEntry.updated) / 86400000);
                    entry.amount = Math.min(daysWithoutDoingIt * 20, 100);
                    energy[getCompletionEntryKey(character.name, task)] = entry;
                  }
                });
            });
            localStorage.setItem("energy", JSON.stringify(energy));
            localStorage.setItem("energy:updated", Date.now().toString());
          }
          return energy;
        })
      );
    })
  );

  public tasks$: Observable<LostarkTask[]> = combineLatest([
    this.roster$,
    this.tasksService.tasks$
  ]).pipe(
    map(([roster, tasks]) => {
      return tasks.filter(task => {
        return task.enabled &&
          (!task.maxIlvl || roster.some(c => c.ilvl <= task.maxIlvl && c.ilvl >= task.minIlvl));
      });
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
      let reset = new Date();
      reset.setUTCSeconds(0);
      reset.setUTCMinutes(0);
      reset.setUTCMilliseconds(0);
      // Last Thursday
      if (reset.getUTCDay() === weeklyReset) {
        if (reset.getUTCHours() < 10) {
          reset = subDays(reset, 7);
        }
      } else {
        let diff = weeklyReset - reset.getUTCDay();
        if (diff < 0) {
          diff = Math.abs(diff);
        } else {
          diff = 7 - diff;
        }
        reset = subDays(reset, diff);
      }
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
              doable: character.ilvl >= task.minIlvl && character.ilvl <= task.maxIlvl,
              energy: energy[getCompletionEntryKey(character.name, task)] || 0
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
              private settings: SettingsService) {
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
      const existingEntry = completion[getCompletionEntryKey(characterName, task)];
      if (existingEntry?.updated < reset) {
        existingEntry.amount = 0;
      }
      completion[getCompletionEntryKey(characterName, task)] = {
        ...(existingEntry || {}),
        amount: setAllDone ? task.amount : (existingEntry?.amount || 0) + 1,
        updated: Date.now()
      };
      if (task.scope === TaskScope.CHARACTER
        && task.frequency === TaskFrequency.DAILY
        && ["Chaos", "Guardian", "Una"].some(n => task.label?.startsWith(n))) {
        const energyEntry = energy[getCompletionEntryKey(characterName, task)] || { amount: 0 };
        if (energyEntry.amount >= 20) {
          energyEntry.amount = Math.max(energyEntry.amount - 20, 0);
          energy[getCompletionEntryKey(characterName, task)] = energyEntry;
          localStorage.setItem("energy", JSON.stringify(energy));
        }
      }
    } else if (task.scope === TaskScope.ROSTER && !done) {
      roster.forEach(c => {
        delete completion[getCompletionEntryKey(c.name, task)];
      });
    } else {
      delete completion[getCompletionEntryKey(characterName, task)];
    }
    localStorage.setItem("completion", JSON.stringify(completion));
    this.completionReloader$.next();
  }

  private isTaskDone(task: LostarkTask, character: Character, completion: Completion, dailyReset: number, weeklyReset: number, lazyTracking: Record<string, boolean>): number {
    if (character.lazy) {
      const lazyTrackingFlag = lazyTracking[`${character.name}:${task.label}:${task.scope}:${task.amount}`];
      if (lazyTrackingFlag === undefined || lazyTrackingFlag) {
        dailyReset = subDays(new Date(dailyReset), 2).getTime();
      }
    }
    const currentLADay = subHours(new Date(), 10);
    if (task.daysFilter?.length > 0 && !task.daysFilter?.includes(currentLADay.getUTCDay() - 1)) {
      return -1;
    }
    const completionFlag = completion[getCompletionEntryKey(character.name, task)];
    const reset = task.frequency === TaskFrequency.DAILY ? dailyReset : weeklyReset;
    if (!completionFlag) {
      return 0;
    }
    return completionFlag.updated < reset ? 0 : completionFlag.amount;
  }

  trackByEntry(index: number, entry: { task: LostarkTask, completion: number[] }): string {
    return entry.task.label;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
