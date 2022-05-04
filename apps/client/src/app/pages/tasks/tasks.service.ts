import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { LostarkTask } from "../../model/lostark-task";
import { tasks } from "../../core/tasks";

@Injectable({
  providedIn: "root"
})
export class TasksService {

  private static readonly VERSION = 3;

  private reloader$ = new BehaviorSubject<void>(void 0);

  public tasks$: Observable<LostarkTask[]> = this.reloader$.pipe(
    map(() => {
      return [
        ...JSON.parse(localStorage.getItem("tasks:custom") || "[]"),
        ...JSON.parse(localStorage.getItem("tasks:default") || "[]")
      ];
    })
  );

  constructor() {
    const version = +(localStorage.getItem("tasks:version") || "0");
    if (version < TasksService.VERSION) {
      const currentTasks: LostarkTask[] = JSON.parse(localStorage.getItem("tasks:default") || "[]");
      localStorage.setItem("tasks:default", JSON.stringify(tasks.map(task => {
        const existingConfig = currentTasks.find(t => t.label === task.label);
        if (existingConfig) {
          return {
            ...task,
            enabled: existingConfig.enabled
          };
        }
        return task;
      })));
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
      if (task.custom) {
        if (t.createdAt === task.createdAt) {
          return task;
        }
      } else {
        if (t.label === task.label) {
          return task;
        }
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
}
