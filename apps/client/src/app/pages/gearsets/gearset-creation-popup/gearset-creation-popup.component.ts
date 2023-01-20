import { Component } from "@angular/core";
import { RosterService } from "../../../core/database/services/roster.service";
import { NzModalRef } from "ng-zorro-antd/modal";
import { FormBuilder, Validators } from "@angular/forms";
import { Gearset } from "../../../model/character/gearset";
import { GearsetPiece } from "../../../model/character/gearset-piece";
import { ItemRarity } from "../../../model/item-rarity";
import { Accessory } from "../../../model/character/accessory";
import { GearsetRarity } from "../../../model/gearset-rarity";

@Component({
  selector: "lostark-helper-gearset-creation-popup",
  templateUrl: "./gearset-creation-popup.component.html",
  styleUrls: ["./gearset-creation-popup.component.less"]
})
export class GearsetCreationPopupComponent {

  public roster$ = this.rosterService.roster$;

  public form = this.fb.group({
    name: ["", Validators.required],
    character: [null]
  });

  constructor(private rosterService: RosterService, private modalRef: NzModalRef<GearsetCreationPopupComponent, Partial<Gearset>>,
              private fb: FormBuilder) {
  }

  submit(): void {
    const raw = this.form.getRawValue();
    const defaultGearsetPiece: GearsetPiece = {
      honing: 1,
      quality: 100,
      rarity: GearsetRarity.RARE,
      targetHoning: 1
    };
    const defaultAccessory: Accessory = {
      quality: 100,
      rarity: ItemRarity.RARE,
      engravings: [],
      stats: []
    };
    const gearset: Partial<Gearset> = {
      name: raw.name,

      currentIlvl: 1302,
      targetIlvl: 1302,

      headgear: { ...defaultGearsetPiece },
      shoulders: { ...defaultGearsetPiece },
      chestpiece: { ...defaultGearsetPiece },
      legwear: { ...defaultGearsetPiece },
      gloves: { ...defaultGearsetPiece },
      weapon: { ...defaultGearsetPiece },

      necklace: { ...defaultAccessory },
      earring1: { ...defaultAccessory },
      earring2: { ...defaultAccessory },
      ring1: { ...defaultAccessory },
      ring2: { ...defaultAccessory },

      stone: {
        rarity: ItemRarity.RARE,
        engravings: []
      },

      engravings: []
    };
    if (raw.character) {
      gearset.character = raw.character;
    }
    this.modalRef.close(gearset);
  }
}
