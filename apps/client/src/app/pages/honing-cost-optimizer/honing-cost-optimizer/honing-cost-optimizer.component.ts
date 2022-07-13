import { Component } from '@angular/core';
import { LocalStorageBehaviorSubject } from '../../../core/local-storage-behavior-subject';
import { combineLatest, map, merge, ReplaySubject } from 'rxjs';
import { mariTrades } from '../../mari-optimizer/mari-trades';
import { honingChances } from '../honing-chances';
import { MariTrade } from '../../mari-optimizer/mari-trade';
import { PricesService } from '../../../core/services/prices.service';

@Component({
  selector: 'lostark-helper-honing-cost-optimizer',
  templateUrl: './honing-cost-optimizer.component.html',
  styleUrls: ['./honing-cost-optimizer.component.less'],
})
export class HoningCostOptimizerComponent {
  public exchangeRateGoldPrice$ = this.pricesService.exchangeRateGoldPrice$;

  private honingChancesMaterials = mariTrades.filter((t) => {
    return t.name.startsWith('Solar ') || t.name.endsWith(' Mending') || t.name.endsWith(' Welding');
  });

  public itemPrices$ = this.pricesService.itemPrices$;

  public type$ = new LocalStorageBehaviorSubject<'armor' | 'weapon'>('honing:type', 'armor');

  public rarity$ = new LocalStorageBehaviorSubject<'epic' | 'legendary/relic'>('honing:rarity', 'legendary/relic');

  public target$ = new LocalStorageBehaviorSubject<number>('honing:target', 8);

  public includeShards$ = new LocalStorageBehaviorSubject<boolean>('honing:include-shards', false);

  public buyFromMari$ = new LocalStorageBehaviorSubject<boolean>('honing:get-hm-from-mari', false);

  public chanceItemsQuantities$ = new LocalStorageBehaviorSubject<{ grace: number; blessing: number; protection: number; welding: number; mending: number }>('honing:chance-items-quantities', {
    grace: 24,
    blessing: 12,
    protection: 4,
    welding: 1,
    mending: 1,
  });

  public chanceItemsQuantitiesDisplay$ = this.chanceItemsQuantities$.pipe(
    map((quantities) => {
      return this.honingChancesMaterials.map((item) => {
        const quantityKey = item.name.startsWith('Solar ') ? item.name.replace('Solar ', '').toLowerCase() : item.name.replace(/.*: Applied /, '').toLowerCase();
        return {
          icon: item.icon,
          name: item.name,
          quantity: quantities[quantityKey],
          quantityKey,
        };
      });
    })
  );

  public chancesInput$ = new ReplaySubject<number>();

  public computedChances$ = combineLatest([this.type$, this.rarity$, this.target$]).pipe(
    map(([type, rarity, target]) => {
      return honingChances.find((h) => h.type === type && h.rarity === rarity && h.target === target)?.chances || 100;
    })
  );

  public appliedChances$ = merge(this.chancesInput$, this.computedChances$);

  public targets$ = combineLatest([this.type$, this.rarity$]).pipe(
    map(([type, rarity]) => {
      return honingChances.filter((c) => c.rarity === rarity && c.type === type);
    })
  );

  public targetHoningChances$ = combineLatest([this.type$, this.rarity$, this.target$]).pipe(
    map(([type, rarity, target]) => {
      return honingChances.find((h) => h.type === type && h.rarity === rarity && h.target === target);
    })
  );

