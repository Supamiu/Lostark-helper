import { Injectable } from "@angular/core";
import { doc, Firestore, where } from "@angular/fire/firestore";
import { FirestoreStorage } from "../firestore-storage";
import { LostarkTask, TASKS_VERSION } from "../../../model/lostark-task";
import { AuthService } from "./auth.service";
import {
  combineLatest,
  debounceTime,
  from,
  map,
  mapTo,
  Observable,
  of,
  pairwise,
  pluck,
  shareReplay,
  switchMap,
  tap
} from "rxjs";
import { tasks } from "../../tasks";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TasksService extends FirestoreStorage<LostarkTask> {

  public baseData$ = this.auth.uid$.pipe(
    switchMap(uid => {
      return this.query(where("authorId", "==", uid)).pipe(
        map(userTasks => {
          const toCreate = tasks
            .filter(defaultTask => {
              return !userTasks.some(t => t.label === defaultTask.label);
            })
            .map(task => {
              task.$key = doc(this.collection).id;
              task.authorId = uid;
              return task;
            });
          const result = [
            ...toCreate,
            ...userTasks
              .map(t => {
                const instance = new LostarkTask();
                if (!t.custom && t.version < TASKS_VERSION) {
                  const defaultTask = tasks.find(dt => dt.label === t.label);
                  if (defaultTask) {
                    Object.assign(instance, {
                      ...defaultTask,
                      $key: t.$key,
                      maxIlvl: t.maxIlvl,
                      minIlvl: t.minIlvl,
                      enabled: t.enabled
                    });
                  } else {
                    Object.assign(instance, {
                      ...t,
                      custom: true
                    });
                  }
                } else {
                  Object.assign(instance, t);
                }
                return instance;
              })
          ]
            .filter(t => t !== null)
            .sort((a, b) => (a?.index || 0) - (b?.index || 0));

          return {
            toCreate,
            result
          };
        })
      );
    }),
    shareReplay(1)
  );

  public tasks$ = this.baseData$.pipe(
    pluck("result"),
    shareReplay(1)
  );

  constructor(firestore: Firestore, private auth: AuthService) {
    super(firestore);
    this.baseData$.pipe(
      pluck("toCreate")
    ).pipe(
      debounceTime(1000),
      filter(toCreate => toCreate.length > 0),
      switchMap(toCreate => {
        const batch = this.batch();
        toCreate.forEach((task, i) => {
          if (task.$key) {
            task.index = i;
            batch.set(this.docRef(task.$key), this.converter.toFirestore(task));
          } else {
            console.error("Tried to create a task with no key? WTF?");
          }
        });
        return from(batch.commit()).pipe(
          tap(() => {
            console.log(`Generated ${toCreate.length} tasks in database.`);
          })
        );
      })
    ).subscribe();

    const cleanupRegistry: string[] = [];

    combineLatest([
      // Only trigger on log in from anonymous
      this.auth.isAnonymous$.pipe(pairwise()),
      this.auth.uid$.pipe(pairwise()),
      this.tasks$.pipe(pairwise())
    ]).pipe(
      filter(([, [previousUid, currentUid]]) => {
        return !cleanupRegistry.includes(`${previousUid}:${currentUid}`);
      }),
      switchMap(([[wasAnonymous, isAnonymous], [previousUid, currentUid], [tasks]]) => {
        cleanupRegistry.push(`${previousUid}:${currentUid}`);
        if (previousUid !== currentUid && !isAnonymous && wasAnonymous) {
          const batch = this.batch();
          tasks.forEach(task => {
            batch.delete(this.docRef(task.$key));
          });
          return from(batch.commit()).pipe(
            mapTo(tasks.length)
          );
        }
        return of(0);
      })
    ).subscribe((tasks) => {
      if (tasks > 0) {
        console.log(`Deleted ${tasks} tasks for cleanup`);
      }
    });
  }

  public addTask(task: LostarkTask): Observable<string> {
    return this.addOne(task);
  }

  public removeTask(task: LostarkTask): void {
    this.deleteOne(task.$key);
  }

  public updateTask(task: LostarkTask): Observable<void> {
    return this.setOne(task.$key, task);
  }

  public setTrackAll(tasks: LostarkTask[], track: boolean): Observable<void> {
    const batch = this.batch();
    tasks.forEach(task => {
      batch.update(this.docRef(task.$key), { enabled: track });
    });
    return from(batch.commit());
  }

  importTasks(tasks: LostarkTask[]): Observable<void> {
    if (!tasks.length) {
      throw new Error("Tried to import tasks as Object");
    }
    return combineLatest(tasks.map(task => this.addOne(task))).pipe(
      mapTo(void 0)
    );
  }

  saveTasks(tasks: LostarkTask[]): Observable<void> {
    const batch = this.batch();
    tasks.forEach(task => {
      batch.set(this.docRef(task.$key), this.converter.toFirestore(task));
    });
    return from(batch.commit());
  }

  protected getCollectionName(): string {
    return "tasks";
  }
}
