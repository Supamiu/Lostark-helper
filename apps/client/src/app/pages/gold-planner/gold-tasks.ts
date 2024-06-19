import { GoldTask } from "./gold-task";

export const goldTasks: GoldTask[] = [

  // T1 Abyss
  {
    name: "Demon Beast Canyon",
    goldReward: 80,
    taskName: "Demon Beast Canyon",
    chestPrice: 30,
    completionId: "T1.1"
  },
  {
    name: "Necromancer's Origin",
    goldReward: 80,
    taskName: "Necromancer's Origin",
    chestPrice: 30,
    completionId: "T1.1"
  },
  {
    name: "Hall of the Twisted Warlord",
    goldReward: 80,
    taskName: "Hall of the Twisted Warlord",
    chestPrice: 30,
    completionId: "T1.2"
  },
  {
    name: "Hildebrandt Palace",
    goldReward: 80,
    taskName: "Hildebrandt Palace",
    chestPrice: 30,
    completionId: "T1.2"
  },

  // T2 Abyss
  {
    name: "Road of Lament",
    goldReward: 100,
    taskName: "Road of Lament",
    chestPrice: 40,
    completionId: "T2.1"
  },
  {
    name: "Forge of Fallen Pride",
    goldReward: 100,
    taskName: "Forge of Fallen Pride",
    chestPrice: 40,
    completionId: "T2.1"
  },
  {
    name: "Sea of Indolence",
    goldReward: 100,
    taskName: "Sea of Indolence",
    chestPrice: 40,
    completionId: "T2.2"
  },
  {
    name: "Tranquil Karkosa",
    goldReward: 100,
    taskName: "Tranquil Karkosa",
    chestPrice: 40,
    completionId: "T2.2"
  },
  {
    name: "Alaric's Sanctuary",
    goldReward: 100,
    taskName: "Alaric's Sanctuary",
    chestPrice: 40,
    completionId: "T2.2"
  },

  // T3 Abyss
  {
    name: "Aira's Oculus (Normal)",
    goldReward: 200,
    taskName: "Aira's Oculus",
    chestPrice: 100,
    completionId: "T3.1",
    entryId: "T3.1.0"
  },
  {
    name: "Oreha Preveza (Normal)",
    goldReward: 300,
    taskName: "Oreha Preveza",
    chestPrice: 150,
    completionId: "T3.1",
    entryId: "T3.1.1"
  },
  {
    name: "Aira's Oculus (Hard)",
    goldReward: 300,
    taskName: "Aira's Oculus",
    chestPrice: 100,
    completionId: "T3.1",
    entryId: "T3.1.0",
    overrideMinIlvl: 1370
  },
  {
    name: "Oreha Preveza (Hard)",
    goldReward: 400,
    taskName: "Oreha Preveza",
    chestPrice: 150,
    completionId: "T3.1",
    entryId: "T3.1.1",
    overrideMinIlvl: 1370
  },

  // T3 Abyss Raid
  {
    name: "Argos Gate 1",
    goldReward: 300,
    taskName: "Argos",
    chestPrice: 100,
    completionId: "T3.L1.1",
    overrideMaxIlvl: 1475,
    chestId: "Argos1"
  },
  {
    name: "Argos Gate 2",
    goldReward: 300,
    taskName: "Argos",
    chestPrice: 150,
    completionId: "T3.L1.2",
    chestId: "Argos2",
    overrideMaxIlvl: 1475,
  },
  {
    name: "Argos Gate 3",
    goldReward: 400,
    taskName: "Argos",
    chestPrice: 150,
    completionId: "T3.L1.3",
    chestId: "Argos3",
    overrideMaxIlvl: 1475,
  },

  // T3 Legion Raid
  {
    name: "Valtan Normal Gate 1",
    goldReward: 500,
    taskName: "Valtan",
    chestPrice: 300,
    completionId: "T3.L1.1",
    chestId: "Valtan1",
    overrideMaxIlvl: 1445
  },
  {
    name: "Valtan Normal Gate 2",
    goldReward: 700,
    taskName: "Valtan",
    chestPrice: 400,
    completionId: "T3.L1.2",
    chestId: "Valtan2",
    overrideMaxIlvl: 1445
  },
  {
    name: "Valtan Hard Gate 1",
    goldReward: 700,
    taskName: "Valtan",
    chestPrice: 450,
    completionId: "T3.L1.1",
    chestId: "Valtan1",
    overrideMinIlvl: 1445
  },
  {
    name: "Valtan Hard Gate 2",
    goldReward: 1100,
    taskName: "Valtan",
    chestPrice: 600,
    completionId: "T3.L1.2",
    chestId: "Valtan2",
    overrideMinIlvl: 1445
  },
  {
    name: "Vykas Normal Gate 1",
    goldReward: 600,
    taskName: "Vykas",
    chestPrice: 300,
    completionId: "T3.L2.1",
    chestId: "Vykas1",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Normal Gate 2",
    goldReward: 1000,
    taskName: "Vykas",
    chestPrice: 450,
    completionId: "T3.L2.2",
    chestId: "Vykas2",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Hard Gate 1",
    goldReward: 900,
    taskName: "Vykas",
    chestPrice: 500,
    completionId: "T3.L2.1",
    chestId: "Vykas1",
    overrideMinIlvl: 1460
  },
  {
    name: "Vykas Hard Gate 2",
    goldReward: 1500,
    taskName: "Vykas",
    chestPrice: 650,
    completionId: "T3.L2.2",
    chestId: "Vykas2",
    overrideMinIlvl: 1460
  },
  {
    name: "Kakul-Saydon Gate 1",
    goldReward: 600,
    taskName: "Kakul-Saydon",
    chestPrice: 300,
    completionId: "T3.L3.1",
    chestId: "Kakul1",
    overrideMinIlvl: 1475
  },
  {
    name: "Kakul-Saydon Gate 2",
    goldReward: 900,
    taskName: "Kakul-Saydon",
    chestPrice: 500,
    completionId: "T3.L3.2",
    chestId: "Kakul2",
    overrideMinIlvl: 1475
  },
  {
    name: "Kakul-Saydon Gate 3",
    goldReward: 1500,
    taskName: "Kakul-Saydon",
    chestPrice: 700,
    completionId: "T3.L3.3",
    chestId: "Kakul3",
    overrideMinIlvl: 1475
  },
  {
    name: "Brelshaza Normal Gate 1",
    goldReward: 2000,
    taskName: "Brelshaza Gate 1-2",
    chestPrice: 400,
    completionId: "T3.L4.1",
    chestId: "BrelshazaN1",
    overrideMinIlvl: 1490,
    overrideMaxIlvl: 1540
  },
  {
    name: "Brelshaza Normal Gate 2",
    goldReward: 2500,
    taskName: "Brelshaza Gate 1-2",
    chestPrice: 600,
    completionId: "T3.L4.2",
    chestId: "BrelshazaN2",
    overrideMinIlvl: 1490,
    overrideMaxIlvl: 1540
  },
  {
    name: "Brelshaza Normal Gate 3",
    goldReward: 1500,
    taskName: "Brelshaza Gate 3",
    chestPrice: 800,
    completionId: "T3.L4.3",
    chestId: "BrelshazaN3",
    overrideMinIlvl: 1500,
    overrideMaxIlvl: 1550
  },
  {
    name: "Brelshaza Normal Gate 4",
    goldReward: 2500,
    taskName: "Brelshaza Gate 4",
    chestPrice: 1500,
    completionId: "T3.L4.4",
    chestId: "BrelshazaN4",
    overrideMinIlvl: 1520,
    overrideMaxIlvl: 1560
  },
  {
    name: "Brelshaza Hard Gate 1",
    goldReward: 2500,
    taskName: "Brelshaza Gate 1-2",
    chestPrice: 700,
    completionId: "T3.L5.1",
    chestId: "BrelshazaH1",
    overrideMinIlvl: 1540
    },
  {
    name: "Brelshaza Hard Gate 2",
    goldReward: 3000,
    taskName: "Brelshaza Gate 1-2",
    chestPrice: 900,
    completionId: "T3.L5.2",
    chestId: "BrelshazaH2",
    overrideMinIlvl: 1540
  },
  {
    name: "Brelshaza Hard Gate 3",
    goldReward: 2000,
    taskName: "Brelshaza Gate 3",
    chestPrice: 1100,
    completionId: "T3.L5.3",
    chestId: "BrelshazaH3",
    overrideMinIlvl: 1550
  },
  {
    name: "Brelshaza Hard Gate 4",
    goldReward: 3000,
    taskName: "Brelshaza Gate 4",
    chestPrice: 1800,
    completionId: "T3.L5.4",
    chestId: "BrelshazaH4",
    overrideMinIlvl: 1560
  },
  {
    name: "Kayangel Normal Gate 1",
    goldReward: 1000,
    taskName: "Kayangel",
    chestPrice: 600,
    completionId: "T3.L6.1",
    chestId: "KayangelN1",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Normal Gate 2",
    goldReward: 1500,
    taskName: "Kayangel",
    chestPrice: 800,
    completionId: "T3.L6.2",
    chestId: "KayangelN2",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Normal Gate 3",
    goldReward: 2000,
    taskName: "Kayangel",
    chestPrice: 1000,
    completionId: "T3.L6.3",
    chestId: "KayangelN3",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 1",
    goldReward: 1500,
    taskName: "Kayangel",
    chestPrice: 700,
    completionId: "T3.L7.1",
    chestId: "KayangelH1",
    overrideMinIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 2",
    goldReward: 2000,
    taskName: "Kayangel",
    chestPrice: 900,
    completionId: "T3.L7.2",
    chestId: "KayangelH2",
    overrideMinIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 3",
    goldReward: 3000,
    taskName: "Kayangel",
    chestPrice: 1100,
    completionId: "T3.L7.3",
    chestId: "KayangelH3",
    overrideMinIlvl: 1580
  },
  {
    name: "Akkan Normal Gate 1",
    goldReward: 1500,
    taskName: "Akkan",
    chestPrice: 900,
    completionId: "T3.L8.1",
    chestId: "AkkanN1",
    overrideMinIlvl: 1580,
    overrideMaxIlvl: 1600
  },
  {
    name: "Akkan Normal Gate 2",
    goldReward: 2000,
    taskName: "Akkan",
    chestPrice: 1100,
    completionId: "T3.L8.2",
    chestId: "AkkanN2",
    overrideMinIlvl: 1580,
    overrideMaxIlvl: 1600
  },
  {
    name: "Akkan Normal Gate 3",
    goldReward: 4000,
    taskName: "Akkan",
    chestPrice: 1500,
    completionId: "T3.L8.3",
    chestId: "AkkanN3",
    overrideMinIlvl: 1580,
    overrideMaxIlvl: 1600
  },
  {
  name: "Akkan Hard Gate 1",
  goldReward: 1750,
  taskName: "Akkan",
  chestPrice: 1200,
  completionId: "T3.L9.1",
  chestId: "AkkanH1",
  overrideMinIlvl: 1600
},
{
  name: "Akkan Hard Gate 2",
  goldReward: 2500,
  taskName: "Akkan",
  chestPrice: 1400,
  completionId: "T3.L9.2",
  chestId: "AkkanH2",
  overrideMinIlvl: 1600
},
{
  name: "Akkan Hard Gate 3",
  goldReward: 5750,
  taskName: "Akkan",
  chestPrice: 1900,
  completionId: "T3.L9.3",
  chestId: "AkkanH3",
  overrideMinIlvl: 1600
},
{
  name: "Ivory Tower Normal Gate 1",
  goldReward: 1500,
  taskName: "Ivory Tower",
  chestPrice: 700,
  completionId: "T3.L10.1",
  chestId: "IvoryTowerN1",
  overrideMinIlvl: 1600,
  overrideMaxIlvl: 1620
},
{
  name: "Ivory Tower Normal Gate 2",
  goldReward: 1750,
  taskName: "Ivory Tower",
  chestPrice: 800,
  completionId: "T3.L10.2",
  chestId: "IvoryTowerN2",
  overrideMinIlvl: 1600,
  overrideMaxIlvl: 1620
},
{
  name: "Ivory Tower Normal Gate 3",
  goldReward: 2500,
  taskName: "Ivory Tower",
  chestPrice: 900,
  completionId: "T3.L10.3",
  chestId: "IvoryTowerN3",
  overrideMinIlvl: 1600,
  overrideMaxIlvl: 1620
},
{
  name: "Ivory Tower Normal Gate 4",
  goldReward: 3250,
  taskName: "Ivory Tower",
  chestPrice: 1100,
  completionId: "T3.L10.4",
  chestId: "IvoryTowerN4",
  overrideMinIlvl: 1600,
  overrideMaxIlvl: 1620
},
{
  name: "Ivory Tower Hard Gate 1",
  goldReward: 2000,
  taskName: "Ivory Tower",
  chestPrice: 1000,
  completionId: "T3.L11.1",
  chestId: "IvoryTowerH1",
  overrideMinIlvl: 1620
},
{
  name: "Ivory Tower Hard Gate 2",
  goldReward: 2500,
  taskName: "Ivory Tower",
  chestPrice: 1000,
  completionId: "T3.L11.2",
  chestId: "IvoryTowerH2",
  overrideMinIlvl: 1620
},
{
  name: "Ivory Tower Hard Gate 3",
  goldReward: 4000,
  taskName: "Ivory Tower",
  chestPrice: 1500,
  completionId: "T3.L11.3",
  chestId: "IvoryTowerH3",
  overrideMinIlvl: 1620
},
{
  name: "Ivory Tower Hard Gate 4",
  goldReward: 6000,
  taskName: "Ivory Tower",
  chestPrice: 2000,
  completionId: "T3.L11.4",
  chestId: "IvoryTowerH4",
  overrideMinIlvl: 1620
},
{
  name: "Thaemine Normal Gate 1",
  goldReward: 3500,
  taskName: "Thaemine",
  chestPrice: 1500,
  completionId: "T3.L12.1",
  chestId: "ThaemineN1",
  overrideMinIlvl: 1610,
  overrideMaxIlvl: 1630
},
{
  name: "Thaemine Normal Gate 2",
  goldReward: 4000,
  taskName: "Thaemine",
  chestPrice: 1800,
  completionId: "T3.L12.2",
  chestId: "ThaemineN2",
  overrideMinIlvl: 1610,
  overrideMaxIlvl: 1630
},
{
  name: "Thaemine Normal Gate 3",
  goldReward: 5500,
  taskName: "Thaemine",
  chestPrice: 2500,
  completionId: "T3.L12.3",
  chestId: "ThaemineN3",
  overrideMinIlvl: 1610,
  overrideMaxIlvl: 1630
},
{
  name: "Thaemine Hard Gate 1",
  goldReward: 5000,
  taskName: "Thaemine",
  chestPrice: 2000,
  completionId: "T3.L13.1",
  chestId: "ThaemineH1",
  overrideMinIlvl: 1630
},
{
  name: "Thaemine Hard Gate 2",
  goldReward: 6000,
  taskName: "Thaemine",
  chestPrice: 2400,
  completionId: "T3.L13.2",
  chestId: "ThaemineH2",
  overrideMinIlvl: 1630
},
{
  name: "Thaemine Hard Gate 3",
  goldReward: 9000,
  taskName: "Thaemine",
  chestPrice: 2800,
  completionId: "T3.L13.3",
  chestId: "ThaemineH3",
  overrideMinIlvl: 1630
},
{
  name: "Thaemine Hard Gate 4",
  goldReward: 21000,
  taskName: "Thaemine G4",
  chestPrice: 3600,
  completionId: "T3.L13.4",
  chestId: "ThaemineH4",
  overrideMinIlvl: 1630
},
{
  name: "Echidna Normal Gate 1",
  goldReward: 5000,
  taskName: "Echidna",
  chestPrice: 2200,
  completionId: "T3.L14.1",
  chestId: "EchidnaN1",
  overrideMinIlvl: 1620,
  overrideMaxIlvl: 1630
},
{
  name: "Echidna Normal Gate 2",
  goldReward: 9500,
  taskName: "Echidna",
  chestPrice: 3400,
  completionId: "T3.L14.2",
  chestId: "EchidnaN2",
  overrideMinIlvl: 1620,
  overrideMaxIlvl: 1630
},
{
  name: "Echidna Hard Gate 1",
  goldReward: 6000,
  taskName: "Echidna",
  chestPrice: 2800,
  completionId: "T3.L15.1",
  chestId: "EchidnaH1",
  overrideMinIlvl: 1630
},
{
  name: "Echidna Hard Gate 2",
  goldReward: 12500,
  taskName: "Echidna",
  chestPrice: 4100,
  completionId: "T3.L15.2",
  chestId: "EchidnaH2",
  overrideMinIlvl: 1630
}
];
