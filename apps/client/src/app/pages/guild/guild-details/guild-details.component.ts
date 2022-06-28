import { Component } from "@angular/core";
import { GuildService } from "../../../core/database/services/guild.service";
import { ActivatedRoute } from "@angular/router";
import { RosterService } from "../../../core/database/services/roster.service";
import { combineLatest, map, switchMap } from "rxjs";
import { filter } from "rxjs/operators";
import { UserService } from "../../../core/database/services/user.service";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { Guild } from "../../../model/guild/guild";
import { arrayRemove, arrayUnion, UpdateData } from "@angular/fire/firestore";
import { CharacterReference, createReference, isSameCharacter, isSameUser, parseCharacterReference } from "../../../core/database/character-reference";
import { NzMessageService } from "ng-zorro-antd/message";
import { GuildVisibility } from "../../../model/guild/guild-visibility";

@Component({
  selector: "lostark-helper-guild-details",
  templateUrl: "./guild-details.component.html",
  styleUrls: ["./guild-details.component.less"]
})
export class GuildDetailsComponent {

  GuildVisibility = GuildVisibility;

  public guild$ = this.route.paramMap.pipe(
    map(params => params.get("guildId")),
    filter(Boolean),
    switchMap(id => {
      return this.guildService.getOne(id);
    })
  );

  public user$ = this.userService.user$;

  public roster$ = this.rosterService.roster$;

  public isMember$ = combineLatest([this.guild$, this.user$]).pipe(
    map(([guild, user]) => {
      return guild.users.includes(user.$key);
    })
  );

  public isLeader$ = combineLatest([this.guild$, this.user$]).pipe(
    map(([guild, user]) => {
      return isSameUser(guild.leader, user.$key);
    })
  );

  public isOfficier$ = combineLatest([this.guild$, this.user$]).pipe(
    map(([guild, user]) => {
      return guild.officiers.some(o => isSameUser(o, user.$key));
    })
  );

  public isOfficierOrLeader$ = combineLatest([this.isLeader$, this.isOfficier$]).pipe(
    map(([officier, leader]) => officier || leader)
  );

  public showMembers$ = combineLatest([this.guild$, this.isMember$]).pipe(
    map(([guild, isMember]) => {
      return guild.visibility < GuildVisibility.PRIVATE || isMember;
    })
  );

  public characters$ = combineLatest([
    this.guild$,
    this.roster$,
    this.user$
  ]).pipe(
    map(([guild, roster, user]) => {
      return roster.characters.filter(c => {
        return !guild.members.some(m => isSameCharacter(m, user.$key, c.id || 0));
      });
    })
  );

  public candidateForm = this.fb.group({
    character: [null, Validators.required],
    message: [""]
  });

  constructor(private guildService: GuildService, private route: ActivatedRoute,
              private userService: UserService, private rosterService: RosterService,
              private fb: UntypedFormBuilder, private message: NzMessageService) {
  }

  pushCandidate(uid: string, guild: Guild): void {
    const { character, message } = this.candidateForm.getRawValue();
    this.candidateForm.reset();
    const ref = createReference(uid, +character);
    if (guild.candidates.some(c => c.ref === ref)) {
      this.message.error("There is already a candidature for this character in this guild");
      return;
    }
    if (guild.members.some(c => c === ref)) {
      this.message.error("This character is already a member of this guild");
      return;
    }
    this.guildService.updateOne(guild.$key, {
      candidates: arrayUnion({
        ref,
        message
      })
    }).subscribe(() => {
      this.message.success(`Applied your character to the guild.`);
    });
  }

  promoteOfficier(member: CharacterReference, guild: Guild): void {
    this.guildService.updateOne(guild.$key, {
      officiers: arrayUnion(member)
    }).subscribe(() => {
      this.message.success(`Successfully promoted member to officier.`);
    });
  }

  demoteOfficier(member: CharacterReference, guild: Guild): void {
    this.guildService.updateOne(guild.$key, {
      officiers: arrayRemove(member)
    }).subscribe(() => {
      this.message.success(`Successfully demoted officier to member.`);
    });
  }

  promoteLeader(member: CharacterReference, guild: Guild): void {
    this.guildService.updateOne(guild.$key, {
      leader: member
    }).subscribe(() => {
      this.message.success(`Successfully promoted member to leader.`);
    });
  }

  kick(member: CharacterReference, guild: Guild): void {
    const update: UpdateData<Guild> = {
      members: arrayRemove(member)
    };
    const userId = parseCharacterReference(member).userId;
    if (guild.members.filter(ref => isSameUser(ref, userId)).length === 1) {
      update.users = arrayRemove(userId);
    }
    this.guildService.updateOne(guild.$key, update).subscribe(() => {
      this.message.success(`Successfully kicked member.`);
    });
  }

  setVisibility(guild: Guild, visibility: GuildVisibility): void {
    this.guildService.updateOne(guild.$key, { visibility });
  }

  accept(candidate: { message?: string, ref: CharacterReference }, guild: Guild): void {
    const update: UpdateData<Guild> = {
      members: arrayUnion(candidate.ref),
      candidates: arrayRemove(candidate)
    };
    if (!guild.users.some(uid => isSameUser(candidate.ref, uid))) {
      update.users = arrayUnion(parseCharacterReference(candidate.ref).userId);
    }
    this.guildService.updateOne(guild.$key, update).subscribe(() => {
      this.message.success("Nes member added to the guild");
    });
  }

  reject(candidate: { message?: string, ref: CharacterReference }, guild: Guild): void {
    this.guildService.updateOne(guild.$key, {
      candidates: arrayRemove(candidate)
    }).subscribe(() => {
      this.message.success("Candidate accepted");
    });
  }

  memberIsLeader(ref: CharacterReference, guild: Guild): boolean {
    return isSameUser(guild.leader, parseCharacterReference(ref).userId);
  }

  memberIsOfficier(ref: CharacterReference, guild: Guild): boolean {
    return guild.officiers.some(off => {
      return isSameUser(off, parseCharacterReference(ref).userId);
    });
  }

  getInviteLink(guild: Guild): string {
    return `${location.protocol}//${location.host}/guild/${guild.$key}`;
  }

  copyLinkSuccess(): void {
    this.message.success(`Invite link copied to your clipboard`);
  }
}
