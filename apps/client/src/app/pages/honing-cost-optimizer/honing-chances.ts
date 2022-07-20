export interface HoningChances {
  type: "weapon" | "armor";
  rarity: "epic" | "legendary/relic";
  target: number;
  chances: number;
  stones: number;
  shards: number;
  leapstones: number;
  fusionMaterial?: number;
  silver: number;
  gold?: number;
  exp: number;
}


export const honingChances: HoningChances[] = [
  { type: "armor", rarity: "epic", target: 1, chances: 100, stones: 41, shards: 22, leapstones: 2, silver: 5550, exp: 331 },
  { type: "armor", rarity: "epic", target: 2, chances: 100, stones: 41, shards: 22, leapstones: 2, silver: 5690, exp: 331 },
  { type: "armor", rarity: "epic", target: 3, chances: 100, stones: 41, shards: 22, leapstones: 4, silver: 5830, exp: 331 },
  { type: "armor", rarity: "epic", target: 4, chances: 100, stones: 60, shards: 36, leapstones: 4, fusionMaterial: 2, silver: 5980, exp: 477 },
  { type: "armor", rarity: "epic", target: 5, chances: 100, stones: 60, shards: 36, leapstones: 4, fusionMaterial: 2, silver: 6120, exp: 477 },
  { type: "armor", rarity: "epic", target: 6, chances: 100, stones: 60, shards: 36, leapstones: 4, fusionMaterial: 2, silver: 6270, exp: 477 },
  { type: "armor", rarity: "epic", target: 7, chances: 60, stones: 78, shards: 42, leapstones: 4, fusionMaterial: 2, silver: 6420, gold: 49, exp: 621 },
  { type: "armor", rarity: "epic", target: 8, chances: 45, stones: 78, shards: 42, leapstones: 4, fusionMaterial: 2, silver: 6580, gold: 49, exp: 621 },
  { type: "armor", rarity: "epic", target: 9, chances: 30, stones: 78, shards: 42, leapstones: 4, fusionMaterial: 2, silver: 6740, gold: 49, exp: 621 },
  { type: "armor", rarity: "epic", target: 10, chances: 30, stones: 96, shards: 50, leapstones: 6, fusionMaterial: 4, silver: 6910, gold: 49, exp: 767 },
  { type: "armor", rarity: "epic", target: 11, chances: 30, stones: 96, shards: 50, leapstones: 6, fusionMaterial: 4, silver: 7070, gold: 49, exp: 767 },
  { type: "armor", rarity: "epic", target: 12, chances: 20, stones: 96, shards: 50, leapstones: 6, fusionMaterial: 4, silver: 7250, gold: 49, exp: 767 },
  { type: "armor", rarity: "epic", target: 13, chances: 20, stones: 114, shards: 60, leapstones: 6, fusionMaterial: 4, silver: 7430, gold: 49, exp: 912 },
  { type: "armor", rarity: "epic", target: 14, chances: 20, stones: 114, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 7610, gold: 49, exp: 912 },
  { type: "armor", rarity: "epic", target: 15, chances: 20, stones: 114, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 7800, gold: 49, exp: 912 },

  { type: "armor", rarity: "legendary/relic", target: 8, chances: 55, stones: 404, shards: 108, leapstones: 10, fusionMaterial: 6, silver: 22920, gold: 170, exp: 4622 },
  { type: "armor", rarity: "legendary/relic", target: 9, chances: 40, stones: 404, shards: 108, leapstones: 10, fusionMaterial: 6, silver: 23480, gold: 170, exp: 4622 },
  { type: "armor", rarity: "legendary/relic", target: 10, chances: 40, stones: 498, shards: 132, leapstones: 10, fusionMaterial: 8, silver: 24040, gold: 170, exp: 5700 },
  { type: "armor", rarity: "legendary/relic", target: 11, chances: 40, stones: 498, shards: 132, leapstones: 10, fusionMaterial: 8, silver: 24640, gold: 170, exp: 5700 },
  { type: "armor", rarity: "legendary/relic", target: 12, chances: 25, stones: 498, shards: 132, leapstones: 12, fusionMaterial: 8, silver: 25240, gold: 170, exp: 5700 },
  { type: "armor", rarity: "legendary/relic", target: 13, chances: 25, stones: 592, shards: 158, leapstones: 12, fusionMaterial: 8, silver: 25860, gold: 170, exp: 6778 },
  { type: "armor", rarity: "legendary/relic", target: 14, chances: 25, stones: 592, shards: 158, leapstones: 12, fusionMaterial: 8, silver: 26500, gold: 170, exp: 6778 },
  { type: "armor", rarity: "legendary/relic", target: 15, chances: 20, stones: 592, shards: 158, leapstones: 12, fusionMaterial: 8, silver: 27160, gold: 180, exp: 6778 },
  { type: "armor", rarity: "legendary/relic", target: 16, chances: 10, stones: 686, shards: 216, leapstones: 14, fusionMaterial: 10, silver: 27820, gold: 210, exp: 9178 },
  { type: "armor", rarity: "legendary/relic", target: 17, chances: 10, stones: 686, shards: 292, leapstones: 16, fusionMaterial: 10, silver: 28420, gold: 250, exp: 12406 },
  { type: "armor", rarity: "legendary/relic", target: 18, chances: 5, stones: 686, shards: 396, leapstones: 16, fusionMaterial: 12, silver: 29040, gold: 280, exp: 16824 },
  { type: "armor", rarity: "legendary/relic", target: 19, chances: 5, stones: 780, shards: 536, leapstones: 18, fusionMaterial: 14, silver: 29660, gold: 320, exp: 23166 },
  { type: "armor", rarity: "legendary/relic", target: 20, chances: 3, stones: 780, shards: 728, leapstones: 20, fusionMaterial: 14, silver: 30320, gold: 350, exp: 31464 },
  { type: "armor", rarity: "legendary/relic", target: 21, chances: 3, stones: 780, shards: 988, leapstones: 22, fusionMaterial: 16, silver: 30980, gold: 360, exp: 42702 },
  { type: "armor", rarity: "legendary/relic", target: 22, chances: 1, stones: 874, shards: 1340, leapstones: 24, fusionMaterial: 18, silver: 31640, gold: 380, exp: 57348 },
  { type: "armor", rarity: "legendary/relic", target: 23, chances: 1, stones: 874, shards: 1818, leapstones: 26, fusionMaterial: 20, silver: 32320, gold: 390, exp: 77804 },
  { type: "armor", rarity: "legendary/relic", target: 24, chances: 0.5, stones: 874, shards: 2466, leapstones: 28, fusionMaterial: 22, silver: 33040, gold: 400, exp: 105536 },
  { type: "armor", rarity: "legendary/relic", target: 25, chances: 0.5, stones: 968, shards: 3346, leapstones: 30, fusionMaterial: 24, silver: 33740, gold: 420, exp: 144488 },

  { type: "weapon", rarity: "epic", target: 1, chances: 100, stones: 69, shards: 16, leapstones: 4, silver: 11928, exp: 331 },
  { type: "weapon", rarity: "epic", target: 2, chances: 100, stones: 69, shards: 16, leapstones: 4, silver: 12222, exp: 331 },
  { type: "weapon", rarity: "epic", target: 3, chances: 100, stones: 99, shards: 16, leapstones: 6, silver: 12530, exp: 331 },
  { type: "weapon", rarity: "epic", target: 4, chances: 100, stones: 99, shards: 23, leapstones: 6, fusionMaterial: 2, silver: 11928, exp: 477 },
  { type: "weapon", rarity: "epic", target: 5, chances: 100, stones: 99, shards: 23, leapstones: 6, fusionMaterial: 2, silver: 12222, exp: 477 },
  { type: "weapon", rarity: "epic", target: 6, chances: 100, stones: 99, shards: 23, leapstones: 6, fusionMaterial: 2, silver: 12530, exp: 477 },
  { type: "weapon", rarity: "epic", target: 7, chances: 60, stones: 129, shards: 30, leapstones: 8, fusionMaterial: 4, silver: 12824, gold: 84, exp: 621 },
  { type: "weapon", rarity: "epic", target: 8, chances: 45, stones: 129, shards: 30, leapstones: 8, fusionMaterial: 4, silver: 13146, gold: 84, exp: 621 },
  { type: "weapon", rarity: "epic", target: 9, chances: 30, stones: 129, shards: 30, leapstones: 8, fusionMaterial: 4, silver: 13468, gold: 84, exp: 621 },
  { type: "weapon", rarity: "epic", target: 10, chances: 30, stones: 160, shards: 37, leapstones: 10, fusionMaterial: 4, silver: 13804, gold: 84, exp: 767 },
  { type: "weapon", rarity: "epic", target: 11, chances: 30, stones: 160, shards: 37, leapstones: 10, fusionMaterial: 4, silver: 14140, gold: 84, exp: 767 },
  { type: "weapon", rarity: "epic", target: 12, chances: 20, stones: 160, shards: 37, leapstones: 10, fusionMaterial: 4, silver: 14489, gold: 84, exp: 767 },
  { type: "weapon", rarity: "epic", target: 13, chances: 20, stones: 190, shards: 44, leapstones: 10, fusionMaterial: 6, silver: 14839, gold: 84, exp: 912 },
  { type: "weapon", rarity: "epic", target: 14, chances: 20, stones: 190, shards: 44, leapstones: 12, fusionMaterial: 6, silver: 15203, gold: 84, exp: 912 },
  { type: "weapon", rarity: "epic", target: 15, chances: 20, stones: 190, shards: 44, leapstones: 12, fusionMaterial: 6, silver: 15581, gold: 84, exp: 912 },

  { type: "weapon", rarity: "legendary/relic", target: 7, chances: 70, stones: 672, shards: 156, leapstones: 12, fusionMaterial: 6, silver: 31920, gold: 320, exp: 6610 },
  { type: "weapon", rarity: "legendary/relic", target: 8, chances: 55, stones: 672, shards: 156, leapstones: 14, fusionMaterial: 6, silver: 32700, gold: 320, exp: 6610 },
  { type: "weapon", rarity: "legendary/relic", target: 9, chances: 40, stones: 672, shards: 156, leapstones: 14, fusionMaterial: 8, silver: 33520, gold: 320, exp: 6610 },
  { type: "weapon", rarity: "legendary/relic", target: 10, chances: 40, stones: 830, shards: 192, leapstones: 16, fusionMaterial: 8, silver: 34340, gold: 320, exp: 8152 },
  { type: "weapon", rarity: "legendary/relic", target: 11, chances: 40, stones: 830, shards: 192, leapstones: 16, fusionMaterial: 8, silver: 35180, gold: 330, exp: 8152 },
  { type: "weapon", rarity: "legendary/relic", target: 12, chances: 25, stones: 830, shards: 192, leapstones: 18, fusionMaterial: 8, silver: 36040, gold: 330, exp: 8152 },
  { type: "weapon", rarity: "legendary/relic", target: 13, chances: 25, stones: 968, shards: 228, leapstones: 18, fusionMaterial: 10, silver: 36940, gold: 330, exp: 9696 },
  { type: "weapon", rarity: "legendary/relic", target: 14, chances: 25, stones: 968, shards: 228, leapstones: 20, fusionMaterial: 10, silver: 37840, gold: 330, exp: 9696 },
  { type: "weapon", rarity: "legendary/relic", target: 15, chances: 10, stones: 968, shards: 228, leapstones: 20, fusionMaterial: 10, silver: 38760, gold: 330, exp: 9696 },
  { type: "weapon", rarity: "legendary/relic", target: 16, chances: 10, stones: 1144, shards: 310, leapstones: 22, fusionMaterial: 12, silver: 39720, gold: 410, exp: 13014 },
  { type: "weapon", rarity: "legendary/relic", target: 17, chances: 10, stones: 1144, shards: 422, leapstones: 24, fusionMaterial: 14, silver: 40580, gold: 480, exp: 17714 },
  { type: "weapon", rarity: "legendary/relic", target: 18, chances: 5, stones: 1144, shards: 572, leapstones: 28, fusionMaterial: 16, silver: 41460, gold: 540, exp: 24012 },
  { type: "weapon", rarity: "legendary/relic", target: 19, chances: 5, stones: 1300, shards: 776, leapstones: 30, fusionMaterial: 18, silver: 42360, gold: 640, exp: 32774 },
  { type: "weapon", rarity: "legendary/relic", target: 20, chances: 3, stones: 1300, shards: 1054, leapstones: 32, fusionMaterial: 20, silver: 43260, gold: 730, exp: 44514 },
  { type: "weapon", rarity: "legendary/relic", target: 21, chances: 3, stones: 1300, shards: 1432, leapstones: 34, fusionMaterial: 22, silver: 44200, gold: 750, exp: 60480 },
  { type: "weapon", rarity: "legendary/relic", target: 22, chances: 1, stones: 1458, shards: 1944, leapstones: 38, fusionMaterial: 26, silver: 45160, gold: 780, exp: 82372 },
  { type: "weapon", rarity: "legendary/relic", target: 23, chances: 1, stones: 1458, shards: 2640, leapstones: 42, fusionMaterial: 28, silver: 46140, gold: 810, exp: 111862 },
  { type: "weapon", rarity: "legendary/relic", target: 24, chances: 0.5, stones: 1458, shards: 3586, leapstones: 44, fusionMaterial: 32, silver: 47160, gold: 840, exp: 151946 },
  { type: "weapon", rarity: "legendary/relic", target: 25, chances: 0.5, stones: 1614, shards: 4868, leapstones: 48, fusionMaterial: 36, silver: 48180, gold: 870, exp: 206688 }
];
