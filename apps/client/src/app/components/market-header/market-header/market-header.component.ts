import { Component, Input } from "@angular/core";
import { first } from "rxjs";
import { mariTrades } from "../../../pages/mari-optimizer/mari-trades";
import { LostArkMarketService } from "../../../core/services/lost-ark-market.service";
import { PricesService } from "../../../core/services/prices.service";
import { GameCode } from "../../../data/game-code";

@Component({
  selector: "lostark-helper-market-header",
  templateUrl: "./market-header.component.html",
  styleUrls: ["./market-header.component.less"]
})
export class MarketHeaderComponent {

  @Input()
  title!: string;

  @Input()
  subTitle!: string;

  public itemPrices$ = this.pricesService.itemPrices$;
  public exchangeRateGoldPrice$ = this.pricesService.exchangeRateGoldPrice$;

  public updatingFromMarket = false;

  constructor(private lostArkMarket: LostArkMarketService, private pricesService: PricesService) {
  }

  updatePricesFromLostarkMarket(): void {
    this.updatingFromMarket = true;
    this.lostArkMarket.enhancementMaterialsFeed$.pipe(
      first()
    ).subscribe(entries => {
      mariTrades.forEach(trade => {
        const marketEntry = entries.find(e => +e.gameCode === trade.gameCode);
        if (!marketEntry) {
          console.warn("Missing market entry for", trade.name);
        } else {
          this.pricesService.setItemPrice(trade, marketEntry.cheapestRemaining > 1000 ? marketEntry.lowPrice : marketEntry.recentPrice);
        }
      });
      const crystalEntry = entries.find(e => +e.gameCode === GameCode.BLUE_CRYSTAL);
      if (crystalEntry) {
        this.pricesService.setExchangeRate(Math.floor(crystalEntry.recentPrice * 95));
      }
      this.updatingFromMarket = false;
    });
  }
}
