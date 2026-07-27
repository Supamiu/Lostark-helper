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
            name: "Solo",
            HMThreashold: Infinity,
            goldILvlLimit: 1600,
            unboundGoldReward: 0,
            boundGoldReward: 290,
            chestPrice: 75,
          },
          {
            name: "NM",
            HMThreashold: 1445,
            goldILvlLimit: Infinity,
            unboundGoldReward: 40,
            boundGoldReward: 250,
            chestPrice: 75,
          },
          {
            name: "HM",
            HMThreashold: Infinity,
            NightmareThreashold: Infinity,
            goldILvlLimit: Infinity,
            unboundGoldReward: 70,
            boundGoldReward: 330,
            chestPrice: 175,
          },
        ]
      },
      {
        name: "Valtan Gate 2",
        completionId: "T3.L1.G2",
        chestId: "Valtan2",
        modes: [
          {
            name: "Solo",
            HMThreashold: Infinity,
            goldILvlLimit: 1600,
            unboundGoldReward: 0,
            boundGoldReward: 460,
            chestPrice: 100,
          },
          {
            name: "NM",
            HMThreashold: 1445,
            goldILvlLimit: Infinity,
            unboundGoldReward: 60,
            boundGoldReward: 400,
            chestPrice: 100,
          },
          {
            name: "HM",
            HMThreashold: Infinity,
            NightmareThreashold: Infinity,
            goldILvlLimit: Infinity,
            unboundGoldReward: 130,
            boundGoldReward: 570,
            chestPrice: 275,
          },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 350,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1600
          },
          {
            name: "NM",
            unboundGoldReward: 50,
            boundGoldReward: 300,
            chestPrice: 100,
            HMThreashold: 1460,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 80,
            boundGoldReward: 420,
            chestPrice: 225,
            HMThreashold: Infinity,
            NightmareThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Vykas Gate 2",
        completionId: "T3.L2.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 650,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1600
          },
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 550,
            chestPrice: 150,
            HMThreashold: 1460,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 170,
            boundGoldReward: 830,
            chestPrice: 375,
            HMThreashold: Infinity,
            NightmareThreashold: Infinity,
            goldILvlLimit: Infinity
          },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 400,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1610
          },
          {
            name: "NM",
            unboundGoldReward: 70,
            boundGoldReward: 330,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Kakul-Saydon Gate 2",
        completionId: "T3.L3.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 600,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1610
          },
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 500,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Kakul-Saydon Gate 3",
        completionId: "T3.L3.G3",
        modes: [{
          name: "Solo",
          unboundGoldReward: 0,
          boundGoldReward: 1000,
          chestPrice: 200,
          HMThreashold: Infinity,
          goldILvlLimit: 1610
        },
        {
          name: "NM",
          unboundGoldReward: 180,
          boundGoldReward: 820,
          chestPrice: 200,
          HMThreashold: Infinity,
          goldILvlLimit: Infinity
        },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 980,
            chestPrice: 100,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          },
          {
            name: "NM",
            unboundGoldReward: 170,
            boundGoldReward: 810,
            chestPrice: 100,
            HMThreashold: 1540,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 210,
            boundGoldReward: 970,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Brelshaza Gate 2",
        completionId: "T3.L4.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1000,
            chestPrice: 150,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          },
          {
            name: "NM",
            unboundGoldReward: 180,
            boundGoldReward: 820,
            chestPrice: 150,
            HMThreashold: 1540,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 220,
            boundGoldReward: 980,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Brelshaza Gate 3",
        taskName: "Brelshaza Gate 3",
        completionId: "T3.L5.G1",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1020,
            chestPrice: 200,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          },
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 820,
            chestPrice: 200,
            HMThreashold: 1550,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 220,
            boundGoldReward: 1000,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Brelshaza Gate 4",
        taskName: "Brelshaza Gate 4",
        completionId: "T3.L6.G1",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1600,
            chestPrice: 375,
            HMThreashold: Infinity,
            goldILvlLimit: 1620
          },
          {
            name: "NM",
            unboundGoldReward: 300,
            boundGoldReward: 1300,
            chestPrice: 375,
            HMThreashold: 1560,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 350,
            boundGoldReward: 1650,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1000,
            chestPrice: 180,
            HMThreashold: Infinity,
            goldILvlLimit: 1640
          },
          {
            name: "NM",
            unboundGoldReward: 100,
            boundGoldReward: 900,
            chestPrice: 180,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 150,
            boundGoldReward: 1000,
            chestPrice: 225,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Kayangel Gate 2",
        completionId: "T3.AR2.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1100,
            chestPrice: 200,
            HMThreashold: Infinity,
            goldILvlLimit: 1640
          },
          {
            name: "NM",
            unboundGoldReward: 200,
            boundGoldReward: 900,
            chestPrice: 200,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 250,
            boundGoldReward: 1200,
            chestPrice: 350,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Kayangel Gate 3",
        completionId: "T3.AR2.G3",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1200,
            chestPrice: 270,
            HMThreashold: Infinity,
            goldILvlLimit: 1640
          },
          {
            name: "NM",
            unboundGoldReward: 300,
            boundGoldReward: 900,
            chestPrice: 270,
            HMThreashold: 1580,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 400,
            boundGoldReward: 1300,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1270,
            chestPrice: 190,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 255,
            boundGoldReward: 1015,
            chestPrice: 190,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 200,
            boundGoldReward: 1300,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Akkan Gate 2",
        completionId: "T3.L7.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1600,
            chestPrice: 235,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 300,
            boundGoldReward: 1300,
            chestPrice: 230,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 410,
            boundGoldReward: 1640,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Akkan Gate 3",
        completionId: "T3.L7.G3",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1830,
            chestPrice: 330,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 330,
            boundGoldReward: 1500,
            chestPrice: 330,
            HMThreashold: 1600,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 490,
            boundGoldReward: 1960,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1350,
            chestPrice: 180,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 250,
            boundGoldReward: 1100,
            chestPrice: 180,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 420,
            boundGoldReward: 1680,
            chestPrice: 350,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Ivory Tower Gate 2",
        completionId: "T3.AR3.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1750,
            chestPrice: 220,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 350,
            boundGoldReward: 1400,
            chestPrice: 220,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 480,
            boundGoldReward: 1920,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Ivory Tower Gate 3",
        completionId: "T3.AR3.G3",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2100,
            chestPrice: 300,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 420,
            boundGoldReward: 1680,
            chestPrice: 300,
            HMThreashold: 1610,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 540,
            boundGoldReward: 2160,
            chestPrice: 950,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
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
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1600,
            chestPrice: 360,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 320,
            boundGoldReward: 1280,
            chestPrice: 360,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 400,
            boundGoldReward: 1600,
            chestPrice: 500,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Thaemine Gate 2",
        completionId: "T3.L8.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2000,
            chestPrice: 440,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 400,
            boundGoldReward: 1600,
            chestPrice: 440,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 480,
            boundGoldReward: 1920,
            chestPrice: 600,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Thaemine Gate 3",
        completionId: "T3.L8.G3",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 2800,
            chestPrice: 640,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 560,
            boundGoldReward: 2240,
            chestPrice: 640,
            HMThreashold: 1620,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 720,
            boundGoldReward: 2880,
            chestPrice: 900,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Thaemine Gate 4",
        taskName: "Thaemine G4",
        completionId: "T3.L9.G1",
        modes: [
          {
            name: "HM",
            unboundGoldReward: 1000,
            boundGoldReward: 4000,
            chestPrice: 1250,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ],
        reset: resetType.biWeeklyOffset
      },
    ]
  },

  // Kazeros Raid - Overture: Echidna
  {
    name: "Echidna",
    taskName: "Echidna",
    gates: [
      {
        name: "Echidna Gate 1",
        completionId: "T3.K1.G1",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 1900,
            chestPrice: 310,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 0,
            boundGoldReward: 1900,
            chestPrice: 310,
            HMThreashold: 1630,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 1100,
            boundGoldReward: 1100,
            chestPrice: 720,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Echidna Gate 2",
        completionId: "T3.K1.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 0,
            boundGoldReward: 4200,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 0,
            boundGoldReward: 4200,
            chestPrice: 700,
            HMThreashold: 1630,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 2500,
            boundGoldReward: 2500,
            chestPrice: 1630,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      }
    ]
  },

  // Epic Raid - Behemoth
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
            unboundGoldReward: 1100,
            boundGoldReward: 1100,
            chestPrice: 310,
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
            unboundGoldReward: 2500,
            boundGoldReward: 2500,
            chestPrice: 700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          }
        ]
      }
    ]
  },

  // Kazeros Raid - Act 1: Aegir
  {
    name: "Aegir",
    taskName: "Aegir",
    gates: [
      {
        name: "Aegir Gate 1",
        completionId: "T3.K3.G1",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 1750,
            boundGoldReward: 1750,
            chestPrice: 750,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 1750,
            boundGoldReward: 1750,
            chestPrice: 750,
            HMThreashold: 1680,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 2750,
            boundGoldReward: 2750,
            chestPrice: 1820,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Aegir Gate 2",
        completionId: "T3.K3.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 4000,
            boundGoldReward: 4000,
            chestPrice: 1780,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 4000,
            boundGoldReward: 4000,
            chestPrice: 1780,
            HMThreashold: 1680,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 6250,
            boundGoldReward: 6250,
            chestPrice: 4150,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      }
    ]
  },

  // Kazeros Raid - Act 2: Brelshaza
  {
    name: "Brelshaza Chapter 2",
    taskName: "Brelshaza Chapter 2",
    gates: [
      {
        name: "Brelshaza Chapter 2 Gate 1",
        completionId: "T4.K4.G1",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 2750,
            boundGoldReward: 2750,
            chestPrice: 1820,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 2750,
            boundGoldReward: 2750,
            chestPrice: 1820,
            HMThreashold: 1690,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 3750,
            boundGoldReward: 3750,
            chestPrice: 2400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Brelshaza Chapter 2 Gate 2",
        completionId: "T4.K4.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 5500,
            boundGoldReward: 5500,
            chestPrice: 3720,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 5500,
            boundGoldReward: 5500,
            chestPrice: 3720,
            HMThreashold: 1690,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 7750,
            boundGoldReward: 7750,
            chestPrice: 5100,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      }
    ]
  },

  // Kazeros Raid - Act 3: Mordum
  {
    name: "Mordum",
    taskName: "Mordum",
    gates: [
      {
        name: "Mordum Gate 1",
        completionId: "T4.K4.G1",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 2000,
            boundGoldReward: 2000,
            chestPrice: 2400,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 2000,
            boundGoldReward: 2000,
            chestPrice: 2400,
            HMThreashold: 1700,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 2500,
            boundGoldReward: 2500,
            chestPrice: 2700,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Mordum Gate 2",
        completionId: "T4.K4.G2",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 3500,
            boundGoldReward: 3500,
            chestPrice: 3200,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 3500,
            boundGoldReward: 3500,
            chestPrice: 3200,
            HMThreashold: 1700,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 4000,
            boundGoldReward: 4000,
            chestPrice: 4100,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      },
      {
        name: "Mordum Gate 3",
        completionId: "T4.K4.G3",
        modes: [
          {
            name: "Solo",
            unboundGoldReward: 5000,
            boundGoldReward: 5000,
            chestPrice: 4200,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
          {
            name: "NM",
            unboundGoldReward: 5000,
            boundGoldReward: 5000,
            chestPrice: 4200,
            HMThreashold: 1700,
            goldILvlLimit: Infinity
          },
          {
            name: "HM",
            unboundGoldReward: 7000,
            boundGoldReward: 7000,
            chestPrice: 5800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity
          },
        ]
      }
    ]
  },

  // Kazeros Raid - Act 4: Armoche
  {
    name: 'Armoche',
    taskName: 'Armoche',
    gates: [
      {
        name: 'Armoche Gate 1',
        completionId: 'T4.K5.G1',
        modes: [
          {
            name: 'Solo',
            unboundGoldReward: 6250,
            boundGoldReward: 6250,
            chestPrice: 4000,
            goldILvlLimit: Infinity,
          },
          {
            name: 'NM',
            unboundGoldReward: 6250,
            boundGoldReward: 6250,
            chestPrice: 4000,
            HMThreashold: 1720,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 15000,
            boundGoldReward: 0,
            chestPrice: 4800,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
          },
        ],
      },
      {
        name: 'Armoche Gate 2',
        completionId: 'T4.K5.G2',
        modes: [
          {
            name: 'Solo',
            unboundGoldReward: 10250,
            boundGoldReward: 10250,
            chestPrice: 6560,
            goldILvlLimit: Infinity,
          },
          {
            name: 'NM',
            unboundGoldReward: 10250,
            boundGoldReward: 10250,
            chestPrice: 6560,
            HMThreashold: 1720,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 27000,
            boundGoldReward: 0,
            chestPrice: 8640,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
          },
        ],
      }
    ],
  },

  // Kazeros Raid - Denouement: Kazeros
  {
    name: 'Kazeros',
    taskName: 'Kazeros',
    gates: [
      {
        name: 'Kazeros Gate 1',
        completionId: 'T4.K6.G1',
        modes: [
          {
            name: 'Solo',
            unboundGoldReward: 7000,
            boundGoldReward: 7000,
            chestPrice: 4480,
            goldILvlLimit: Infinity,
          },
          {
            name: 'NM',
            unboundGoldReward: 7000,
            boundGoldReward: 7000,
            chestPrice: 4480,
            HMThreashold: 1730,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 17000,
            boundGoldReward: 0,
            chestPrice: 5440,
            HMThreashold: Infinity,
            goldILvlLimit: Infinity,
          },
        ],
      },
      {
        name: 'Kazeros Gate 2',
        completionId: 'T4.K6.G2',
        modes: [
          {
            name: 'Solo',
            unboundGoldReward: 13000,
            boundGoldReward: 13000,
            chestPrice: 8320,
            goldILvlLimit: Infinity,
          },
          {
            name: 'NM',
            unboundGoldReward: 13000,
            boundGoldReward: 13000,
            chestPrice: 8320,
            HMThreashold: 1730,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 35000,
            boundGoldReward: 0,
            chestPrice: 11200,
            HMThreashold: 1740,
            goldILvlLimit: Infinity,
          },
        ],
      }
    ],
  },

  // Shadow Raids
  {
    name: 'Serca',
    taskName: 'Serca',
    gates: [
      {
        name: 'Serca Gate 1',
        completionId: 'T4.SR1.G1',
        modes: [
          {
            name: 'NM',
            unboundGoldReward: 7000,
            boundGoldReward: 7000,
            chestPrice: 4480,
            HMThreashold: 1730,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 17500,
            boundGoldReward: 0,
            chestPrice: 5600,
            NightmareThreashold: 1740,
            goldILvlLimit: Infinity,
          },
          {
            name: 'Nightmare',
            unboundGoldReward: 21000,
            boundGoldReward: 0,
            chestPrice: 6720,
            goldILvlLimit: Infinity,
          }
        ],
      },
      {
        name: 'Serca Gate 2',
        completionId: 'T4.SR1.G2',
        modes: [
          {
            name: 'NM',
            unboundGoldReward: 10500,
            boundGoldReward: 10500,
            chestPrice: 6720,
            HMThreashold: 1730,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 26500,
            boundGoldReward: 0,
            chestPrice: 8480,
            NightmareThreashold: 1740,
            goldILvlLimit: Infinity,
          },
          {
            name: 'Nightmare',
            unboundGoldReward: 33000,
            boundGoldReward: 0,
            chestPrice: 10560,
            goldILvlLimit: Infinity,
          }
        ],
      }
    ],
  },

  // Abyssal Dungeon Horizon Cathedral
  {
    name: 'Horizon Cathedral',
    taskName: 'Horizon Cathedral',
    gates: [
      {
        name: 'Horizon Cathedral Gate 1',
        completionId: 'T4.AB1.G1',
        modes: [
          {
            name: 'NM',
            unboundGoldReward: 0,
            boundGoldReward: 13500,
            chestPrice: 4320,
            HMThreashold: 1720,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 0,
            boundGoldReward: 16000,
            chestPrice: 5120,
            NightmareThreashold: 1750,
            goldILvlLimit: Infinity,
          },
          {
            name: 'Nightmare',
            unboundGoldReward: 0,
            boundGoldReward: 20000,
            chestPrice: 6400,
            goldILvlLimit: Infinity,
          }
        ],
      },
      {
        name: 'Horizon Cathedral Gate 2',
        completionId: 'T4.AB1.G2',
        modes: [
          {
            name: 'NM',
            unboundGoldReward: 0,
            boundGoldReward: 16500,
            chestPrice: 5280,
            HMThreashold: 1720,
            goldILvlLimit: Infinity,
          },
          {
            name: 'HM',
            unboundGoldReward: 0,
            boundGoldReward: 24000,
            chestPrice: 7680,
            NightmareThreashold: 1750,
            goldILvlLimit: Infinity,
          },
          {
            name: 'Nightmare',
            unboundGoldReward: 0,
            boundGoldReward: 30000,
            chestPrice: 9600,
            goldILvlLimit: Infinity,
          }
        ],
      }
    ],
  },
];
