import {Component} from '@angular/core';
import {RosterService} from "../roster.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Character} from '../../../model/character';

@Component({
  selector: 'lostark-helper-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.less'],
})
export class RosterComponent {
  public roster$ = this.rosterService.roster$;

  public form = this.fb.group({
    name: ['', Validators.required],
    ilvl: [null, Validators.required]
  })

  constructor(private rosterService: RosterService,
              private fb: FormBuilder) {
  }

  public addCharacter(roster: Character[]): void {
    const form = this.form.getRawValue();
    roster.push({
      name: form.name,
      ilvl: form.ilvl
    })
    this.rosterService.saveRoster(roster);
    this.form.reset();
  }

  public removeCharacter(character: Character, roster: Character[]): void {
    this.rosterService.saveRoster(roster.filter(char => char.name !== character.name || char.ilvl !== character.ilvl));
    this.form.reset();
  }

  public saveCharacter(character: Character, roster: Character[]): void {
    this.rosterService.saveRoster(roster.map(char => {
      if (char.name === character.name) {
        return character;
      }
      return char;
    }));
    this.form.reset();
  }

  trackByCharacter(index: number, character: Character): string {
    return character.name;
  }

}
