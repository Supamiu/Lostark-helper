import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { Build, BuildService } from "../../../core/services/builds.service";
import { EngravingsService } from "../../../core/services/engravings.service";
import { LostArkEngraving } from "../../../data/lost-ark-engraving";
import { LostArkStat } from "../../../data/lost-ark-stat";

type BuildEngraving = LostArkEngraving & {
    index: number;
}

type Match = {
    name: Build["name"];
    description: string;
    engravings: BuildEngraving[];
}

type Matches = {
    perfect: Match[];
    partial: Match[];
};

@Component({
    selector: "lostark-helper-engraving-search", 
    templateUrl: "./engraving-search.component.html",
    styleUrls: ["./engraving-search.component.less"]
})
export class EngravingSearchComponent implements OnInit {
    public first?: number;

    public second?: number;

    public builds = this.buildService.builds;

    public firstEngravingId$: BehaviorSubject<number> = new BehaviorSubject(0);

    public secondEngravingId$: BehaviorSubject<number> = new BehaviorSubject(0);

    public engravings$ = this.engravingService.engravings$;

    public matches$: BehaviorSubject<Matches> = new BehaviorSubject({ perfect: [], partial: [] } as Matches);

    constructor(private engravingService: EngravingsService, private buildService: BuildService) {}

    public onChangeFirst(id: number): void {
        this.firstEngravingId$.next(id)
    }

    public onChangeSecond(id: number): void {
        this.secondEngravingId$.next(id);
    }

    ngOnInit(): void {
        combineLatest([this.firstEngravingId$, this.secondEngravingId$]).subscribe(
            ([first, second]) => {
                const match = this.builds.reduce(
                    (acc, build) => {
                        const firstIndex = build.engravings?.findIndex(e => e?.id === first);
                        const secondIndex = build.engravings?.findIndex(e => e?.id === second);
                        const firstEngraving = build.engravings?.[firstIndex] || {};
                        const secondEngraving = build.engravings?.[secondIndex] || {};

                        const engravings = [
                            { index: firstIndex + 1, ...firstEngraving },
                            { index: secondIndex + 1, ...secondEngraving },
                        ].sort((a, b) => a.index - b.index).filter(e => e.index > 0);

                        if ( engravings.length === 0) {
                            return acc;
                        }

                        const data = {
                            name: build.name,
                            description: build.stats.map(stat => LostArkStat[stat]).join(' | '),
                            engravings,
                        }

                        if ( engravings.length === 1 ) {
                            acc.partial.push(data);
                        } else {
                            acc.perfect.push(data);
                        }

                        return acc;
                    }, {
                        perfect: [],
                        partial: []
                    } as Matches
                );

                match.perfect.sort((a, b) => a.engravings[0].index - b.engravings[0].index);
                match.partial.sort((a, b) => a.engravings[0].index - b.engravings[0].index);

                this.matches$.next(match);
            }
        )
    }
}
