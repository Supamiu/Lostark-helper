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
    entryId: "T3.1.0"
  },
  {
    name: "Oreha Preveza (Hard)",
    goldReward: 1200,
    taskName: "Oreha Preveza",
    chestPrice: 500,
    completionId: "T3.1",
    entryId: "T3.1.1"
  },

  // T3 Abyss Raid
  {
    name: "Argos P1",
    goldReward: 800,
    taskName: "Argos",
    chestPrice: 300,
    completionId: "T3.1",
    chestId: "Argos"
  },
  {
    name: "Argos P2",
    goldReward: 300,
    taskName: "Argos",
    chestPrice: 500,
    completionId: "T3.1",
    chestId: "Argos",
    overrideMinIlvl: 1385
  },
  {
    name: "Argos P3",
    goldReward: 1000,
    taskName: "Argos",
    chestPrice: 500,
    completionId: "T3.1",
    chestId: "Argos",
    overrideMinIlvl: 1400
  }
];
