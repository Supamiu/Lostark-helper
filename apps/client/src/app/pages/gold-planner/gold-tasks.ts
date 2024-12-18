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
            goldReward: 80,
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
            goldReward: 80,
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
            goldReward: 80,
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
            goldReward: 80,
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
            goldReward: 100,
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
            goldReward: 100,
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
            goldReward: 100,
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
            goldReward: 100,
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
            goldReward: 100,
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
            goldReward: 200,
            chestPrice: 100,
            HMThreashold: 1370,
            goldILvlLimit: 1415
          },
          {
            name: "HM",
            goldReward: 300,
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
            goldReward: 300,
            chestPrice: 150,
            HMThreashold: 1370,
            goldILvlLimit: 1415
          },
          {
            name: "HM",
            goldReward: 400,
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
            goldReward: 150,
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
            goldReward: 150,
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
            goldReward: 200,
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
            goldReward: 300,
            chestPrice: 180,
          },
          {
            name: "HM",
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
            goldReward: 400,
            chestPrice: 255,
          },
          {
            name: "Solo",
            HMThreashold: Infinity,
            goldILvlLimit: 1600,
            goldReward: 240,
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
            goldReward: 450,
            chestPrice: 255,
          },
          {
            name: "HM",
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
            goldReward: 700,
            chestPrice: 380,
          },
          {
            name: "Solo",
            HMThreashold: Infinity,
            goldILvlLimit: 1600,
            goldReward: 360,
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
            goldReward: 350,
            chestPrice: 175,
            HMThreashold: 1460,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 500,
            chestPrice: 280,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 280,
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
            goldReward: 650,
            chestPrice: 290,
            HMThreashold: 1460,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1000,
            chestPrice: 432,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 520,
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
            goldReward: 400,
            chestPrice: 200,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 320,
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
            goldReward: 600,
            chestPrice: 335,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 480,
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
            goldReward: 1000,
            chestPrice: 470,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 800,
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
            goldReward: 1000,
            chestPrice: 250,
            HMThreashold: 1540,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1200,
            chestPrice: 400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 800,
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
            goldReward: 1000,
            chestPrice: 300,
            HMThreashold: 1540,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1200,
            chestPrice: 400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 800,
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
            goldReward: 1000,
            chestPrice: 400,
            HMThreashold: 1550,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1200,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 800,
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
            goldReward: 1600,
            chestPrice: 600,
            HMThreashold: 1560,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 2000,
            chestPrice: 800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 1280,
            chestPrice: 375,
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
            goldReward: 800,
            chestPrice: 300,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1000,
            chestPrice: 350,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 640,
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
            goldReward: 1200,
            chestPrice: 400,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1600,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 960,
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
            goldReward: 1600,
            chestPrice: 500,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 2200,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 1280,
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
            goldReward: 1000,
            chestPrice: 450,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 1500,
            chestPrice: 600,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 800,
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
            goldReward: 1800,
            chestPrice: 500,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 2500,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 1440,
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
            goldReward: 2600,
            chestPrice: 750,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 3500,
            chestPrice: 950,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 2080,
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
            goldReward: 1500,
            chestPrice: 500,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 3000,
            chestPrice: 750,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 1200,
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
            goldReward: 2000,
            chestPrice: 550,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 4000,
            chestPrice: 900,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 1600,
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
            goldReward: 3000,
            chestPrice: 900,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 6000,
            chestPrice: 1350,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 2400,
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
            goldReward: 3500,
            chestPrice: 1500,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 5000,
            chestPrice: 2000,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 2450,
            chestPrice: 750,
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
            goldReward: 4000,
            chestPrice: 1800,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 6000,
            chestPrice: 2400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 2800,
            chestPrice: 840,
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
            goldReward: 5500,
            chestPrice: 2500,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 9000,
            chestPrice: 2800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 3850,
            chestPrice: 1200,
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
            goldReward: 21000,
            chestPrice: 3600,
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
            goldReward: 6000,
            chestPrice: 2200,
            HMThreashold: 1630,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 7000,
            chestPrice: 2800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 0,
            chestPrice: 0,
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
            goldReward: 10000,
            chestPrice: 3400,
            HMThreashold: 1630,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            goldReward: 12500,
            chestPrice: 4100,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "Solo",
            goldReward: 0,
            chestPrice: 0,
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
            goldReward: 6500,
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
            goldReward: 11500,
            chestPrice: 2900,
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
              goldReward: 7500,
              chestPrice: 3200,
              HMThreashold: 1680,
              goldILvlLimit: Infinity
            },
            {
              name: "HM",
              goldReward: 9000,
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
              goldReward: 15500,
              chestPrice: 5300,
              HMThreashold: 1680,
              goldILvlLimit: Infinity
            },
            {
              name: "HM",
              goldReward: 18500,
              chestPrice: 6600,
              HMThreashold: Infinity,
              goldILvlLimit: Infinity
            }
          ]
        }
      ]
    },
];
