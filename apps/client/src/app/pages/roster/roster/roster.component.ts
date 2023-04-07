import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TextQuestionPopupComponent } from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { filter, first, switchMap, withLatestFrom } from "rxjs/operators";
import { Clipboard } from "@angular/cdk/clipboard";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { RosterService } from "../../../core/database/services/roster.service";
import { Roster } from "../../../model/roster";
import { arrayRemove } from "@angular/fire/firestore";
import { AuthService } from "../../../core/database/services/auth.service";
import { CompletionService } from "../../../core/database/services/completion.service";
import { EnergyService } from "../../../core/database/services/energy.service";
import { combineLatest, of } from "rxjs";
import { LostarkClass } from "../../../model/character/lostark-class";
import { Character } from "../../../model/character/character";

@Component({
  selector: "lostark-helper-roster",
  templateUrl: "./roster.component.html",
  styleUrls: ["./roster.component.less"]
})
export class RosterComponent {

  public LostarkClass = LostarkClass;

  public classes = Object.keys(LostarkClass)
    .filter(key => !isNaN(+key) && !LostarkClass[key].startsWith("UNRELEASED"))
    .map(key => {
      return {
        id: key,
        name: `${LostarkClass[key][0]}${LostarkClass[key].slice(1).toLowerCase()}`,
        icon: `class_${key.padStart(2, "0")}.png`
      };
    });

  public roster$ = this.rosterService.roster$;

  public form = this.fb.group({
    name: ["", Validators.required],
    ilvl: [null, Validators.required],
    lazy: [false],
    class: [null, Validators.required]
  });

  public hasLocalstorageRoster = localStorage.getItem("roster") !== null;

  constructor(private rosterService: RosterService,
              private auth: AuthService,
              private fb: FormBuilder,
              private clipboard: Clipboard,
              private message: NzMessageService,
              private completionService: CompletionService,
              private energyService: EnergyService,
              private modal: NzModalService) {
  }

  public addCharacter(roster: Roster): void {
    const form = this.form.getRawValue();
    roster.characters.push({
      id: (roster.characters.map(c => c.id).sort().reverse()[0] || -1) + 1,
      name: form.name,
      ilvl: form.ilvl,
      lazy: form.lazy,
      class: form.class,
      weeklyGold: roster.characters.length < 6,
      tickets: {
        t1Cube: 0,
        t2BossRush: 0,
        t2Cube: 0,
        t3BossRush: 0,
        t3BossRushHard: 0,
        t3Cube: 0,
        t3CubeHard: 0,
        t3CubeInferno: 0,
        t3BossRushInferno: 0,
        platinumFields: 0
      }
    });
    this.form.reset();
    this.rosterService.setOne(roster.$key, roster);
  }

  public removeCharacter(character: Character, roster: Roster): void {
    this.rosterService.updateOne(roster.$key, {
      characters: arrayRemove(character)
    });
  }

  public saveCharacterName(character: Character, roster: Roster, newName: string): void {
    combineLatest([
      this.completionService.completion$,
      this.energyService.energy$
    ]).pipe(
      first(),
      switchMap(([completion, energy]) => {
        let updated = false;
        Object.keys(completion.data).forEach(key => {
          if (key.startsWith(character.name)) {
            updated = true;
            completion.data[`${character.id}:${key.split(":")[1]}`] = completion.data[key];
            delete completion.data[key];
          }
        });
        Object.keys(energy.data).forEach(key => {
          if (key.startsWith(character.name)) {
            updated = true;
            energy.data[`${character.id}:${key.split(":")[1]}`] = energy.data[key];
            delete completion.data[key];
          }
        });
        if (updated) {
          return combineLatest([
            this.completionService.setOne(completion.$key, completion),
            this.energyService.setOne(energy.$key, energy)
          ]);
        }
        return of(null);
      })
    ).subscribe();
    this.saveCharacter({ ...character, name: newName }, roster);
  }

  public saveCharacter(character: Character, roster: Roster): void {
    this.rosterService.updateOne(roster.$key, {
      characters: roster.characters.map(char => {
        if (character.id && char.id === character.id) {
          return character;
        }
        return char;
      })
    });
  }

  exportRoster(roster: Roster): void {
    this.clipboard.copy(JSON.stringify(roster));
    this.message.success("Roster copied to your clipboard");
  }

  importRoster(): void {
    this.modal.create({
      nzTitle: "Import roster",
      nzContent: TextQuestionPopupComponent,
      nzComponentParams: {
        placeholder: "Paste your exported roster here"
      },
      nzFooter: null
    }).afterClose
      .pipe(
        filter(json => {
          const parsed = JSON.parse(json);
          const hasCharacters = Array.isArray( parsed.characters ) && parsed.characters.length > 0;
          return json && hasCharacters;
        }),
        withLatestFrom(this.auth.uid$),
        switchMap(([rosterJson, uid]) => {
          const parsed = JSON.parse(rosterJson);
          return this.rosterService.updateOne(uid, { characters: parsed.characters });
        })
      )
      .subscribe({
        next: () => {
          this.message.success("Roster imported");
        },
        error: e => {
          this.message.error((e as Error).message || e);
        }
      });
  }

  importFromLocalStorage(uid: string): void {
    const characters = JSON.parse(localStorage.getItem("roster") || "[]") as Character[];
    this.rosterService.setOne(uid, { characters, trackedTasks: {}, showAllTasks: false });
    localStorage.removeItem("roster");
    this.hasLocalstorageRoster = false;
  }

  trackByCharacter(index: number, character: Character): string {
    return character.name;
  }

  drop(roster: Roster, event: CdkDragDrop<Character[], Character>): void {
    moveItemInArray(roster.characters, event.previousIndex, event.currentIndex);
    roster.characters = roster.characters.map((c, i) => {
      return {
        ...c,
        index: i
      };
    });
    this.rosterService.updateOne(roster.$key, { characters: roster.characters });
  }
}
