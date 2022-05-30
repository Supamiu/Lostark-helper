import { Component } from "@angular/core";
import { subtasks } from "../../party-planner/subtasks";
import { tasks } from "../../../core/tasks";
import { Subtask } from "../../party-planner/subtask";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "lostark-helper-guild-planning",
  templateUrl: "./guild-planning.component.html",
  styleUrls: ["./guild-planning.component.less"]
})
export class GuildPlanningComponent {

  public availableTasks = subtasks.map(subTask => {
    const parentTask = tasks.find(t => t.label === subTask.parentName);
    return {
      ...subTask,
      parent: parentTask
    };
  });

  public selectedTask$ = new ReplaySubject<Subtask>();

  constructor() {
  }
}
