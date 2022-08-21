import { Component, HostListener } from "@angular/core";
import { UserService } from "../../../core/database/services/user.service";
import { RosterService } from "../../../core/database/services/roster.service";
import { CompletionService } from "../../../core/database/services/completion.service";
import { TasksService } from "../../../core/database/services/tasks.service";
import { BehaviorSubject, combineLatest, first, map, of, pluck, switchMap } from "rxjs";
import { TimeService } from "../../../core/time.service";
import { isTaskDone } from "../../../core/is-task-done";
import { SettingsService } from "../../../core/database/services/settings.service";
import { TaskFrequency } from "../../../model/task-frequency";
import { TaskScope } from "../../../model/task-scope";
import { LostarkTask } from "../../../model/lostark-task";
import { subtasks } from "../subtasks";
import { LostarkTaskWithSubtask } from "../../../model/lostark-task-with-subtask";
import { tickets } from "../../../data/tickets";
import { LocalStorageBehaviorSubject } from "../../../core/local-storage-behavior-subject";

@Component({
  selector: "lostark-helper-party-planner",
  templateUrl: "./party-planner.component.html",
  styleUrls: ["./party-planner.component.less"]
})
export class PartyPlannerComponent {
  public TaskFrequency = TaskFrequency;
  public TaskScope = TaskScope;

  public roster$ = this.rosterService.roster$;

  public friendIds$ = this.userService.friendIds$;

  public ignoredFriends$ = new LocalStorageBehaviorSubject<string[]>("party-planner:ignored-friends", []);
  public includeTickets$ = new LocalStorageBehaviorSubject<boolean>("party-planner:include-tickets", true);

  public tasks$ = combineLatest([
    this.tasksService.tasks$,
    this.rosterService.roster$
  ]).pipe(
    map(([tasks, roster]) => {
      return tasks
        .map(task => {
          const taskChildren = subtasks
            .filter(st => st.parentName === task.label)
            .sort((a, b) => a.minIlvl - b.minIlvl);
          if (taskChildren.length === 0) {
            return [task];
          }
          return taskChildren.map((child, i) => {
            return {
              ...task,
              subTask: child,
              minIlvl: child.minIlvl,
              maxIlvl: taskChildren[i + 1]?.minIlvl - 1 || 9999
            } as LostarkTaskWithSubtask;
          });
        })
        .flat()
        .filter(task => {
          return task.enabled
            && task.shared
            && !task.custom
            && roster.characters.some(c => c.ilvl >= (task.minIlvl || 0) && c.ilvl < (task.maxIlvl || Infinity));
        });
    })
  );

  private friendIdsToConsider$ = combineLatest([
    this.friendIds$,
    this.ignoredFriends$
  ]).pipe(
    map(([ids, ignored]) => ids.filter(id => !ignored.includes(id)))
  );

  public display$ = combineLatest([
    this.tasks$,
    this.rosterService.roster$,
    this.completionService.completion$,
    this.timeService.lastDailyReset$,
    this.timeService.lastWeeklyReset$,
    this.settings.settings$.pipe(pluck("lazytracking"))
  ]).pipe(
    switchMap(([tasks, roster, completion, dailyReset, weeklyReset, lazyTracking]) => {
      return this.friendIdsToConsider$.pipe(
        switchMap(friendIds => {
          if (friendIds.length === 0) {
            return of([]);
          }
          return combineLatest(friendIds.map(friendId => {
            return combineLatest([
              this.rosterService.getOne(friendId),
              this.completionService.getOne(friendId),
              this.tasksService.getUserTasks(friendId)
            ]).pipe(
              first(),
              map(([friendRoster, friendCompletion, friendTasks]) => {
                return {
                  friendId,
                  friendRoster,
                  friendCompletion,
                  friendTasks
                };
              })
            );
          }));
        }),
        map((friendsData) => {
          const ticketsData = tickets
            .map(ticket => {
              return {
                ticket,
                data: roster.characters
                  .map(character => {
                    const available = character.tickets[ticket.key];
                    if (available === 0) {
                      return {
                        friends: []
                      };
                    }
                    return {
                      friends: friendsData
                        .map(({ friendId, friendRoster }) => {
                          return {
                            friendId,
                            characters: (friendRoster.characters || [])
                              .filter(c => !c.isPrivate)
                              .filter(fc => {
                                return fc.tickets[ticket.key] > 0;
                              })
                              .map(c => {
                                return {
                                  doable: Math.min(c.tickets[ticket.key], available),
                                  c
                                };
                              })
                          };
                        })
                        .filter(res => res.characters.length > 0)
                    };
                  })
              };
            })
            .filter(ticket => ticket.data.filter(row => row.friends.length > 0).length > 0);
          return tasks
            .map(task => {
              return {
                task,
                data: roster.characters
                  .map(character => {
                    const done = isTaskDone(task, character, completion, dailyReset, weeklyReset, lazyTracking);
                    const canDo = character.ilvl >= (task.minIlvl || 0) && character.ilvl < (task.maxIlvl || Infinity);
                    if (done === -1 || done >= task.amount || !canDo) {
                      return {
                        task,
                        friends: [],
                        done: done,
                        canDo: canDo
                      };
                    } else {
                      const friendsDisplay = friendsData
                        .map(({ friendId, friendRoster, friendCompletion, friendTasks }) => {
                          const friendTask = friendTasks.find(ft => {
                            return ft.label === task.label
                              && ft.frequency === task.frequency
                              && ft.scope === task.scope
                              && ft.iconPath === task.iconPath
                              && !ft.custom;
                          });
                          if (friendTask) {
                            return {
                              friendId,
                              characters: (friendRoster.characters || [])
                                .filter(c => !c.isPrivate)
                                .filter(fChar => {
                                  const fDone = isTaskDone(friendTask, fChar, friendCompletion, dailyReset, weeklyReset, {});
                                  return fDone >= 0
                                    && fDone < task.amount
                                    && fChar.ilvl >= (task.minIlvl || 0)
                                    && fChar.ilvl < (task.maxIlvl || Infinity);
                                })
                                .map(c => {
                                  return {
                                    doable: Math.min(
                                      task.amount - isTaskDone(friendTask, c, friendCompletion, dailyReset, weeklyReset, {}),
                                      task.amount - done
                                    ),
                                    c
                                  };
                                })
                            };
                          }
                          return { friendId, characters: [] };
                        })
                        .filter(row => row.characters.length > 0);
                      return {
                        task,
                        friends: friendsDisplay,
                        done: done,
                        canDo: true
                      };
                    }
                  })
                  .flat()
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
            }, { dailyCharacter: [], weeklyCharacter: [], dailyRoster: [], weeklyRoster: [], ticketsData });
        })
      );
    })
  );

  windowResized$ = new BehaviorSubject<void>(void 0);

  public scroll$ = this.windowResized$.pipe(
    switchMap(() => {
      return this.roster$.pipe(
        map(roster => {
          const scroll: { x?: string, y: string } = {
            y: `${window.innerHeight - 64 - 48 - 180}px`
          };
          if (roster.characters.length > 8) {
            scroll.x = `${window.innerWidth - 80 - 48}px`;
          }
          return scroll;
        })
      );
    })
  );

  constructor(private userService: UserService, private rosterService: RosterService,
              private completionService: CompletionService, private tasksService: TasksService,
              private timeService: TimeService, private settings: SettingsService) {
    this.setTableHeight();
  }

  @HostListener("window:resize")
  setTableHeight(): void {
    this.windowResized$.next();
  }

  trackByEntry(index: number, entry: { task: LostarkTask }): string | undefined {
    return entry.task.$key;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
