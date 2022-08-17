import { Component } from "@angular/core";
import { RosterService } from "../../../core/database/services/roster.service";
import { combineLatest, map } from "rxjs";
import { mariTrades } from "../mari-trades";
import { MariTrade } from "../mari-trade";
import { PricesService } from "../../../core/services/prices.service";

@Component({
  selector: "lostark-helper-mari-optimizer",
  templateUrl: "./mari-optimizer.component.html",
  styleUrls: ["./mari-optimizer.component.less"]
})
export class MariOptimizerComponent {

  public itemPrices$ = this.pricesService.itemPrices$;
  public exchangeRateGoldPrice$ = this.pricesService.exchangeRateGoldPrice$;

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
        const itemPriceEntry = itemPrices[this.pricesService.getKey(trade)] || 0;
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

  constructor(private rosterService: RosterService, private pricesService: PricesService) {
  }

  trackByDisplayRow(index: number, row: { trade: MariTrade }): string {
    return this.pricesService.getKey(row.trade);
  }

  setItemPrice(trade: MariTrade, price: number): void {
    this.pricesService.setItemPrice(trade, price);
  }
}
