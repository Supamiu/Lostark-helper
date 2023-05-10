import { Component, HostListener } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, pluck, startWith } from "rxjs";
import { LostarkTask } from "../../../model/lostark-task";
import { TaskFrequency } from "../../../model/task-frequency";
import { TaskScope } from "../../../model/task-scope";
import { Completion } from "../../../model/completion";
import { Energy } from "../../../model/energy";
import { getCompletionEntry, getCompletionEntryKey, setCompletionEntry } from "../../../core/get-completion-entry-key";
import { RosterService } from "../../../core/database/services/roster.service";
import { SettingsService } from "../../../core/database/services/settings.service";
import { EnergyService } from "../../../core/database/services/energy.service";
import { TimeService } from "../../../core/time.service";
import { CompletionService } from "../../../core/database/services/completion.service";
import { TasksService } from "../../../core/database/services/tasks.service";
import { isTaskAvailable, isTaskDone } from "../../../core/is-task-done";
import { Roster } from "../../../model/roster";
import { LocalStorageBehaviorSubject } from "../../../core/local-storage-behavior-subject";
import { Character } from "../../../model/character/character";
import { tickets } from "../../../data/tickets";
import { LostarkClass } from "../../../model/character/lostark-class";

export interface TaskCharacter extends Character{
  done?: boolean;
  className?: string;
}

@Component({
  selector: "lostark-helper-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.less"]
})
export class ChecklistComponent {
  public TaskFrequency = TaskFrequency;

  public TaskScope = TaskScope;

  public forceShowHiddenCharacter$ = false;

  public rawRoster$ = this.rosterService.roster$;

  public categoriesDisplay$ = new LocalStorageBehaviorSubject<{
    dailyCharacter: boolean,
    weeklyCharacter: boolean,
    dailyRoster: boolean,
    weeklyRoster: boolean
  }>("checklist:displayed", { dailyCharacter: true, weeklyCharacter: true, dailyRoster: true, weeklyRoster: true });

  public roster$: Observable<TaskCharacter[]> = this.rawRoster$.pipe(
    pluck("characters"),
    map(roster => {
      return roster.map( ( char: Character ): TaskCharacter => ({
        ...char,
        className: LostarkClass[char?.class].toLowerCase(),
      })).filter(char => {
        if ( this.forceShowHiddenCharacter$ ) {
          return true;
        } else {
          return ! char.isHide && true;
        }
      })
    })
  );

  public tiersAvailability$ = this.roster$.pipe(
    map(characters => {
      return {
        t1: characters.some(c => c.ilvl < 802),
        t2: characters.some(c => c.ilvl >= 802 && c.ilvl < 1302),
        t3: characters.some(c => c.ilvl >= 1302)
      };
    })
  );

  public tickets$ = this.tiersAvailability$.pipe(
    map(tiersAvailability => tickets.filter(t => !t.tier || tiersAvailability[`t${t.tier}`]))
  );

  public ticketsTrackingOpened = localStorage.getItem("checklist:tickets-opened") === "true";

  public completion$: Observable<Completion> = this.completionService.completion$;

  public energy$ = this.energyService.energy$;

  public lastDailyReset$ = this.timeService.lastDailyReset$;

  public lastWeeklyReset$ = this.timeService.lastWeeklyReset$;

  public nextDailyReset$ = this.lastDailyReset$.pipe(
    map(reset => reset + 86400000)
  );

  public nextWeeklyReset$ = this.lastWeeklyReset$.pipe(
    map(reset => reset + 86400000 * 7)
  );

  public tasks$: Observable<LostarkTask[]> = combineLatest([
    this.rawRoster$,
    this.tasksService.tasks$
  ]).pipe(
    map(([roster, tasks]) => {
      return tasks.filter(task => {
        return task.enabled &&
          (!task.maxIlvl || roster.characters.some(c => c.ilvl < (task.maxIlvl || Infinity) && c.ilvl >= (task.minIlvl || 0) && getCompletionEntry(roster.trackedTasks, c, task, true) !== false));
      });
    })
  );

