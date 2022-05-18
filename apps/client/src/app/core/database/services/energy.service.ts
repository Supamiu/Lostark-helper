import { Injectable } from "@angular/core";
import { FirestoreStorage } from "../firestore-storage";
import { Firestore } from "@angular/fire/firestore";
import { combineLatest, map, mapTo, Observable, of, shareReplay, switchMap } from "rxjs";
import { AuthService } from "./auth.service";
import { Energy } from "../../../model/energy";
import { getCompletionEntry, setCompletionEntry } from "../../get-completion-entry-key";
import { RosterService } from "./roster.service";
import { TimeService } from "../../time.service";
import { CompletionService } from "./completion.service";
import { TasksService } from "./tasks.service";
import { CompletionEntry } from "../../../model/completion-entry";
import { LostarkTask } from "../../../model/lostark-task";

@Injectable({
  providedIn: "root"
})
export class EnergyService extends FirestoreStorage<Energy> {
  private energyObj$: Observable<Energy> = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.getOne(uid).pipe(
        map(energy => {
          if (energy.notFound) {
            return {
              ...energy,
              data: {},
              updated: 0
            };
          }
          return energy;
        })
      );
    }),
    shareReplay(1)
  );

  public energy$: Observable<Energy> = this.energyObj$.pipe(
    switchMap((energy) => {
      return combineLatest([
        this.timeService.lastDailyReset$,
        this.rosterService.roster$,
        this.tasksService.tasks$,
        this.completionService.completion$
      ]).pipe(
        switchMap(([reset, roster, tasks, completion]) => {
          const newEnergy = Object.keys(energy.data).length === 0;
          if (energy.updated < reset) {
            roster.characters.forEach(character => {
              tasks
                .filter(task => ["Una", "Guardian", "Chaos"].some(n => task.label?.startsWith(n)) && !task.custom)
                .forEach(task => {
                  const completionEntry = getCompletionEntry(completion.data, character, task);
                  const entry = getCompletionEntry(energy.data, character, task) || {
                    amount: 0
                  };
                  if (completionEntry) {
                    setCompletionEntry(energy.data, character, task, this.getEnergyUpdate(reset, completionEntry, energy, task, entry));
                  } else if (!completionEntry && !newEnergy) {
                    setCompletionEntry(energy.data, character, task, { amount: 0 });
                    setCompletionEntry(completion.data, character, task, {
                      amount: 0,
                      updated: Date.now()
                    });
                  }
                });
            });
            energy.updated = Date.now();
            return combineLatest([
              this.setOne(energy.$key, energy),
              this.completionService.setOne(completion.$key, completion)
            ]).pipe(
              mapTo(energy)
            );
          }
          return of(energy);
        })
      );
    }),
    shareReplay(1)
  );

  constructor(firestore: Firestore, private auth: AuthService,
              private rosterService: RosterService, private timeService: TimeService,
              private tasksService: TasksService, private completionService: CompletionService) {
    super(firestore);
  }

  public getEnergyUpdate(reset: number, completionEntry: CompletionEntry, energy: Energy, task: LostarkTask, entry: { amount: number }): { amount: number } {
    const daysWithoutDoingTheTask = Math.ceil((reset - completionEntry.updated) / 86400000);
    const daysWithoutEnergyUpdate = Math.ceil((reset - energy.updated) / 86400000);
    const firstTaskUpdateSinceLastDone = daysWithoutDoingTheTask === daysWithoutEnergyUpdate;
    const baseBonus = firstTaskUpdateSinceLastDone ? (task.amount - completionEntry.amount) * 10 : 0;
    const timeBonus = (daysWithoutEnergyUpdate - (firstTaskUpdateSinceLastDone ? 1 : 0)) * task.amount * 10;
    entry.amount = Math.min(entry.amount + timeBonus + baseBonus, 100);
    return entry;
  }

  public save(energy: Energy): void {
    this.setOne(energy.$key, energy);
  }

  protected getCollectionName(): string {
    return "energy";
  }
}
