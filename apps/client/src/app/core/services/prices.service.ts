import { Injectable } from "@angular/core";
import { LocalStorageBehaviorSubject } from "../local-storage-behavior-subject";
import { MariTrade } from "../../pages/mari-optimizer/mari-trade";

@Injectable({
  providedIn: "root"
})
export class PricesService {
  public itemPrices$ = new LocalStorageBehaviorSubject<Record<string, number>>("mari:items", {});
  public exchangeRateGoldPrice$ = new LocalStorageBehaviorSubject<number>("mari:gold", 500);

  public setExchangeRate(price: number): void {
    this.exchangeRateGoldPrice$.next(price);
  }

  getKey(trade: MariTrade | null | undefined): string {
    return (trade?.gameCode ?? "") + "";
  }

  setItemPrice(trade: MariTrade, price: number): void {
    this.itemPrices$.next({
      ...this.itemPrices$.value,
      [this.getKey(trade)]: price
    });
  }
}
