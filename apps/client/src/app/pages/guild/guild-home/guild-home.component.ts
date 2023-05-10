import { Component } from "@angular/core";
import { GuildService } from "../../../core/database/services/guild.service";
import { combineLatest, map } from "rxjs";
import { AuthService } from "../../../core/database/services/auth.service";
import { CharacterReference, createReference, isSameUser } from "../../../core/database/character-reference";
import { FormBuilder, Validators } from "@angular/forms";
import { RosterService } from "../../../core/database/services/roster.service";
import { LostarkRegion } from "../../../model/lostark-region";
import { NzMessageService } from "ng-zorro-antd/message";
import { Guild } from "../../../model/guild/guild";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";
import { LostarkClass } from "../../../model/character/lostark-class";

@Component({
  selector: "lostark-helper-guild-home",
  templateUrl: "./guild-home.component.html",
  styleUrls: ["./guild-home.component.less"]
})
export class GuildHomeComponent {

  public allRegions = Object.keys(LostarkRegion)
    .filter((k, i, array) => array.indexOf(k) === i)
    .map(key => {
      return {
        value: key,
        label: key.split("_")
          .map(word => `${word[0]}${word.slice(1).toLowerCase()}`)
          .join(" ")
      };
    });

  public userGuilds$ = combineLatest([this.guildService.userGuilds$, this.auth.uid$]).pipe(
    map(([guilds, uid]) => {
      return guilds.map(guild => {
        return {
          isLeader: isSameUser(guild.leader, uid),
          isOfficier: guild.officiers.some(off => isSameUser(off, uid)),
          isGuest: guild.guests.some(off => isSameUser(off, uid)),
          guild
        };
      });
    })
  );

  public characters$ = this.rosterService.roster$.pipe(
    map(roster => {
      return roster.characters.map(c => ({
        ...c,
        className: LostarkClass[c.class].toLowerCase(),
      }))
    })
  );

  public uid$ = this.auth.uid$;

  public guildCreationForm = this.fb.group({
    name: ["", Validators.required],
    region: [null, Validators.required],
    character: [null, Validators.required],
    discord: [null, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]
  });

  constructor(private guildService: GuildService, private auth: AuthService,
              private fb: FormBuilder, private rosterService: RosterService,
              private message: NzMessageService) {
  }

  createGuild(uid: string): void {
    const raw = this.guildCreationForm.getRawValue();
    this.guildService.addOne({
      name: raw.name,
      region: raw.region,
      members: [createReference(uid, raw.character)],
      guests: [],
      officiers: [],
      leader: createReference(uid, raw.character),
      users: [uid],
      candidates: [],
      discordServer: raw.discord || "",
      privateMembers: false
    }).subscribe(() => {
      this.guildCreationForm.reset();
      this.message.success(`Created guild ${raw.name}`);
    });
  }

  deleteGuild(guild: Guild): void {
    this.guildService.deleteOne(guild.$key).subscribe(() => {
      this.message.success(`Deleted guild ${guild.name}`);
    });
  }

  getInviteLink(guild: Guild): string {
    return `${location.protocol}//${location.host}/guild/${guild.$key}`;
  }

  copyLinkSuccess(): void {
    this.message.success(`Invite link copied to your clipboard`);
  }
}