  public tableDisplay$ = combineLatest([
    this.rawRoster$,
    this.tasks$,
    this.completion$,
    this.lastDailyReset$,
    this.lastWeeklyReset$,
    this.settings.settings$.pipe(
      map( settings => ({
        lazytracking: settings.lazytracking,
        hiddenOnCompletion: settings.hiddenOnCompletion
      }))
    ),
    this.energy$
  ]).pipe(
    map(([roster, tasks, completion, dailyReset, weeklyReset, settings, energy]) => {
      const data = tasks
        .map(task => {
          const lazyTracking = settings.lazytracking;
          const available = isTaskAvailable(task)
          const editDisabled = task.canEditDaysFilter === false;
          const visible = available || editDisabled; // We always display tasks that can't be edited with "Not available today" flag
          const forceDone = ( !available && visible ); // If task is not available but is visible, we marked it as done

          const completionData = roster.characters.map(character => {
            return {
              done: Math.min(isTaskDone(
                task,
                character,
                completion,
                dailyReset,
                weeklyReset,
                lazyTracking
              ), task.amount),
              tracked: getCompletionEntry(roster.trackedTasks, character, task, true) !== false,
              doable: character.ilvl >= (task.minIlvl || 0) && character.ilvl < (task.maxIlvl || Infinity),
              energy: getCompletionEntry(energy.data, character, task) || 0
            };
          });

          const allDone = forceDone || completionData.every(
            ({ doable, done, tracked }) => !tracked || !doable || done >= task.amount
          );

          return {
            task,
            hasEnergy: ["Una", "Guardian", "Chaos"].some(n => task.label?.startsWith(n)),
            completion: completionData.map(row => row.done),
            energy: completionData.map(row => row.energy),
            completionData,
            allDone,
            visible,
            available,
          };
        })
        .filter(({ visible, allDone }) => {
          if ( allDone && settings.hiddenOnCompletion ) return false; // If task is done and we hide done tasks, we don't display it
          return visible || roster.showAllTasks
        })
        .reduce((acc, row) => {
          const frequencyKey = row.task.frequency === TaskFrequency.DAILY ? "daily" : "weekly";
          const scopeKey = row.task.scope === TaskScope.CHARACTER ? "Character" : "Roster";
          const data = [
            ...acc[`${frequencyKey}${scopeKey}`].data,
            row
          ];
          return {
            ...acc,
            [`${frequencyKey}${scopeKey}`]: {
              data,
              done: data.every(t => t.allDone)
            }
          };
        }, { dailyCharacter: { data: [], done: false }, weeklyCharacter: { data: [], done: false }, dailyRoster: { data: [], done: false }, weeklyRoster: { data: [], done: false } });

      return {
        roster: roster.characters.map((c, i) => {
          const done = [...data.dailyCharacter.data, ...data.weeklyCharacter.data].every(
            (row: { completionData: { doable: boolean, done: number, tracked: boolean }[], task: LostarkTask }) => {
              const completion = row.completionData[i];
              return !completion.tracked || !completion.doable || !row.task.enabled || completion.done >= row.task.amount;
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

  private windowResize$ = new BehaviorSubject<void>(void 0);

  public scrolling$ = combineLatest([this.roster$, this.windowResize$]).pipe(
    map(([roster]) => {
      const y = window.innerHeight - 64 - 48 - 210 - 20;
      const scrolling: { x?: string | null, y: string | null } = { y: `${y}px` };
      const widthPerCharacter = window.innerWidth < 992 ? 80 : 120;
      if (window.innerWidth < widthPerCharacter * roster.length + 200) {
        scrolling.x = `${window.innerWidth - 64 - 48 - 210 - 20}px`;
      }
      return scrolling;
    }),
    startWith({ x: null, y: null })
  );

  constructor(private rosterService: RosterService, private tasksService: TasksService,
              private settings: SettingsService, private energyService: EnergyService,
              private timeService: TimeService, private completionService: CompletionService) {
    this.setTableHeight();
  }

  @HostListener("window:resize")
  setTableHeight(): void {
    this.windowResize$.next();
  }

  public ticketsTrackingOpenedChange(opened: boolean): void {
    localStorage.setItem("checklist:tickets-opened", opened.toString());
    this.ticketsTrackingOpened = opened;
  }

  public markAsDone(completion: Completion, energy: Energy, character: Character, task: LostarkTask, roster: Character[], done: boolean, dailyReset: number, weeklyReset: number, clickEvent?: MouseEvent): void {
    let reset = Infinity;
    switch (task.frequency) {
      case TaskFrequency.DAILY:
        reset = dailyReset;
        break;
      case TaskFrequency.WEEKLY:
        reset = weeklyReset;
        break;
    }
    if (done) {
      const setAllDone = clickEvent?.ctrlKey;
      const existingEntry = getCompletionEntry(completion.data, character, task);
      if (existingEntry?.updated < reset) {
        existingEntry.amount = 0;
      }
      setCompletionEntry(completion.data, character, task, {
        ...(existingEntry || {}),
        amount: setAllDone ? task.amount : (existingEntry?.amount || 0) + 1,
        updated: Date.now()
      });
      if (task.scope === TaskScope.CHARACTER
        && task.frequency === TaskFrequency.DAILY
        && ["Chaos", "Guardian", "Una"].some(n => task.label?.startsWith(n))) {
        const energyEntry = getCompletionEntry(energy.data, character, task) || { amount: 0 };
        if (energyEntry.amount >= 20) {
          energyEntry.amount = Math.max(energyEntry.amount - (20 * (setAllDone ? task.amount : 1)), 0);
          this.energyService.updateOne(energy.$key, {
            [`data.${getCompletionEntryKey(character, task)}`]: energyEntry
          });
        }
      }
    } else {
      completion.data[getCompletionEntryKey(character, task)] = {
        amount: 0,
        updated: Date.now()
      };
    }
    this.completionService.setOne(completion.$key, completion);
  }

  trackByEntry(index: number, entry: { task: LostarkTask, completion: number[] }): string | undefined {
    return entry.task.$key;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByCharacter(index: number, character: Character): string {
    return character.name;
  }

  saveRoster(roster: Roster): void {
    this.rosterService.setOne(roster.$key, roster);
  }
}
