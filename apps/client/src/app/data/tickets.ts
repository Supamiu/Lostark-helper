import { Character } from "../model/character/character";
import { ItemRarity } from "../model/item-rarity";


export const tickets: {tier?: number, icon: string, rarity: ItemRarity, key: keyof Character['tickets'], name: string}[] = [
  {
    tier: 3,
    icon: 'ebony1302.png',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCubeLevel1",
    name: "Ebony Cube Level 1"
  },
  {
    tier: 3,
    icon: 'ebony1490.png',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCubeLevel2",
    name: "Ebony Cube Level 2"
  },
  {
    tier: 3,
    icon: 'ebony1540.png',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCubeLevel3",
    name: "Ebony Cube Level 3"
  },
  {
    tier: 3,
    icon: 'ebony1580.png',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCubeLevel4",
    name: "Ebony Cube Level 4"
  },
  {
    tier: 3,
    icon: 'ebony1610.png',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCubeLevel5",
    name: "Ebony Cube Level 5"
  },
  {
    tier: 3,
    icon: 'ebony1640.webp',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCube1stUnlock",
    name: "Ebony Cube 1st Unlock"
  },
  {
    tier: 3,
    icon: 'ebony1680.webp',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCube2ndUnlock",
    name: "Ebony Cube 2nd Unlock"
  },
    {
    tier: 3,
    icon: 'ebony1700.webp',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCube3rdUnlock",
    name: "Ebony Cube 3rd Unlock"
  },
  {
    tier: 3,
    icon: 'ebony1720.png',
    rarity: ItemRarity.LEGENDARY,
    key: "EbonyCube4thUnlock",
    name: "Ebony Cube 4th Unlock"
  },
]
