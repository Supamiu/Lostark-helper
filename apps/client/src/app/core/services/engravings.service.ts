import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LostArkEngraving } from "../../data/lost-ark-engraving";
import { map, of, shareReplay } from "rxjs";
import { Gearset } from "../../model/character/gearset";
import { EngravingEntry } from "../../model/engraving-entry";
import engravingsList from '../../data/engravings.json';

const engravings = engravingsList as LostArkEngraving[]

@Injectable({
  providedIn: "root"
})
export class EngravingsService {

  public allEngravings$ = of(engravings).pipe(
    map(engravings => engravings.sort((a,b) => a.name.localeCompare(b.name))),
  );

  public engravings$ = this.allEngravings$.pipe(
    map(engravings => engravings.filter(e => e.type !== 'negative')),
    shareReplay(1)
  );

  public negativeEngravings$ = this.allEngravings$.pipe(
    map(engravings => engravings.filter(e => e.type === 'negative')),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {
  }

  getTotalEngravings(gearset: Gearset): EngravingEntry[] {
    const allEngravings: EngravingEntry[] = [
      ...(gearset.engravings || []),
      ...(gearset.stone?.engravings || []),
      ...(gearset.necklace?.engravings || []),
      ...(gearset.earring1?.engravings || []),
      ...(gearset.earring2?.engravings || []),
      ...(gearset.ring1?.engravings || []),
      ...(gearset.ring2?.engravings || [])
    ];

    return allEngravings.reduce((acc, entry) => {
      const existingEntry = acc.find(e => e.engravingId === entry.engravingId);
      if (existingEntry) {
        existingEntry.nodes += entry.nodes;
      } else {
        acc.push({...entry});
      }
      return acc;
    }, [] as EngravingEntry[]);
  }

  getEngravingIdByName(name: string): LostArkEngraving | undefined {
    return engravings.find(e => e.name === name);
  }
}
