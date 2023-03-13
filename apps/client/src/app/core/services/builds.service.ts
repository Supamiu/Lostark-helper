import { Injectable } from "@angular/core";
import { LostArkEngraving } from "../../data/lost-ark-engraving";
import { LostArkStat } from "../../data/lost-ark-stat";
import { EngravingsService } from "./engravings.service";

export type Build = {
    name: string;
    stats: LostArkStat[];
    engravings: LostArkEngraving[];
}

@Injectable({
    providedIn: "root"
})
export class BuildService {
    public builds: Build[] = [
        // Berserker
        {
            name: "Mayhem Berserker",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Mayhem"),
                this.getEngravingIdByName("Master's Tenacity"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Mass Increase")
            ],
        },
        {
            name: "Technique Berserker",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Berserker's Technique"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Super Charge"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        // Gunlancer
        {
            name: "Blue Warlord Gunlancer",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Combat Readiness"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Stabilized Status"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Red Warlord Gunlancer",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Lone Knight"),
                this.getEngravingIdByName("Super Charge"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Master Brawler"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Precise Dagger"),
                this.getEngravingIdByName("Combat Readiness"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        // Paladin
        {
            name: "Judgement Paladin",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Judgment"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Stabilized Status"),
                this.getEngravingIdByName("Keen Blunt Weapon")
            ],
        },
        {
            name: "Aura of Blessing Paladin",
            stats: [LostArkStat.Specialiazation, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Blessed Aura"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Expert"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Heavy Armor"),
                this.getEngravingIdByName("Drops of Ether"),
                this.getEngravingIdByName("Vital Point Hit"),
                this.getEngravingIdByName("Judgment")
            ],
        },
        // Striker
        {
            name: "Deathblow Striker",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Deathblow"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Esoteric Flurry Striker",
            stats: [LostArkStat.Swiftness, LostArkStat.Crit, LostArkStat.Specialiazation],
            engravings: [
                this.getEngravingIdByName("Esoteric Flurry"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Mass Increase"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        // Soulfist
        {
            name: "Robust Spirit Soulfist",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Robust Spirit"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Mass Increase")
            ],
        },
        {
            name: "Energy Overflow Soulfist",
            stats: [LostArkStat.Swiftness, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Energy Overflow"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Precise Dagger"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        // Scrapper
        {
            name: "Taijutsu Scrapper",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Ultimate Skill: Taijutsu"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Keen Blunt Weapon")
            ],
        },
        {
            name: "Shock Training Scrapper",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Shock Training"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Keen Blunt Weapon")
            ],
        },
        // Wardancer
        {
            name: "Esoteric Wardancer",
            stats: [LostArkStat.Swiftness, LostArkStat.Specialiazation],
            engravings: [
                this.getEngravingIdByName("Esoteric Skill Enhancement"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Mass Increase")
            ],
        },
        {
            name: "First Intention Wardancer",
            stats: [LostArkStat.Swiftness, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("First Intention"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Lightning Fury"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Mass Increase")
            ],
        },
        // Deadeye
        {
            name: "Enhanced Weapon Deadeye",
            stats: [LostArkStat.Specialiazation, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Enhanced Weapon"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Pistoleer Deadeye",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Pistoleer"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Precise Dagger"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Ether Predator"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        // Sharpshooter
        {
            name: "Death Strike Companion Sharpshooter",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Death Strike"),
                this.getEngravingIdByName("Loyal Companion"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        // Artillerist
        {
            name: "Firepower Enhancement Artillerist",
            stats: [LostArkStat.Swiftness, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Firepower Enhancement"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Barrage Enhancement Artillerist",
            stats: [LostArkStat.Specialiazation, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Barrage Enhancement"),
                this.getEngravingIdByName("Firepower Enhancement"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        // Gunslinger
        {
            name: "Peacemaker Gunslinger",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Peacemaker"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Time To Hunt Gunslinger",
            stats: [LostArkStat.Crit, LostArkStat.Specialiazation],
            engravings: [
                this.getEngravingIdByName("Time to Hunt"),
                this.getEngravingIdByName("Peacemaker"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        // Deathblade
        {
            name: "Remaining Energy Deathblade",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Remaining Energy"),
                this.getEngravingIdByName("Super Charge"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Surge Deathblade",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Surge"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Sight Focus"),
                this.getEngravingIdByName("Super Charge"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        // Shadowhunter
        {
            name: "Perfect Suppression Shadowhunter",
            stats: [LostArkStat.Swiftness, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Perfect Suppression"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Precise Dagger"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        {
            name: "Demonic Impulse Shadowhunter",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Demonic Impulse"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Grudge")
            ],
        },
        // Bard
        {
            name: "True Courage Bard",
            stats: [LostArkStat.Specialiazation, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("True Courage"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Heavy Armor"),
                this.getEngravingIdByName("Adrenaline") ,
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Desperate Salvation Bard",
            stats: [LostArkStat.Specialiazation, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Desperate Salvation"),
                this.getEngravingIdByName("Expert"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Heavy Armor"),
                this.getEngravingIdByName("Max MP Increase"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Drops of Ether")
            ],
        },
        // Sorceress
        {
            name: "Igniter Sorceress",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Igniter"),
                this.getEngravingIdByName("All-Out Attack"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Precise Dagger"),
                this.getEngravingIdByName("Adrenaline") ,
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Reflux Sorceress",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Reflux"),
                this.getEngravingIdByName("Precise Dagger"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Adrenaline") ,
                this.getEngravingIdByName("All-Out Attack"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        // Glaivier
        {
            name: "Pinnacle Glaivier",
            stats: [LostArkStat.Specialiazation, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Pinnacle"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Mass Increase"),
                this.getEngravingIdByName("Awakening"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ]
        },
        {
            name: "Control Glaivier",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Control"),
                this.getEngravingIdByName("Ambush Master"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Raid Captain") ,
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        // Destroyer
        {
            name: "Hammer of Rage Destroyer",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness, LostArkStat.Specialiazation],
            engravings: [
                this.getEngravingIdByName("Rage Hammer"),
                this.getEngravingIdByName("Super Charge"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Master Brawler"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ],
        },
        {
            name: "Gravity Training Destroyer",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Gravity Training"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Master Brawler"),
                this.getEngravingIdByName("Spirit Absorption"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Cursed Doll")
            ]
        },
        // Arcanist
        {
            name: "Empress's Grace Arcanist",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Empress's Grace"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Hit Master"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Adrenaline"),
            ]
        },
        {
            name: "Order of the Emperor Arcanist",
            stats: [LostArkStat.Swiftness, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Order of the Emperor"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Cursed Doll"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Awakening"),
            ]
        },
        // Machinist|Scouter
        {
            name: "Evolutionary Legacy Machinist",
            stats: [LostArkStat.Specialiazation, LostArkStat.Crit],
            engravings: [
                this.getEngravingIdByName("Evolutionary Legacy"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Barricade"),
                this.getEngravingIdByName("Raid Captain"),
            ]
        },
        {
            name: "Arthetinean Skill Machinist",
            stats: [LostArkStat.Crit, LostArkStat.Swiftness],
            engravings: [
                this.getEngravingIdByName("Arthetinean Skill"),
                this.getEngravingIdByName("Adrenaline"),
                this.getEngravingIdByName("Grudge"),
                this.getEngravingIdByName("Keen Blunt Weapon"),
                this.getEngravingIdByName("Raid Captain"),
                this.getEngravingIdByName("Mass Increase"),
            ]
        },
    ];

    constructor(private engravingService: EngravingsService){}

    private getEngravingIdByName(name: string): LostArkEngraving {
        return this.engravingService.getEngravingIdByName(name) || {
            name: '',
            id: 0,
            type: undefined,
            nodes: ['', '', '']
        };
    }
}
