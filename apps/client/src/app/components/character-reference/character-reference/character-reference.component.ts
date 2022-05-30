import { Component, Input } from "@angular/core";
import { RosterService } from "../../../core/database/services/roster.service";
import { CharacterReference, parseCharacterReference } from "../../../core/database/character-reference";
import { combineLatest, map, ReplaySubject, switchMap } from "rxjs";
import { filter } from "rxjs/operators";
import { UserService } from "../../../core/database/services/user.service";

@Component({
  selector: "lostark-helper-character-reference",
  templateUrl: "./character-reference.component.html",
  styleUrls: ["./character-reference.component.less"]
})
export class CharacterReferenceComponent {

  private reference$ = new ReplaySubject<CharacterReference>();

  @Input()
  set reference(ref: CharacterReference) {
    this.reference$.next(ref);
  }

  @Input()
  showIlvl = false;

  public data$ = this.reference$.pipe(
    filter(Boolean),
    switchMap(ref => {
      const { userId, characterId } = parseCharacterReference(ref);
      return combineLatest([
        this.rosterService.getOne(userId),
        this.userService.getOne(userId)
      ]).pipe(
        map(([roster, user]) => {
          if (roster.notFound || user.notFound) {
            return {
              userName: null,
              character: null
            };
          }
          return {
            userName: user.name,
            character: roster.characters.find(c => c.id === characterId)
          };
        })
      );
    })
  );

  constructor(private rosterService: RosterService, private userService: UserService) {
  }
}
