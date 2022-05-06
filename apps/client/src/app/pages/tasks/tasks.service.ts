import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { LostarkTask } from "../../model/lostark-task";
import { tasks } from "../../core/tasks";
import { SettingsService } from "../../core/database/services/settings.service";

@Injectable({
  providedIn: "root"
})
export class TasksService {

  private static readonly VERSION = 9;

  private reloader$ = new BehaviorSubject<void>(void 0);

  public tasks$: Observable<LostarkTask[]> = this.reloader$.pipe(
    map(() => {
      return [
        ...JSON.parse(localStorage.getItem("tasks:custom") || "[]"),
        ...JSON.parse(localStorage.getItem("tasks:default") || "[]")
      ];
    }),
    switchMap((tasks) => {
      return this.settings.settings$.pipe(
        map(settings => {
          return tasks.map(task => {
            const prepared = new LostarkTask(
              task.label,
              task.minIlvl,
              task.frequency,
              task.scope,
              task.amount,
              task.maxIlvl,
              task.iconPath
            );
            Object.assign(
              prepared,
              task
            );

            if (prepared.label?.startsWith("Affinity") && !settings.crystallineAura) {
              prepared.amount -= 1;
            }
            return prepared;
          })
            .sort((a, b) => a.index - b.index);
        })
      );
    })
  );

  constructor(private settings: SettingsService) {
    const version = +(localStorage.getItem("tasks:version") || "0");
    const currentTasks: LostarkTask[] = JSON.parse(localStorage.getItem("tasks:default") || "[]");
    const corrupted = currentTasks.some((task, i) => {
      return currentTasks.findIndex(t => t.id === task.id) !== i;
    });
    if (version < TasksService.VERSION || corrupted) {
      localStorage.setItem("tasks:default", JSON.stringify(tasks.map(task => {
        const existingConfig = currentTasks.find(t => t.label === task.label);
        if (existingConfig) {
          return {
            ...task,
            maxIlvl: existingConfig.maxIlvl,
            minIlvl: existingConfig.minIlvl,
            enabled: existingConfig.enabled
          };
        }
        return task;
      })));
      localStorage.setItem("tasks:version", TasksService.VERSION.toString());
      this.reloader$.next();
    }
  }

  public addTask(task: LostarkTask): void {
    const tasks: LostarkTask[] = JSON.parse(localStorage.getItem("tasks:custom") || "[]");
    tasks.unshift(task);
    localStorage.setItem("tasks:custom", JSON.stringify(tasks));
    this.reloader$.next();
  }

  public removeTask(task: LostarkTask): void {
    const tasks: LostarkTask[] = JSON.parse(localStorage.getItem("tasks:custom") || "[]");
    localStorage.setItem("tasks:custom", JSON.stringify(tasks.filter(t => {
      return t.label !== task.label || t.minIlvl !== task.minIlvl;
    })));
    this.reloader$.next();
  }

  public updateTask(task: LostarkTask): void {
    const lsKey = task.custom ? "tasks:custom" : "tasks:default";
    const tasks: LostarkTask[] = JSON.parse(localStorage.getItem(lsKey) || "[]");
    localStorage.setItem(lsKey, JSON.stringify(tasks.map(t => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    })));
    this.reloader$.next();
  }

  public setTrackAll(track: boolean): void {
    ["tasks:custom", "tasks:default"].forEach(lsKey => {
      const tasks: LostarkTask[] = JSON.parse(localStorage.getItem(lsKey) || "[]");
      localStorage.setItem(lsKey, JSON.stringify(tasks.map(t => {
        return {
          ...t,
          enabled: track
        };
      })));
    });
    this.reloader$.next();
  }

  public exportTasks(): string {
    return localStorage.getItem("tasks:custom") || "[]";
  }

  importTasks(tasks: LostarkTask[]): void {
    if (!tasks.length) {
      throw new Error("Tried to import tasks as Object");
    }
    console.log(tasks);
    localStorage.setItem("tasks:custom", JSON.stringify(tasks));
    this.reloader$.next();
  }

  saveTasks(tasks: LostarkTask[]): void {
    const grouped = tasks.reduce((acc, task) => {
      if (task.custom) {
        return {
          ...acc,
          custom: [
            ...acc.custom,
            task
          ]
        };
      } else {
        return {
          ...acc,
          default: [
            ...acc.default,
            task
          ]
        };
      }
    }, { custom: [] as LostarkTask[], default: [] as LostarkTask[] });
    localStorage.setItem("tasks:custom", JSON.stringify(grouped.custom));
    localStorage.setItem("tasks:default", JSON.stringify(grouped.default));
    this.reloader$.next();
  }
}
