import { Component } from "@angular/core";
import { RosterService } from "../roster.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Character } from "../../../model/character";
import { LostarkClass } from "../../../model/lostark-class";
import {
  TextQuestionPopupComponent
} from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { filter } from "rxjs/operators";
import { Clipboard } from "@angular/cdk/clipboard";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalService } from "ng-zorro-antd/modal";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

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

  constructor(private rosterService: RosterService,
              private fb: FormBuilder, private clipboard: Clipboard,
              private message: NzMessageService,
              private modal: NzModalService) {
  }

  public addCharacter(roster: Character[]): void {
    const form = this.form.getRawValue();
    roster.push({
      id: (roster.map(c => c.id).sort().reverse()[0] || -1) + 1,
      name: form.name,
      ilvl: form.ilvl,
      lazy: form.lazy,
      class: form.class
    });
    this.rosterService.saveRoster(roster);
    this.form.reset();
  }

  public removeCharacter(character: Character, roster: Character[]): void {
    this.rosterService.saveRoster(roster.filter(char => char.name !== character.name || char.ilvl !== character.ilvl));
    this.form.reset();
  }

  public saveCharacter(character: Character, roster: Character[]): void {
    this.rosterService.saveRoster(roster.map(char => {
      if (character.id && char.id === character.id) {
        return character;
      }
      return char;
    }));
    this.form.reset();
  }

  exportRoster(roster: Character[]): void {
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
        filter(Boolean)
      )
      .subscribe((rosterJson) => {
        try {
          this.rosterService.saveRoster(JSON.parse(rosterJson));
          this.message.success("Roster imported");
        } catch (e: unknown) {
          this.message.error((e as Error).message);
        }
      });
  }

  trackByCharacter(index: number, character: Character): string {
    return character.name;
  }

  drop(event: CdkDragDrop<Character[], Character>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.rosterService.saveRoster(event.container.data);
  }
}
