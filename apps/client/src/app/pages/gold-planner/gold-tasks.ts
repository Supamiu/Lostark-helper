import { GoldTask, resetType } from "./gold-task";

export const goldTasks: GoldTask[] = [

  // T2 Abyss Dungeon
  {
    name: "Demon Beast Canyon",
    taskName: "Demon Beast Canyon",
    gates: [
      {
        name: "Demon Beast Canyon Gate 1",
        completionId: "T2.A1.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 80,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 805
          }
        ]
      }
    ]
  },
  {
    name: "Necromancer's Origin",
    taskName: "Necromancer's Origin",
    gates: [
      {
        name: "Necromancer's Origin Gate 1",
        completionId: "T2.A1.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 80,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 805
          }
        ]
      }
    ]
  },
  {
    name: "Hall of the Twisted Warlord",
    taskName: "Hall of the Twisted Warlord",
    gates: [
      {
        name: "Hall of the Twisted Warlord Gate 1",
        completionId: "T2.A2.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 80,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 960
          }
        ]
      }
    ]
  },
  {
    name: "Hildebrandt Palace",
    taskName: "Hildebrandt Palace",
    gates: [
      {
        name: "Hildebrandt Palace Gate 1",
        completionId: "T2.A2.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 80,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 960
          }
        ]
      }
    ]
  },
  {
    name: "Road of Lament",
    taskName: "Road of Lament",
    gates: [
      {
        name: "Road of Lament Gate 1",
        completionId: "T2.A3.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 1340
          }
        ]
      }
    ]
  },
  {
    name: "Forge of Fallen Pride",
    taskName: "Forge of Fallen Pride",
    gates: [
      {
        name: "Forge of Fallen Pride Gate 1",
        completionId: "T2.A3.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 1340
          }
        ]
      }
    ]
  },
  {
    name: "Sea of Indolence",
    taskName: "Sea of Indolence",
    gates: [
      {
        name: "Sea of Indolence Gate 1",
        completionId: "T2.A4.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 1370
          }
        ]
      }
    ]
  },
  {
    name: "Tranquil Karkosa",
    taskName: "Tranquil Karkosa",
    gates: [
      {
        name: "Tranquil Karkosa Gate 1",
        completionId: "T2.A4.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 1370
          }
        ]
      }
    ]
  },
  {
    name: "Alaric's Sanctuary",
    taskName: "Alaric's Sanctuary",
    gates: [
      {
        name: "Alaric's Sanctuary Gate 1",
        completionId: "T2.A4.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 0,
            chestPrice: 0,
            HMThreashold: Infinity,
            goldILvlLimit: 1370
          }
        ]
      }
    ]
  },

  // T3 Abyss Dungeon - ilvl below Argos
  {
    name: "Aira's Oculus",
    taskName: "Aira's Oculus",
    gates: [
      {
        name: "Aira's Oculus Gate 1",
        completionId: "T3.A1.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 0,
            chestPrice: 100,
            HMThreashold: 1370,
            goldILvlLimit: 1415
          },
          {
            name: "HM",
            unboundGoldReward: 300,
            boundGoldReward: 0,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1415
          }
        ]
      }
    ]
  },
  {
    name: "Oreha Preveza",
    taskName: "Oreha Preveza",
    gates: [
      {
        name: "Oreha Preveza Gate 1",
        completionId: "T3.A1.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 300,
            boundGoldReward: 0,
            chestPrice: 150,
            HMThreashold: 1370,
            goldILvlLimit: 1415
          },
          {
            name: "HM",
            unboundGoldReward: 400,
            boundGoldReward: 0,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1415
          }
        ]
      }
    ]
  },

  // T3 Abyss Raid - Argos
  {
    name: "Argos",
    taskName: "Argos",
    gates: [
      {
        name: "Argos Gate 1",
        completionId: "T3.AR1.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 150,
            boundGoldReward: 0,
            chestPrice: 50,
            HMThreashold: Infinity,
            goldILvlLimit: 1475
          }
        ]
      },
      {
        name: "Argos Gate 2",
        completionId: "T3.AR1.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 150,
            boundGoldReward: 0,
            chestPrice: 75,
            HMThreashold: Infinity,
            goldILvlLimit: 1475
          }
        ]
      },
      {
        name: "Argos Gate 3",
        completionId: "T3.AR1.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 0,
            chestPrice: 75,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      }
    ]
  },

  // T3 Legion Raid
  {
    name: "Valtan",
    taskName: "Valtan",
    gates: [
      {
        name: "Valtan Gate 1",
        completionId: "T3.L12.G1",
        chestId: "Valtan1",
        modes: [
          {
            name: "NM",
            HMThreashold: 1445,
            goldILvlLimit: Infinity,
            unboundGoldReward: 100,
            boundGoldReward: 400,
            chestPrice: 300,
          },
          {
            name: "HM",
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
            unboundGoldReward: 140,
            boundGoldReward: 560,
            chestPrice: 450,
          },
          {
            name: "Solo",
            HMThreashold: Infinity,
            goldILvlLimit: 1600,
            unboundGoldReward: 0,
            boundGoldReward: 240,
            chestPrice: 75,
          }
        ]
      },
      {
        name: "Valtan Gate 2",
        completionId: "T3.L1.G2",
        chestId: "Valtan2",
        modes: [
          {
            name: "NM",
            HMThreashold: 1445,
            goldILvlLimit: Infinity,
            unboundGoldReward: 140,
            boundGoldReward: 560,
            chestPrice: 400,
          },
          {
            name: "HM",
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
            unboundGoldReward: 220,
            boundGoldReward: 880,
            chestPrice: 600,
          },
          {
            name: "Solo",
            HMThreashold: Infinity,
            goldILvlLimit: 1600,
            unboundGoldReward: 0,
            boundGoldReward: 360,
            chestPrice: 100,
          }
        ]
      }
    ]
  },
  {
    name: "Vykas",
    taskName: "Vykas",
    gates: [
      {
        name: "Vykas Gate 1",
        completionId: "T3.L2.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 120,
            boundGoldReward: 480,
            chestPrice: 300,
            HMThreashold: 1460,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 180,
            boundGoldReward: 720,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 280,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1600
          }
        ]
      },
      {
        name: "Vykas Gate 2",
        completionId: "T3.L2.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 800,
            chestPrice: 450,
            HMThreashold: 1460,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 300,
            boundGoldReward: 1200,
            chestPrice: 650,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 520,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1600
          }
        ]
      }
    ]
  },
  {
    name: "Kakul-Saydon",
    taskName: "Kakul-Saydon",
    gates: [
      {
        name: "Kakul-Saydon Gate 1",
        completionId: "T3.L3.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 120,
            boundGoldReward: 480,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 320,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1610
          }
        ]
      },
      {
        name: "Kakul-Saydon Gate 2",
        completionId: "T3.L3.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 180,
            boundGoldReward: 720,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 480,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1610
          }
        ]
      },
      {
        name: "Kakul-Saydon Gate 3",
        completionId: "T3.L3.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 300,
            boundGoldReward: 1200,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 800,
            chestPrice: 200,
            HMThreashold: Infinity,
            goldILvlLimit: 1610
          }
        ]
      },
    ]
  },
  {
    name: "Brelshaza",
    taskName: "Brelshaza Gate 1-2",
    gates: [
      {
        name: "Brelshaza Gate 1",
        completionId: "T3.L4.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 800,
            chestPrice: 250,
            HMThreashold: 1540,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 240,
            boundGoldReward: 960,
            chestPrice: 400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 800,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          }
        ]
      },
      {
        name: "Brelshaza Gate 2",
        completionId: "T3.L4.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 800,
            chestPrice: 300,
            HMThreashold: 1540,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 240,
            boundGoldReward: 960,
            chestPrice: 400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 800,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          }
        ]
      },
      {
        name: "Brelshaza Gate 3",
        taskName: "Brelshaza Gate 3",
        completionId: "T3.L5.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 800,
            chestPrice: 400,
            HMThreashold: 1550,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 240,
            boundGoldReward: 960,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 800,
            chestPrice: 200,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          }
        ]
      },
      {
        name: "Brelshaza Gate 4",
        taskName: "Brelshaza Gate 4",
        completionId: "T3.L6.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 320,
            boundGoldReward: 1280,
            chestPrice: 600,
            HMThreashold: 1560,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 400,
            boundGoldReward: 1600,
            chestPrice: 800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1280,
            chestPrice: 400,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          }
        ],
        reset: resetType.biWeekly
      },
    ]
  },

  // Abyss Raid - Kayangel
  {
    name: "Kayangel",
    taskName: "Kayangel",
    gates: [
      {
        name: "Kayangel Gate 1",
        completionId: "T3.AR2.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 160,
            boundGoldReward: 640,
            chestPrice: 300,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 200,
            boundGoldReward: 800,
            chestPrice: 350,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 640,
            chestPrice: 200,
            HMThreashold: Infinity,
            goldILvlLimit: 1640
          }
        ]
      },
      {
        name: "Kayangel Gate 2",
        completionId: "T3.AR2.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 240,
            boundGoldReward: 960,
            chestPrice: 400,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 320,
            boundGoldReward: 1280,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 960,
            chestPrice: 225,
            HMThreashold: Infinity,
            goldILvlLimit: 1640
          }
        ]
      },
      {
        name: "Kayangel Gate 3",
        completionId: "T3.AR2.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 320,
            boundGoldReward: 1280,
            chestPrice: 500,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 440,
            boundGoldReward: 1760,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1280,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: 1640
          }
        ]
      }
    ]
  },

  // Legion Raid - Akkan
  {
    name: "Akkan",
    taskName: "Akkan",
    gates: [
      {
        name: "Akkan Gate 1",
        completionId: "T3.L7.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 800,
            chestPrice: 450,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 300,
            boundGoldReward: 1200,
            chestPrice: 600,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 800,
            chestPrice: 225,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Akkan Gate 2",
        completionId: "T3.L7.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 360,
            boundGoldReward: 1440,
            chestPrice: 550,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 500,
            boundGoldReward: 2000,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1440,
            chestPrice: 275,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Akkan Gate 3",
        completionId: "T3.L7.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 520,
            boundGoldReward: 2080,
            chestPrice: 750,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 700,
            boundGoldReward: 2800,
            chestPrice: 950,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2080,
            chestPrice: 375,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
    ]
  },

  // Abyss Raid - Ivory Tower - Voldis
  {
    name: "Ivory Tower",
    taskName: "Ivory Tower",
    gates: [
      {
        name: "Ivory Tower Gate 1",
        completionId: "T3.AR3.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 300,
            boundGoldReward: 1200,
            chestPrice: 600,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 400,
            boundGoldReward: 1600,
            chestPrice: 520,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1200,
            chestPrice: 250,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Ivory Tower Gate 2",
        completionId: "T3.AR3.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 400,
            boundGoldReward: 1600,
            chestPrice: 650,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 600,
            boundGoldReward: 2400,
            chestPrice: 670,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1600,
            chestPrice: 350,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Ivory Tower Gate 3",
        completionId: "T3.AR3.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 600,
            boundGoldReward: 2400,
            chestPrice: 1000,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 1100,
            boundGoldReward: 4400,
            chestPrice: 1200,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2400,
            chestPrice: 550,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
    ]
  },

  // Legion Raid - Thaemine
  {
    name: "Thaemine",
    taskName: "Thaemine",
    gates: [
      {
        name: "Thaemine Gate 1",
        completionId: "T3.L8.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 1400,
            boundGoldReward: 1300,
            chestPrice: 1200,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 2400,
            boundGoldReward: 2000,
            chestPrice: 1700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2300,
            chestPrice: 670,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Thaemine Gate 2",
        completionId: "T3.L8.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 1700,
            boundGoldReward: 1600,
            chestPrice: 1440,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 3000,
            boundGoldReward: 2500,
            chestPrice: 1900,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2700,
            chestPrice: 800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Thaemine Gate 3",
        completionId: "T3.L8.G3",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 2600,
            boundGoldReward: 2400,
            chestPrice: 2250,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 4900,
            boundGoldReward: 4000,
            chestPrice: 2300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 3800,
            chestPrice: 1140,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Thaemine Gate 4",
        taskName: "Thaemine G4",
        completionId: "T3.L9.G1",
        modes: [
          {
            name: "HM",
            unboundGoldReward: 5800,
            boundGoldReward: 4000,
            chestPrice: 2300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ],
        reset: resetType.biWeeklyOffset
      },
    ]
  },

  // Kazeros Raids
  {
    name: "Echidna",
    taskName: "Echidna",
    gates: [
      {
        name: "Echidna Gate 1",
        completionId: "T3.K1.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 4000,
            boundGoldReward: 2000,
            chestPrice: 2200,
            HMThreashold: 1630,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 4500,
            boundGoldReward: 2500,
            chestPrice: 2200,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 4800,
            chestPrice: 1450,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Echidna Gate 2",
        completionId: "T3.K1.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 7000,
            boundGoldReward: 3000,
            chestPrice: 3400,
            HMThreashold: 1630,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 9000,
            boundGoldReward: 3500,
            chestPrice: 4100,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 8000,
            chestPrice: 2400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      }
    ]
  },

  // Epic Raid
  {
    name: "Behemoth",
    taskName: "Behemoth",
    gates: [
      {
        name: "Behemoth Gate 1",
        completionId: "T3.K2.G1",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 4500,
            boundGoldReward: 2500,
            chestPrice: 1800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      },
      {
        name: "Behemoth Gate 2",
        completionId: "T3.K2.G2",
        modes: [
          {
            name: "NM",
            unboundGoldReward: 7000,
            boundGoldReward: 4000,
            chestPrice: 2700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      }
    ]
  },

    // Kazeros Raids
    {
      name: "Aegir",
      taskName: "Aegir",
      gates: [
        {
          name: "Aegir Gate 1",
          completionId: "T3.K3.G1",
          modes: [
            {
              name: "NM",
              unboundGoldReward: 7500,
              boundGoldReward: 0,
              chestPrice: 3200,
              HMThreashold: 1680,
              goldILvlLimit: Infinity
            },
            {
              name: "HM",
              unboundGoldReward: 10000,
              boundGoldReward: 0,
              chestPrice: 4100,
              HMThreashold: Infinity,
              goldILvlLimit: Infinity
            }
          ]
        },
        {
          name: "Aegir Gate 2",
          completionId: "T3.K3.G2",
          modes: [
            {
              name: "NM",
              unboundGoldReward: 16500,
              boundGoldReward: 0,
              chestPrice: 5300,
              HMThreashold: 1680,
              goldILvlLimit: Infinity
            },
            {
              name: "HM",
              unboundGoldReward: 20000,
              boundGoldReward: 0,
              chestPrice: 6600,
              HMThreashold: Infinity,
              goldILvlLimit: Infinity
            }
          ]
        }
      ]
    },
    {
      name: "Brelshaza Chapter 2",
      taskName: "Brelshaza Chapter 2",
      gates: [
        {
          name: "Brelshaza Chapter 2 Gate 1",
          completionId: "T4.K4.G1",
          modes: [
            {
              name: "NM",
              unboundGoldReward: 9000,
              boundGoldReward: 0,
              chestPrice: 3800,
              HMThreashold: 1690,
              goldILvlLimit: Infinity
            },
            {
              name: "HM",
              unboundGoldReward: 11000,
              boundGoldReward: 0,
              chestPrice: 4500,
              HMThreashold: Infinity,
              goldILvlLimit: Infinity
            }
          ]
        },
        {
          name: "Brelshaza Chapter 2 Gate 2",
          completionId: "T4.K4.G2",
          modes: [
            {
              name: "NM",
              unboundGoldReward: 18500,
              boundGoldReward: 0,
              chestPrice: 5600,
              HMThreashold: 1690,
              goldILvlLimit: Infinity
            },
            {
              name: "HM",
              unboundGoldReward: 23000,
              boundGoldReward: 0,
              chestPrice: 7200,
              HMThreashold: Infinity,
              goldILvlLimit: Infinity
            }
          ]
        }
      ]
    },
];
