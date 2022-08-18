import { Component } from "@angular/core";
import { LocalStorageBehaviorSubject } from "../../../core/local-storage-behavior-subject";
import { combineLatest, map, merge, ReplaySubject } from "rxjs";
import { mariTrades } from "../../mari-optimizer/mari-trades";
import { honingChances } from "../honing-chances";
import { MariTrade } from "../../mari-optimizer/mari-trade";
import { PricesService } from "../../../core/services/prices.service";
import { GameCode } from "../../../data/game-code";

@Component({
  selector: "lostark-helper-honing-cost-optimizer",
  templateUrl: "./honing-cost-optimizer.component.html",
  styleUrls: ["./honing-cost-optimizer.component.less"]
})
export class HoningCostOptimizerComponent {
  public exchangeRateGoldPrice$ = this.pricesService.exchangeRateGoldPrice$;

  private honingChancesMaterials = mariTrades.filter(t => [GameCode.JUICE_1302_S, GameCode.JUICE_1302_M, GameCode.JUICE_1302_L].some(gc => gc === t.gameCode));

  public itemPrices$ = this.pricesService.itemPrices$;

  public type$ = new LocalStorageBehaviorSubject<"armor" | "weapon">("honing:type", "armor");

  public rarity$ = new LocalStorageBehaviorSubject<"epic" | "legendary/relic">("honing:rarity", "legendary/relic");

  public target$ = new LocalStorageBehaviorSubject<number>("honing:target", 8);

  public includeShards$ = new LocalStorageBehaviorSubject<boolean>("honing:include-shards", false);

  public buyFromMari$ = new LocalStorageBehaviorSubject<boolean>("honing:get-hm-from-mari", false);

  public chanceItemsQuantities$ = new LocalStorageBehaviorSubject<{ [GameCode.JUICE_1302_S]: number, [GameCode.JUICE_1302_M]: number, [GameCode.JUICE_1302_L]: number }>(
    "honing:chance-items-quantities", { [GameCode.JUICE_1302_S]: 24, [GameCode.JUICE_1302_M]: 12, [GameCode.JUICE_1302_L]: 4 });

  public chanceItemsQuantitiesDisplay$ = this.chanceItemsQuantities$.pipe(
    map(quantities => {
      return this.honingChancesMaterials.map(item => ({
          gameCode: item.gameCode,
          icon: item.icon,
          name: item.name,
          quantity: quantities[item.gameCode]
      }));
    })
  );

  public chancesInput$ = new ReplaySubject<number>();

  public computedChances$ = combineLatest([
    this.type$,
    this.rarity$,
    this.target$
  ]).pipe(
    map(([type, rarity, target]) => {
      return honingChances.find(h => h.type === type && h.rarity === rarity && h.target === target)?.chances || 100;
    })
  );

  public appliedChances$ = merge(this.chancesInput$, this.computedChances$);

  public targets$ = combineLatest([
    this.type$,
    this.rarity$
  ]).pipe(
    map(([type, rarity]) => {
      return honingChances.filter(c => c.rarity === rarity && c.type === type);
    })
  );

  public targetHoningChances$ = combineLatest([
    this.type$,
    this.rarity$,
    this.target$
  ]).pipe(
    map(([type, rarity, target]) => {
      return honingChances.find(h => h.type === type && h.rarity === rarity && h.target === target);
    })
  );

