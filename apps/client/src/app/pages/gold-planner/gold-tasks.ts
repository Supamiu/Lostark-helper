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
    chestPrice: 600,
    completionId: "T3.L1.1",
    chestId: "Valtan1",
    overrideMinIlvl: 1445
  },
  {
    name: "Valtan Hard Gate 2",
    goldReward: 2300,
    taskName: "Valtan",
    chestPrice: 900,
    completionId: "T3.L1.2",
    chestId: "Valtan2",
    overrideMinIlvl: 1445
  },
  {
    name: "Vykas Normal Gate 1",
    goldReward: 400,
    taskName: "Vykas",
    chestPrice: 200,
    completionId: "T3.L2.1",
    chestId: "Vykas1",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Normal Gate 2",
    goldReward: 500 ,
    taskName: "Vykas",
    chestPrice: 250,
    completionId: "T3.L2.2",
    chestId: "Vykas2",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Normal Gate 3",
    goldReward: 700,
    taskName: "Vykas",
    chestPrice: 400,
    completionId: "T3.L2.3",
    chestId: "Vykas3",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Hard Gate 1",
    goldReward: 1000,
    taskName: "Vykas",
    chestPrice: 700,
    completionId: "T3.L2.1",
    chestId: "Vykas1",
    overrideMinIlvl: 1460
  },
  {
    name: "Vykas Hard Gate 2",
    goldReward: 1000,
    taskName: "Vykas",
    chestPrice: 900,
    completionId: "T3.L2.2",
    chestId: "Vykas2",
    overrideMinIlvl: 1460
  },
  {
    name: "Vykas Hard Gate 3",
    goldReward: 2500,
    taskName: "Vykas",
    chestPrice: 1200,
    completionId: "T3.L2.3",
    chestId: "Vykas3",
    overrideMinIlvl: 1460
  },
  {
    name: "Kakul-Saydon Gate 1",
    goldReward: 1000,
    taskName: "Kakul-Saydon",
    chestPrice: 800,
    completionId: "T3.L3.1",
    chestId: "Kakul1",
    overrideMinIlvl: 1475
  },
  {
    name: "Kakul-Saydon Gate 2",
    goldReward: 1000,
    taskName: "Kakul-Saydon",
    chestPrice: 1000,
    completionId: "T3.L3.2",
    chestId: "Kakul2",
    overrideMinIlvl: 1475
  },
  {
    name: "Kakul-Saydon Gate 3",
    goldReward: 2500,
    taskName: "Kakul-Saydon",
    chestPrice: 1300,
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
    goldReward: 700,
    taskName: "Brelshaza Gate 3-4",
    chestPrice: 700,
    completionId: "T3.L4.3",
    chestId: "BrelshazaN3",
    overrideMinIlvl: 1500,
    overrideMaxIlvl: 1550
  },
  {
    name: "Brelshaza Normal Gate 4",
    goldReward: 800,
    taskName: "Brelshaza Gate 3-4",
    chestPrice: 800,
    completionId: "T3.L4.4",
    chestId: "BrelshazaN4",
    overrideMinIlvl: 1500,
    overrideMaxIlvl: 1550
  },
  {
    name: "Brelshaza Normal Gate 5",
    goldReward: 1000,
    taskName: "Brelshaza Gate 5-6",
    chestPrice: 900,
    completionId: "T3.L4.5",
    chestId: "BrelshazaN5",
    overrideMinIlvl: 1520,
    overrideMaxIlvl: 1560
  },
  {
    name: "Brelshaza Normal Gate 6",
    goldReward: 1500,
    taskName: "Brelshaza Gate 5-6",
    chestPrice: 1100,
    completionId: "T3.L4.6",
    chestId: "BrelshazaN6",
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
    chestPrice: 800,
    completionId: "T3.L5.2",
    chestId: "BrelshazaH2",
    overrideMinIlvl: 1540
  },
  {
    name: "Brelshaza Hard Gate 3",
    goldReward: 900,
    taskName: "Brelshaza Gate 3-4",
    chestPrice: 900,
    completionId: "T3.L5.3",
    chestId: "BrelshazaH3",
    overrideMinIlvl: 1550
  },
  {
    name: "Brelshaza Hard Gate 4",
    goldReward: 1100,
    taskName: "Brelshaza Gate 3-4",
    chestPrice: 1100,
    completionId: "T3.L5.4",
    chestId: "BrelshazaH4",
    overrideMinIlvl: 1550
  },
  {
    name: "Brelshaza Hard Gate 5",
    goldReward: 1200,
    taskName: "Brelshaza Gate 5-6",
    chestPrice: 1100,
    completionId: "T3.L5.5",
    chestId: "BrelshazaH5",
    overrideMinIlvl: 1560
  },
  {
    name: "Brelshaza Hard Gate 6",
    goldReward: 1800,
    taskName: "Brelshaza Gate 5-6",
    chestPrice: 1400,
    completionId: "T3.L5.6",
    chestId: "BrelshazaH6",
    overrideMinIlvl: 1560
  },
  {
    name: "Kayangel Normal Gate 1",
    goldReward: 800,
    taskName: "Kayangel",
    chestPrice: 600,
    completionId: "T3.L6.1",
    chestId: "KayangelN1",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Normal Gate 2",
    goldReward: 800,
    taskName: "Kayangel",
    chestPrice: 600,
    completionId: "T3.L6.2",
    chestId: "KayangelN2",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Normal Gate 3",
    goldReward: 1200,
    taskName: "Kayangel",
    chestPrice: 800,
    completionId: "T3.L6.3",
    chestId: "KayangelN3",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Normal Gate 4",
    goldReward: 1700,
    taskName: "Kayangel",
    chestPrice: 1000,
    completionId: "T3.L6.4",
    chestId: "KayangelN4",
    overrideMinIlvl: 1540,
    overrideMaxIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 1",
    goldReward: 1000,
    taskName: "Kayangel",
    chestPrice: 700,
    completionId: "T3.L7.1",
    chestId: "KayangelH1",
    overrideMinIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 2",
    goldReward: 1000,
    taskName: "Kayangel",
    chestPrice: 700,
    completionId: "T3.L7.2",
    chestId: "KayangelH2",
    overrideMinIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 3",
    goldReward: 1500,
    taskName: "Kayangel",
    chestPrice: 900,
    completionId: "T3.L7.3",
    chestId: "KayangelH3",
    overrideMinIlvl: 1580
  },
  {
    name: "Kayangel Hard Gate 4",
    goldReward: 2000,
    taskName: "Kayangel",
    chestPrice: 1100,
    completionId: "T3.L7.4",
    chestId: "KayangelH4",
    overrideMinIlvl: 1580
  }
    
];
