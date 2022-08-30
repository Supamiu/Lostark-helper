import { Character } from "../model/character/character";
import { ItemRarity } from "../model/item-rarity";


export const tickets: {tier?: number, icon: string, rarity: ItemRarity, key: keyof Character['tickets'], name: string}[] = [
  {
    tier: 1,
    icon: 't1_cube.png',
    rarity: ItemRarity.RARE,
    key: "t1Cube",
    name: "T1 Cube"
  },
  {
    tier: 2,
    icon: 't2_cube.png',
    rarity: ItemRarity.RARE,
    key: "t2Cube",
    name: "T2 Cube"
  },
  {
    tier: 2,
    icon: 't2_bossrush.png',
    rarity: ItemRarity.LEGENDARY,
    key: "t2BossRush",
    name: "T2 Boss Rush"
  },
  {
    tier: 3,
    icon: 't3_cube.png',
    rarity: ItemRarity.RARE,
    key: "t3Cube",
    name: "T3 Cube"
  },
  {
    tier: 3,
    icon: 't3_bossrush.png',
    rarity: ItemRarity.LEGENDARY,
    key: "t3BossRush",
    name: "T3 Boss Rush"
  },
  {
    icon: 'platinum_fields.png',
    rarity: ItemRarity.LEGENDARY,
    key: "platinumFields",
    name: "Platinum Fields"
  },
]
