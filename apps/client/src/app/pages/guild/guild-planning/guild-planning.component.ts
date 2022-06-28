import { Component } from "@angular/core";
import { subtasks } from "../../party-planner/subtasks";
import { tasks } from "../../../core/tasks";
import { Subtask } from "../../party-planner/subtask";
import { BehaviorSubject, combineLatest, map, Observable, ReplaySubject, shareReplay, switchMap } from "rxjs";
import { createReference, isSameUser, parseCharacterReference } from "../../../core/database/character-reference";
import { ActivatedRoute } from "@angular/router";
import { GuildService } from "../../../core/database/services/guild.service";
import { filter, startWith } from "rxjs/operators";
import { UserService } from "../../../core/database/services/user.service";
import { RosterService } from "../../../core/database/services/roster.service";
import { Character } from "../../../model/character/character";
import { LostarkTask } from "../../../model/lostark-task";
import { LostarkClass } from "../../../model/character/lostark-class";
import { LAHUser } from "../../../model/lah-user";
import { Guild } from "../../../model/guild/guild";
import { applyDuration, days, emptyAvailability, mergeAvailabilities } from "../../../model/availability/availability";
import { AvailabilityStatus } from "../../../model/availability/availability-status";

@Component({
  selector: "lostark-helper-guild-planning",
  templateUrl: "./guild-planning.component.html",
  styleUrls: ["./guild-planning.component.less"]
})
export class GuildPlanningComponent {

  LostArkClass = LostarkClass;
  AvailabilityStatus = AvailabilityStatus;
  days = days;

  public availableTasks = subtasks.map(subTask => {
    const parentTask = tasks.find(t => t.label === subTask.parentName);
    return {
      ...subTask,
      parent: parentTask
    };
  });

  public minIlvl$ = new BehaviorSubject(0);

  public maxIlvl$ = new BehaviorSubject(9999);

  public duration$ = new BehaviorSubject(1);

  public includeAlts$ = new BehaviorSubject(false);

  public selectedTask$ = new ReplaySubject<Subtask>();

  public team$ = new BehaviorSubject<Character[]>([]);

  public avgIlvl$ = this.team$.pipe(
    filter(team => team.length > 0),
    map(team => {
      return team.reduce((acc, char) => acc + (char?.ilvl || 0), 0) / team.length;
    })
  );

  public guild$ = this.route.paramMap.pipe(
    map(params => params.get("guildId")),
    filter(Boolean),
    switchMap((guildId) => this.guildService.getOne(guildId)),
    switchMap(guild => {
      return this.userService.user$.pipe(
        map(user => ([guild, user] as [Guild, LAHUser]))
      );
    }),
    filter(([guild, user]: [Guild, LAHUser]) => guild.members.some(m => isSameUser(m, user.$key))),
    map(([guild]) => guild),
    shareReplay(1)
  );

  public members$: Observable<Character[]> = combineLatest([this.guild$, this.includeAlts$]).pipe(
    switchMap(([guild, includeAlts]) => {
      return combineLatest(guild.members.map(ref => {
        const parsedRef = parseCharacterReference(ref);
        return this.rosterService.getOne(parsedRef.userId).pipe(
          map(roster => {
            if (includeAlts) {
              return roster.characters
                .filter(c => !c.isPrivate)
                .map(c => ({ ...c, ref: createReference(parsedRef.userId, c.id || 0) })) as Character[];
            }
            return {
              ...roster.characters.find(c => c.id === parsedRef.characterId),
              ref
            };
          })
        );
      }));
    }),
    map((characters) => {
      return (characters as Character[][])
        .flat()
        .filter((c, i, array) => {
          return c !== undefined && array.findIndex(ac => ac.id === c.id) === i;
        }) as Character[];
    })
  );

  public availableMembers$: Observable<{ support: Character[], dps: Character[] }> = combineLatest([
    this.members$,
    this.minIlvl$,
    this.maxIlvl$,
    this.team$,
    this.duration$
  ]).pipe(
    map(([members, minIlvl, maxIlvl, team]) => {
      return members.filter(m => {
        return !team.some(tm => tm && isSameUser(tm.ref || "a:0", parseCharacterReference(m.ref).userId)) && m.ilvl >= minIlvl && m.ilvl <= maxIlvl;
      });
    }),
    map(characters => {
      return characters.reduce((acc, char) => {
        if ([LostarkClass.BARD, LostarkClass.PALADIN].includes(+char.class)) {
          acc.support.push(char);
        } else {
          acc.dps.push(char);
        }
        return acc;
      }, { support: [] as Character[], dps: [] as Character[] });
    })
  );

  availabilities$ = combineLatest([this.team$, this.duration$]).pipe(
    filter(([team]) => team.some(m => m !== undefined)),
    switchMap(([team, duration]) => {
      return combineLatest(team.filter(m => !!m).map(m => {
        return this.userService.getOne(parseCharacterReference(m.ref).userId).pipe(
          map(user => {
            return {
              character: m,
              user
            };
          })
        );
      })).pipe(
        map((members) => {
          const firstMember = members.find(m => m !== undefined);
          return members.slice(1).reduce((acc, m) => {
            return mergeAvailabilities(acc, m.user.availability || emptyAvailability());
          }, firstMember?.user.availability || emptyAvailability());
        }),
        map(partyAvailability => {
          return {
            availability: applyDuration(partyAvailability, duration),
            missingData: false
          };
        })
      );
    }),
    startWith({ availability: [], missingData: true })
  );


  constructor(private route: ActivatedRoute, private guildService: GuildService,
              private userService: UserService, private rosterService: RosterService) {
  }

  public setTeamMember(index: number, member: Character): void {
    const newArray = [...this.team$.value];
    newArray[index] = member;
    this.team$.next(newArray);
  }

  selectTask(task: Subtask & { parent: LostarkTask }): void {
    this.selectedTask$.next(task);
    this.minIlvl$.next(task.minIlvl || 0);
    this.maxIlvl$.next(task.parent.maxIlvl || 9999);
    if (this.team$.value.filter(m => !!m).length === 0) {
      this.team$.next(new Array(task.parent.partySize));
    } else if (this.team$.value.length < task.parent.partySize) {
      this.team$.next([
        ...this.team$.value,
        ...new Array(task.parent.partySize - this.team$.value.length)
      ]);
    } else if (this.team$.value.length > task.parent.partySize) {
      this.team$.next(this.team$.value.slice(0, task.parent.partySize));
    }
  }

  trackByRef(index: number): number {
    return index;
  }
}
