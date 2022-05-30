import { Component } from "@angular/core";
import { GearsetService } from "../../../core/database/services/gearset.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "../../../core/database/services/auth.service";
import { filter, first } from "rxjs/operators";
import { map, switchMap } from "rxjs";
import { GearsetCreationPopupComponent } from "../gearset-creation-popup/gearset-creation-popup.component";
import { Gearset } from "../../../model/character/gearset";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "lostark-helper-gearsets",
  templateUrl: "./gearsets.component.html",
  styleUrls: ["./gearsets.component.less"]
})
export class GearsetsComponent {

  public gearsets$ = this.gearsetService.gearsets$;

  constructor(private gearsetService: GearsetService, private nzModal: NzModalService,
              private auth: AuthService, private message: NzMessageService) {
  }

  createGearset(): void {
    this.auth.uid$.pipe(
      first(),
      switchMap(uid => {
        return this.nzModal.create<GearsetCreationPopupComponent, Partial<Gearset> | undefined>({
          nzContent: GearsetCreationPopupComponent,
          nzTitle: "Create a new gearset",
          nzFooter: null
        }).afterClose.pipe(
          filter(Boolean),
          map(gearset => {
            return {
              ...gearset,
              authorId: uid
            };
          }),
          switchMap(gearset => {
            return this.gearsetService.addOne(gearset as Gearset);
          })
        );
      })
    ).subscribe(() => {
      this.message.success("New gearset has been created");
    });
  }

  deleteGearset(gearset: Gearset): void {
    this.gearsetService.deleteOne(gearset.$key);
  }
}
