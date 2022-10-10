import { Component, HostListener } from "@angular/core";
import { createTask, LostarkTask } from "../../../model/lostark-task";
import { TaskFrequency } from "../../../model/task-frequency";
import { TaskScope } from "../../../model/task-scope";
import { FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { Clipboard } from "@angular/cdk/clipboard";
import { NzModalService } from "ng-zorro-antd/modal";
import { TextQuestionPopupComponent } from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { filter } from "rxjs/operators";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { TasksService } from "../../../core/database/services/tasks.service";
import { AuthService } from "../../../core/database/services/auth.service";
import { distinctUntilChanged, map, merge, Subject } from "rxjs";

@Component({
  selector: "lostark-helper-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.less"]
})
export class TasksComponent {
  public TaskFrequency = TaskFrequency;
  public TaskScope = TaskScope;

  private optimisticTasks$ = new Subject<LostarkTask[]>();

  public tasks$ = merge(
    this.optimisticTasks$,
    this.tasksService.tasks$
  ).pipe(
    map(tasks => tasks.sort((a, b) => a.index - b.index)),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );

  public form = this.fb.group({
    label: ["", Validators.required],
    frequency: [TaskFrequency.DAILY],
    scope: [TaskScope.CHARACTER],
    amount: [null, Validators.required],
    minIlvl: [null, [Validators.required, Validators.min(0), Validators.max(9999)]],
    maxIlvl: [null, [Validators.required, Validators.min(0), Validators.max(9999)]],
    iconPath: [null]
  });

  public uid$ = this.authService.uid$;

  public icons = [
    "abyssal-dungeon.webp",
    "abyssal-raid.webp",
    "legion_raid.png",
    "chaos-dungeon.webp",
    "chaos_gate.png",
    "daily.webp",
    "ghostship.png",
    "guardian.png",
    "island.webp",
    "pirate_coin.png",
    "rapport.webp",
    "sylmael.png",
    "gold.png",
    "weekly.webp",
    "anguished.png",
    "rift_piece.png",
    "t1_cube.png",
    "t2_bossrush.png",
    "t2_cube.png",
    "t3_bossrush.png",
    "t3_cube.png",
    "adventure_quest.webp",
    "amethyst_shard.webp",
    "chain_quest.webp",
    "co-op_quest.webp",
    "crystal.webp",
    "dungeon.webp",
    "dungeon_quest.webp",
    "event_quest.webp",
    "main_quest.webp",
    "normal_quest.webp",
    "normal_quest_end.webp",
    "normal_quest_start.webp",
    "stronghold_quest.webp",
    "sudden_quest.webp",
    "trade_skill_tool.webp",
    "world_quest.webp",
    "world_tree_leaves.webp",
    "guild.webp",
    "cardpack.png"
  ];

  public tableHeight!: number;

  constructor(private tasksService: TasksService,
              private fb: FormBuilder,
              private message: NzMessageService,
              private clipboard: Clipboard,
              private modal: NzModalService,
              private authService: AuthService) {
    this.setTableHeight();
  }

  @HostListener("window:resize")
  setTableHeight(): void {
    const computed = window.innerHeight
      - 64 - 48 - 64 - 56 // Page Layout
      - 72 // nz-page-title
      - 245; //Form w/card
    this.tableHeight = Math.max(computed, 300);
  }

  addTask(uid: string): void {
    const formData = this.form.getRawValue();
    const task = createTask(
      formData.label,
      formData.minIlvl,
      formData.frequency,
      formData.scope,
      formData.amount,
      formData.maxIlvl,
      formData.iconPath,
      { custom: true }
    );
    task.authorId = uid;
    this.tasksService.addTask(task).subscribe(() => {
      this.form.reset({
        frequency: TaskFrequency.DAILY,
        scope: TaskScope.CHARACTER
      });
      this.message.success("Custom task added to the list");
    });
  }

  dropTask(tasks: LostarkTask[], event: CdkDragDrop<LostarkTask[]>): void {
    const tasksClone = [...tasks];
    moveItemInArray(tasksClone, event.previousIndex, event.currentIndex);
    const newTasks = tasksClone.map((task, i) => {
      task.index = i;
      return task;
    });
    this.optimisticTasks$.next(newTasks);
    this.tasksService.updateIndexes(newTasks);
  }

  setTrackAll(tasks: LostarkTask[], track: boolean): void {
    this.tasksService.setTrackAll(tasks, track);
  }

  updateTask(task: LostarkTask): void {
    this.tasksService.updateTask(task);
  };

  removeTask(task: LostarkTask): void {
    this.tasksService.removeTask(task);
  }

  saveTask(task: LostarkTask): void {
    this.tasksService.removeTask(task);
  }

  exportTasks(tasks: LostarkTask[]): void {
    this.clipboard.copy(JSON.stringify(tasks.filter(t => t.custom)));
    this.message.success("Custom tasks copied to your clipboard");
  }

  importTasks(uid: string): void {
    this.modal.create({
      nzTitle: "Import tasks",
      nzContent: TextQuestionPopupComponent,
      nzComponentParams: {
        placeholder: "Paste your exported tasks here"
      },
      nzFooter: null
    }).afterClose
      .pipe(
        filter(Boolean)
      )
      .subscribe((tasksJson) => {
        try {
          const parsed=  JSON.parse(tasksJson || "[]");
          const tasks = parsed.map((task: LostarkTask) => ({ ...task, authorId: uid, custom: true }));
          this.tasksService.importTasks(tasks);
          this.message.success("Custom tasks imported");
        } catch (e: unknown) {
          this.message.error((e as Error).message);
        }
      });
  }

  trackByTask(index: number, task: LostarkTask): string | undefined {
    return task.$key;
  }
}