  public materialsNeeded$ = combineLatest([
    this.targetHoningChances$,
    this.includeShards$,
    this.itemPrices$,
    this.chanceItemsQuantities$,
    this.buyFromMari$,
    this.exchangeRateGoldPrice$
  ]).pipe(
    map(([targetEntry, includeShards, prices, honingItemsQuantities, buyFromMari, goldPer95Crystal]) => {
      if (targetEntry) {
        const leapstones = mariTrades.find(t => t.gameCode === (targetEntry?.rarity === "epic" ? GameCode.LEAPSTONE_1302 : GameCode.LEAPSTONE_1340));
        const fusionMaterial = mariTrades.find(t => t.gameCode === (targetEntry?.rarity === "epic" ? GameCode.FUSION_1302 : GameCode.FUSION_1340));
        const shards = includeShards ? mariTrades.find(t => t.gameCode === GameCode.SHARDS_1302_S) : null;
        const stones = mariTrades.find(t => t.gameCode === (targetEntry?.type === "armor" ? GameCode.GUARDIAN_1302 : GameCode.DESTRUCTION_1302));
        return [
          {
            item: stones,
            quantity: targetEntry.stones,
            isHoningItem: false
          },
          {
            item: fusionMaterial,
            quantity: targetEntry.fusionMaterial,
            isHoningItem: false
          },
          {
            item: leapstones,
            quantity: targetEntry.leapstones,
            isHoningItem: false
          },
          ...(shards ? [{
            item: shards,
            quantity: targetEntry.shards,
            isHoningItem: false
          }] : []),
          ...this.honingChancesMaterials.map(item => {
            const entry = {
              item,
              quantity: honingItemsQuantities[item.gameCode],
              isHoningItem: true,
              price: prices[this.pricesService.getKey(item)] || 0
            };
            if (buyFromMari) {
              entry.price = Math.ceil(item.crystalPrice * (goldPer95Crystal / 95) / item.quantity);
            }
            return entry;
          })
        ]
        .map(row => {
          const priceKey = this.pricesService.getKey(row.item);
          return {
            price: (row as { price: number }).price || prices[priceKey] || 0,
            ...row,
            priceKey
          };
        });
      }
      return [];
    })
  );

  public result$ = combineLatest([
    this.targetHoningChances$,
    this.materialsNeeded$,
    this.computedChances$,
    this.appliedChances$
  ]).pipe(
    map(([honing, materials, baseChances, chances]) => {
      const goldPricePerTentative = Math.floor(materials
        .filter(m => [GameCode.JUICE_1302_S, GameCode.JUICE_1302_M, GameCode.JUICE_1302_L].every(gc => gc !== m.item?.gameCode))
        .reduce((acc, material) => {
          let buyoutsNeeded = Math.ceil(material.quantity / (material.item?.mbQuantity || 1));
          if (material.item?.gameCode === GameCode.SHARDS_1302_S) {
            buyoutsNeeded = buyoutsNeeded / 500;
          }
          return acc + material.price * buyoutsNeeded;
        }, honing?.gold || 0));

      const honingChanceItemsCost = Math.floor(materials
        .filter(m => [GameCode.JUICE_1302_S, GameCode.JUICE_1302_M, GameCode.JUICE_1302_L].some(gc => gc === m.item?.gameCode))
        .reduce((acc, material) => {
          const buyoutsNeeded = Math.ceil(material.quantity / (material.item?.mbQuantity || 1));
          return acc + material.price * buyoutsNeeded;
        }, 0));
      const preparedBaseChances = 1 - (chances / 100);
      const preparedChances = 1 - (Math.min(chances * 1.1, 2 * baseChances) / 100);
      const chancesForTwoTries = (1 - (preparedChances * preparedBaseChances)) * 100;
      const pricePerPercentBoosted = (goldPricePerTentative + honingChanceItemsCost) / (chances + baseChances);
      const pricePerPercentTwoTries = (goldPricePerTentative * 2) / chancesForTwoTries;
      let conclusion: string;
      if (pricePerPercentBoosted < pricePerPercentTwoTries) {
        conclusion = `Using honing items is ${100 - Math.floor(100 * pricePerPercentBoosted / pricePerPercentTwoTries)}% cheaper.`;
      } else {
        conclusion = `Trying honing twice is ${100 - Math.floor(100 * pricePerPercentTwoTries / pricePerPercentBoosted)}% cheaper.`;
      }
      return {
        chances,
        maxChances: chances + baseChances,
        goldPricePerTentative,
        honingChanceItemsCost,
        goldPricePerTentativeWithHoningMaterials: goldPricePerTentative + honingChanceItemsCost,
        chancesForTwoTries,
        goldPriceForTwoTries: goldPricePerTentative * 2,
        pricePerPercentBoosted,
        pricePerPercentTwoTries,
        conclusion
      };
    })
  );

  constructor(private pricesService: PricesService) {
  }

  setItemPrice(trade?: MariTrade, price?: number): void {
    if (trade && price) {
      this.pricesService.setItemPrice(trade, price);
    }
  }

  setHoningItemQuantity(gameCode: GameCode, quantity: number): void {
    this.chanceItemsQuantities$.next({
      ...this.chanceItemsQuantities$.value,
      [gameCode]: quantity
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
