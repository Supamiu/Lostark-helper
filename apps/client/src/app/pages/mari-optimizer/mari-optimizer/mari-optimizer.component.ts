import { Component } from "@angular/core";
import { LocalStorageBehaviorSubject } from "../../../core/local-storage-behavior-subject";
import { RosterService } from "../../../core/database/services/roster.service";
import { combineLatest, map } from "rxjs";
import { mariTrades } from "../mari-trades";
import { MariTrade } from "../mari-trade";

@Component({
  selector: "lostark-helper-mari-optimizer",
  templateUrl: "./mari-optimizer.component.html",
  styleUrls: ["./mari-optimizer.component.less"]
})
export class MariOptimizerComponent {
  public exchangeRateGoldPrice$ = new LocalStorageBehaviorSubject<number>("mari:gold", 500);

  public itemPrices$ = new LocalStorageBehaviorSubject<Record<string, number>>("mari:items", {});

  public trades$ = this.rosterService.roster$.pipe(
    map(roster => {
      return mariTrades
        .filter(trade => roster.characters.length === 0 || roster.characters.some(c => c.ilvl >= trade.minIlvl && c.ilvl < trade.maxIlvl));
    })
  );

  public display$ = combineLatest([
    this.trades$,
    this.exchangeRateGoldPrice$,
    this.itemPrices$
  ]).pipe(
    map(([trades, goldPrice, itemPrices]) => {
      const goldPerCrystal = goldPrice / 95;
      return trades.map(trade => {
        const itemPriceEntry = itemPrices[`${trade.name}:${trade.quantity}`] || 0;
        const tradeCrystalGoldPrice = trade.crystalPrice * goldPerCrystal / trade.quantity;
        const tradeMbGoldPrice = itemPriceEntry / trade.mbQuantity;
        const diffPercent = 100 - Math.floor(100 * tradeCrystalGoldPrice / tradeMbGoldPrice);
        const shouldBuy = diffPercent > 0;
        return {
          trade,
          diffPercent,
          shouldBuy,
          itemPriceEntry
        };
      });
    })
  );

  constructor(private rosterService: RosterService) {
  }

  trackByDisplayRow(index: number, row: { trade: MariTrade }): string {
    return `${row.trade.name}:${row.trade.quantity}`;
  }

  setItemPrice(trade: MariTrade, price: number): void {
    this.itemPrices$.next({
      ...this.itemPrices$.value,
      [`${trade.name}:${trade.quantity}`]: price
    });
  }
}
