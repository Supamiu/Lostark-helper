import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../database/services/user.service";
import { BehaviorSubject, combineLatest, shareReplay, switchMap, throttleTime } from "rxjs";
import { LostarkRegion } from "../../model/lostark-region";
import { LostArkMarketEntry } from "./lost-ark-market-entry";

@Injectable({
  providedIn: "root"
})
export class LostArkMarketService {

  private reloader$ = new BehaviorSubject<void>(void 0);

  public readonly region$ = this.userService.region$;

  public readonly enhancementMaterialsFeed$ = combineLatest([
    this.region$,
    this.reloader$.pipe(throttleTime(5 * 60000)) // No more than one request every 5 minutes !
  ]).pipe(
    switchMap(([region]) => {
      return this.http.get<LostArkMarketEntry[]>(`https://www.lostarkmarket.online/api/export-market-live/${this.toRegionFilter(region)}?categories=Enhancement Material,Currency Exchange`);
    }),
    shareReplay(1)
  );

  constructor(private userService: UserService, private http: HttpClient) {
  }

  private toRegionFilter(region: LostarkRegion): string {
    return region.split("_")
      .map(word => `${word[0]}${word.slice(1).toLowerCase()}`)
      .join(" ");
  }

}
