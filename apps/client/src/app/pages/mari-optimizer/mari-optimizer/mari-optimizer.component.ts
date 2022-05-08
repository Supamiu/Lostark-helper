import { Component } from "@angular/core";
import { LocalStorageBehaviorSubject } from "../../../core/local-storage-behavior-subject";
import { RosterService } from "../../../core/database/services/roster.service";

@Component({
  selector: "lostark-helper-mari-optimizer",
  templateUrl: "./mari-optimizer.component.html",
  styleUrls: ["./mari-optimizer.component.less"]
})
export class MariOptimizerComponent {
  public goldPrice$ = new LocalStorageBehaviorSubject<number>("mari:gold", 500);

  public itemPrices$ = new LocalStorageBehaviorSubject<Record<string, number>>("mari:items", {});

  constructor(private rosterService: RosterService) {
  }
}
