import {Component} from '@angular/core';
import {TasksService} from "../tasks.service";
import {LostarkTask} from "../../../model/lostark-task";
import {TaskFrequency} from "../../../model/task-frequency";
import {TaskScope} from "../../../model/task-scope";
import {FormBuilder, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'lostark-helper-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less'],
})
export class TasksComponent {
  public TaskFrequency = TaskFrequency;
  public TaskScope = TaskScope;

  public tasks$ = this.tasksService.tasks$;

  public form = this.fb.group({
    label: ['', Validators.required],
    frequency: [TaskFrequency.DAILY],
    scope: [TaskScope.CHARACTER],
    amount: [null, Validators.required],
    minIlvl: [null, [Validators.required, Validators.min(0), Validators.max(9999)]],
    maxIlvl: [null, [Validators.required, Validators.min(0), Validators.max(9999)]],
  });

  constructor(private tasksService: TasksService,
              private fb: FormBuilder,
              private message: NzMessageService) {
  }

  addTask(): void {
    const formData = this.form.getRawValue();
    const task = new LostarkTask(
      formData.label,
      formData.minIlvl,
      formData.frequency,
      formData.scope,
      formData.amount,
      formData.maxIlvl,
      formData.iconPath,
      true,
      true
    )
    this.tasksService.addTask(task);
    this.form.reset({
      frequency: TaskFrequency.DAILY,
      scope: TaskScope.CHARACTER
    });
    this.message.success('Custom task added to the list');
  }

  updateTask(task: LostarkTask):void{
    this.tasksService.updateTask(task);
  }

  removeTask(task: LostarkTask): void {
    this.tasksService.removeTask(task);
  }

  saveTask(task: LostarkTask): void {
    this.tasksService.removeTask(task);
  }

  trackByTask(index: number, task: LostarkTask): string {
    return task.label;
  }
}