  public materialsNeeded$ = combineLatest([this.targetHoningChances$, this.includeShards$, this.itemPrices$, this.chanceItemsQuantities$, this.buyFromMari$, this.exchangeRateGoldPrice$]).pipe(
    map(([targetEntry, includeShards, prices, honingItemsQuantities, buyFromMari, goldPer95Crystal]) => {
      if (targetEntry) {
        const leapstones = mariTrades.find((t) => t.name === (targetEntry?.rarity === 'epic' ? 'Honor Leapstone' : 'Great Honor Leapstone'));
        const fusionMaterial = mariTrades.find((t) => t.name === (targetEntry?.rarity === 'epic' ? 'Simple Oreha Fusion Material' : 'Basic Oreha Fusion Material'));
        const shards = includeShards ? mariTrades.find((t) => t.name === 'Honor Shard Pouch (S)') : null;
        const stones = mariTrades.find((t) => t.name === (targetEntry?.type === 'armor' ? 'Guardian Stone Crystal' : 'Destruction Stone Crystal'));
        return [
          {
            item: stones,
            quantity: targetEntry.stones,
            isHoningItem: false,
          },
          {
            item: fusionMaterial,
            quantity: targetEntry.fusionMaterial,
            isHoningItem: false,
          },
          {
            item: leapstones,
            quantity: targetEntry.leapstones,
            isHoningItem: false,
          },
          ...(shards
            ? [
                {
                  item: shards,
                  quantity: targetEntry.shards,
                  isHoningItem: false,
                },
              ]
            : []),
          ...this.honingChancesMaterials.map((item) => {
            const entry = {
              item,
              quantity: honingItemsQuantities[item.name.toLowerCase().replace(/solar |(.*: applied )/, '')],
              isHoningItem: true,
              price: prices[`${item.name}:${item.quantity}`] || 0,
            };
            if (buyFromMari) {
              entry.price = Math.ceil((item.crystalPrice * (goldPer95Crystal / 95)) / item.quantity);
            }
            return entry;
          }),
        ].map((row) => {
          const priceKey = `${row.item?.name}:${row.item?.quantity}`;
          return {
            price: (row as { price: number }).price || prices[priceKey] || 0,
            ...row,
            priceKey,
          };
        });
      }
      return [];
    })
  );

  public result$ = combineLatest([this.targetHoningChances$, this.materialsNeeded$, this.computedChances$, this.appliedChances$]).pipe(
    map(([honing, materials, baseChances, chances]) => {
      const goldPricePerTentative = Math.floor(
        materials
          .filter((m) => !m.item?.name?.startsWith('Solar') && !m.item?.name?.endsWith('Mending') && !m.item?.name?.endsWith('Welding'))
          .reduce((acc, material) => {
            let buyoutsNeeded = Math.ceil(material.quantity / (material.item?.mbQuantity || 1));
            if (material.item?.name?.includes('Shard')) {
              buyoutsNeeded = buyoutsNeeded / 500;
            }
            return acc + material.price * buyoutsNeeded;
          }, honing?.gold || 0)
      );

      const honingChanceItemsCost = Math.floor(
        materials
          .filter((m) => m.item?.name?.startsWith('Solar') || m.item?.name?.endsWith('Mending') || m.item?.name?.endsWith('Welding'))
          .reduce((acc, material) => {
            const buyoutsNeeded = Math.ceil(material.quantity / (material.item?.mbQuantity || 1));
            return acc + material.price * buyoutsNeeded;
          }, 0)
      );
      const preparedBaseChances = 1 - (1.1 * baseChances) / 100;
      const preparedChances = 1 - chances / 100;
      const chancesForTwoTries = (1 - preparedChances * preparedBaseChances) * 100;
      const pricePerPercentBoosted = (goldPricePerTentative + honingChanceItemsCost) / (chances + baseChances);
      const pricePerPercentTwoTries = (goldPricePerTentative * 2) / chancesForTwoTries;
      let conclusion: string;
      if (pricePerPercentBoosted < pricePerPercentTwoTries) {
        conclusion = `Using honing items is ${100 - Math.floor((100 * pricePerPercentBoosted) / pricePerPercentTwoTries)}% cheaper.`;
      } else {
        conclusion = `Trying honing twice is ${100 - Math.floor((100 * pricePerPercentTwoTries) / pricePerPercentBoosted)}% cheaper.`;
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
        conclusion,
      };
    })
  );

  constructor(private pricesService: PricesService) {}

  setItemPrice(trade?: MariTrade, price?: number): void {
    if (trade && price) {
      this.pricesService.setItemPrice(trade, price);
    }
  }

  setHoningItemQuantity(quantityKey: string, quantity: number): void {
    this.chanceItemsQuantities$.next({
      ...this.chanceItemsQuantities$.value,
      [quantityKey]: quantity,
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
