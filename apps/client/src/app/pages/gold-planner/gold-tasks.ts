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
    goldReward: 600,
    taskName: "Aira's Oculus",
    chestPrice: 200,
    completionId: "T3.1",
    entryId: "T3.1.0"
  },
  {
    name: "Oreha Preveza (Normal)",
    goldReward: 900,
    taskName: "Oreha Preveza",
    chestPrice: 400,
    completionId: "T3.1",
    entryId: "T3.1.1"
  },
  {
    name: "Aira's Oculus (Hard)",
    goldReward: 900,
    taskName: "Aira's Oculus",
    chestPrice: 300,
    completionId: "T3.1",
    entryId: "T3.1.0",
    overrideMinIlvl: 1370
  },
  {
    name: "Oreha Preveza (Hard)",
    goldReward: 1200,
    taskName: "Oreha Preveza",
    chestPrice: 500,
    completionId: "T3.1",
    entryId: "T3.1.1",
    overrideMinIlvl: 1370
  },

  // T3 Abyss Raid
  {
    name: "Argos P1",
    goldReward: 800,
    taskName: "Argos",
    chestPrice: 300,
    completionId: "T3.1",
    overrideMaxIlvl: 1475,
    chestId: "Argos1"
  },
  {
    name: "Argos P2",
    goldReward: 900,
    taskName: "Argos",
    chestPrice: 300,
    completionId: "T3.1",
    chestId: "Argos2",
    overrideMaxIlvl: 1475,
  },
  {
    name: "Argos P3",
    goldReward: 1000,
    taskName: "Argos",
    chestPrice: 500,
    completionId: "T3.1",
    chestId: "Argos3",
    overrideMaxIlvl: 1475,
  },

  // T3 Legion Raid
  {
    name: "Valtan Normal Gate 1",
    goldReward: 800,
    taskName: "Valtan",
    chestPrice: 500,
    completionId: "T3.L1.1",
    chestId: "Valtan1",
    overrideMaxIlvl: 1445
  },
  {
    name: "Valtan Normal Gate 2",
    goldReward: 2500,
    taskName: "Valtan",
    chestPrice: 800,
    completionId: "T3.L1.2",
    chestId: "Valtan2",
    overrideMaxIlvl: 1445
  },
  {
    name: "Valtan Hard Gate 1",
    goldReward: 1000,
    taskName: "Valtan",
    chestPrice: 900,
    completionId: "T3.L1.1",
    chestId: "Valtan1",
    overrideMinIlvl: 1445
  },
  {
    name: "Valtan Hard Gate 2",
    goldReward: 3500,
    taskName: "Valtan",
    chestPrice: 1200,
    completionId: "T3.L1.2",
    chestId: "Valtan2",
    overrideMinIlvl: 1445
  },
  {
    name: "Vykas Normal Gate 1",
    goldReward: 500,
    taskName: "Vykas",
    chestPrice: 400,
    completionId: "T3.L2.1",
    chestId: "Vykas1",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Normal Gate 2",
    goldReward: 600 ,
    taskName: "Vykas",
    chestPrice: 600,
    completionId: "T3.L2.2",
    chestId: "Vykas2",
    overrideMaxIlvl: 1460
  },
  {
    name: "Vykas Normal Gate 3",
    goldReward: 2200,
    taskName: "Vykas",
    chestPrice: 800,
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
    chestId: "Kakul1"
  },
  {
    name: "Kakul-Saydon Gate 2",
    goldReward: 1000,
    taskName: "Kakul-Saydon",
    chestPrice: 1000,
    completionId: "T3.L3.2",
    chestId: "Kakul2"
  },
  {
    name: "Kakul-Saydon Gate 3",
    goldReward: 2500,
    taskName: "Kakul-Saydon",
    chestPrice: 1300,
    completionId: "T3.L3.3",
    chestId: "Kakul3"
  }
];
