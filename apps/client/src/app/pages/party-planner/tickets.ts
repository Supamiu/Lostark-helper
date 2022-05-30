import { Character } from "../../model/character/character";


export const tickets: {icon: string, key: keyof Character['tickets'], name: string}[] = [
  {
    icon: 't1_cube.png',
    key: "t1Cube",
    name: "T1 Cube"
  },
  {
    icon: 't2_cube.png',
    key: "t2Cube",
    name: "T2 Cube"
  },
  {
    icon: 't2_bossrush.png',
    key: "t2BossRush",
    name: "T2 Boss Rush"
  },
  {
    icon: 't3_bossrush.png',
    key: "t3BossRush",
    name: "T3 Boss Rush"
  },
  {
    icon: 't3_cube.png',
    key: "t3Cube",
    name: "T3 Cube"
  },
  {
    icon: 'platinum_fields.png',
    key: "platinumFields",
    name: "Platinum Fields"
  },
]
