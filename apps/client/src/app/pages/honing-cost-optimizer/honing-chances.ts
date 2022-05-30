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
}


export const honingChances: HoningChances[] = [
  // Epic armor
  { type: "armor", rarity: "epic", target: 1, chances: 100, stones: 82, shards: 22, leapstones: 2, silver: 11100 },
  { type: "armor", rarity: "epic", target: 2, chances: 100, stones: 82, shards: 22, leapstones: 2, silver: 11380 },
  { type: "armor", rarity: "epic", target: 3, chances: 100, stones: 82, shards: 22, leapstones: 4, silver: 11660 },
  { type: "armor", rarity: "epic", target: 4, chances: 100, stones: 120, shards: 36, leapstones: 4, fusionMaterial: 2, silver: 11960 },
  { type: "armor", rarity: "epic", target: 5, chances: 100, stones: 120, shards: 36, leapstones: 4, fusionMaterial: 2, silver: 12240 },
  { type: "armor", rarity: "epic", target: 6, chances: 100, stones: 120, shards: 36, leapstones: 4, fusionMaterial: 2, silver: 12540 },
  { type: "armor", rarity: "epic", target: 7, chances: 60, stones: 156, shards: 42, leapstones: 4, fusionMaterial: 2, silver: 12840, gold: 70 },
  { type: "armor", rarity: "epic", target: 8, chances: 45, stones: 156, shards: 42, leapstones: 4, fusionMaterial: 2, silver: 13160, gold: 70 },
  { type: "armor", rarity: "epic", target: 9, chances: 30, stones: 156, shards: 42, leapstones: 4, fusionMaterial: 2, silver: 13480, gold: 70 },
  { type: "armor", rarity: "epic", target: 10, chances: 30, stones: 192, shards: 50, leapstones: 6, fusionMaterial: 4, silver: 13820, gold: 70 },
  { type: "armor", rarity: "epic", target: 11, chances: 30, stones: 192, shards: 50, leapstones: 6, fusionMaterial: 4, silver: 14140, gold: 70 },
  { type: "armor", rarity: "epic", target: 12, chances: 15, stones: 192, shards: 50, leapstones: 6, fusionMaterial: 4, silver: 14500, gold: 70 },
  { type: "armor", rarity: "epic", target: 13, chances: 15, stones: 228, shards: 60, leapstones: 6, fusionMaterial: 4, silver: 14860, gold: 70 },
  { type: "armor", rarity: "epic", target: 14, chances: 15, stones: 228, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 15220, gold: 70 },
  { type: "armor", rarity: "epic", target: 15, chances: 10, stones: 228, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 15600, gold: 70 },

  // Legendary+ armor
  { type: "armor", rarity: "legendary/relic", target: 8, chances: 45, stones: 404, shards: 108, leapstones: 10, fusionMaterial: 6, silver: 22920, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 9, chances: 30, stones: 404, shards: 108, leapstones: 10, fusionMaterial: 6, silver: 23480, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 10, chances: 30, stones: 498, shards: 132, leapstones: 10, fusionMaterial: 8, silver: 24040, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 11, chances: 30, stones: 498, shards: 132, leapstones: 10, fusionMaterial: 8, silver: 24640, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 12, chances: 15, stones: 498, shards: 132, leapstones: 12, fusionMaterial: 8, silver: 25240, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 13, chances: 15, stones: 592, shards: 158, leapstones: 12, fusionMaterial: 8, silver: 25860, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 14, chances: 15, stones: 592, shards: 158, leapstones: 12, fusionMaterial: 8, silver: 26500, gold: 170 },
  { type: "armor", rarity: "legendary/relic", target: 15, chances: 10, stones: 592, shards: 158, leapstones: 12, fusionMaterial: 8, silver: 27160, gold: 180 },
  { type: "armor", rarity: "legendary/relic", target: 16, chances: 10, stones: 686, shards: 216, leapstones: 14, fusionMaterial: 10, silver: 27820, gold: 210 },
  { type: "armor", rarity: "legendary/relic", target: 17, chances: 10, stones: 686, shards: 292, leapstones: 16, fusionMaterial: 10, silver: 28420, gold: 250 },
  { type: "armor", rarity: "legendary/relic", target: 18, chances: 5, stones: 686, shards: 396, leapstones: 16, fusionMaterial: 12, silver: 29040, gold: 280 },
  { type: "armor", rarity: "legendary/relic", target: 19, chances: 5, stones: 780, shards: 536, leapstones: 18, fusionMaterial: 14, silver: 29660, gold: 320 },
  { type: "armor", rarity: "legendary/relic", target: 20, chances: 3, stones: 780, shards: 728, leapstones: 20, fusionMaterial: 14, silver: 30320, gold: 350 },
  { type: "armor", rarity: "legendary/relic", target: 21, chances: 3, stones: 780, shards: 988, leapstones: 22, fusionMaterial: 16, silver: 30980, gold: 360 },
  { type: "armor", rarity: "legendary/relic", target: 22, chances: 1, stones: 874, shards: 1340, leapstones: 24, fusionMaterial: 18, silver: 31640, gold: 380 },
  { type: "armor", rarity: "legendary/relic", target: 23, chances: 1, stones: 874, shards: 1818, leapstones: 26, fusionMaterial: 20, silver: 32320, gold: 390 },
  { type: "armor", rarity: "legendary/relic", target: 24, chances: 0.5, stones: 874, shards: 2466, leapstones: 28, fusionMaterial: 22, silver: 33040, gold: 400 },
  { type: "armor", rarity: "legendary/relic", target: 25, chances: 0.5, stones: 968, shards: 3346, leapstones: 30, fusionMaterial: 24, silver: 33740, gold: 420 },

  // Epic weapon
  { type: "weapon", rarity: "epic", target: 1, chances: 100, stones: 138, shards: 32, leapstones: 4, silver: 17040 },
  { type: "weapon", rarity: "epic", target: 2, chances: 100, stones: 138, shards: 32, leapstones: 4, silver: 17460 },
  { type: "weapon", rarity: "epic", target: 3, chances: 100, stones: 198, shards: 32, leapstones: 6, silver: 17900 },
  { type: "weapon", rarity: "epic", target: 4, chances: 100, stones: 198, shards: 46, leapstones: 6, fusionMaterial: 2, silver: 17040 },
  { type: "weapon", rarity: "epic", target: 5, chances: 100, stones: 198, shards: 46, leapstones: 6, fusionMaterial: 2, silver: 17460 },
  { type: "weapon", rarity: "epic", target: 6, chances: 100, stones: 198, shards: 46, leapstones: 6, fusionMaterial: 2, silver: 17900 },
  { type: "weapon", rarity: "epic", target: 7, chances: 60, stones: 258, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 18320, gold: 120 },
  { type: "weapon", rarity: "epic", target: 8, chances: 45, stones: 258, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 18780, gold: 120 },
  { type: "weapon", rarity: "epic", target: 9, chances: 30, stones: 258, shards: 60, leapstones: 8, fusionMaterial: 4, silver: 19240, gold: 120 },
  { type: "weapon", rarity: "epic", target: 10, chances: 30, stones: 320, shards: 74, leapstones: 10, fusionMaterial: 4, silver: 19720, gold: 120 },
  { type: "weapon", rarity: "epic", target: 11, chances: 30, stones: 320, shards: 74, leapstones: 10, fusionMaterial: 4, silver: 20200, gold: 120 },
  { type: "weapon", rarity: "epic", target: 12, chances: 15, stones: 320, shards: 74, leapstones: 10, fusionMaterial: 4, silver: 20700, gold: 120 },
  { type: "weapon", rarity: "epic", target: 13, chances: 15, stones: 380, shards: 88, leapstones: 10, fusionMaterial: 6, silver: 21200, gold: 120 },
  { type: "weapon", rarity: "epic", target: 14, chances: 15, stones: 380, shards: 88, leapstones: 12, fusionMaterial: 6, silver: 21720, gold: 120 },
  { type: "weapon", rarity: "epic", target: 15, chances: 10, stones: 380, shards: 88, leapstones: 12, fusionMaterial: 6, silver: 22260, gold: 120 },

  // Legendary+ weapon
  { type: "weapon", rarity: "legendary/relic", target: 7, chances: 60, stones: 672, shards: 156, leapstones: 12, fusionMaterial: 6, silver: 31920, gold: 320 },
  { type: "weapon", rarity: "legendary/relic", target: 8, chances: 45, stones: 672, shards: 156, leapstones: 14, fusionMaterial: 6, silver: 32700, gold: 320 },
  { type: "weapon", rarity: "legendary/relic", target: 9, chances: 30, stones: 672, shards: 156, leapstones: 14, fusionMaterial: 8, silver: 33520, gold: 320 },
  { type: "weapon", rarity: "legendary/relic", target: 10, chances: 30, stones: 830, shards: 192, leapstones: 16, fusionMaterial: 8, silver: 34340, gold: 320 },
  { type: "weapon", rarity: "legendary/relic", target: 11, chances: 30, stones: 830, shards: 192, leapstones: 16, fusionMaterial: 8, silver: 35180, gold: 330 },
  { type: "weapon", rarity: "legendary/relic", target: 12, chances: 15, stones: 830, shards: 192, leapstones: 18, fusionMaterial: 8, silver: 36040, gold: 330 },
  { type: "weapon", rarity: "legendary/relic", target: 13, chances: 15, stones: 968, shards: 228, leapstones: 18, fusionMaterial: 10, silver: 36940, gold: 330 },
  { type: "weapon", rarity: "legendary/relic", target: 14, chances: 15, stones: 968, shards: 228, leapstones: 20, fusionMaterial: 10, silver: 37840, gold: 330 },
  { type: "weapon", rarity: "legendary/relic", target: 15, chances: 10, stones: 968, shards: 228, leapstones: 20, fusionMaterial: 10, silver: 38760, gold: 330 },
  { type: "weapon", rarity: "legendary/relic", target: 16, chances: 10, stones: 1144, shards: 310, leapstones: 22, fusionMaterial: 12, silver: 39720, gold: 410 },
  { type: "weapon", rarity: "legendary/relic", target: 17, chances: 10, stones: 1144, shards: 422, leapstones: 24, fusionMaterial: 14, silver: 40580, gold: 480 },
  { type: "weapon", rarity: "legendary/relic", target: 18, chances: 5, stones: 1144, shards: 572, leapstones: 28, fusionMaterial: 16, silver: 41460, gold: 540 },
  { type: "weapon", rarity: "legendary/relic", target: 19, chances: 5, stones: 1300, shards: 776, leapstones: 30, fusionMaterial: 18, silver: 42360, gold: 640 },
  { type: "weapon", rarity: "legendary/relic", target: 20, chances: 3, stones: 1300, shards: 1054, leapstones: 32, fusionMaterial: 20, silver: 43260, gold: 730 },
  { type: "weapon", rarity: "legendary/relic", target: 21, chances: 3, stones: 1300, shards: 1432, leapstones: 34, fusionMaterial: 22, silver: 44200, gold: 750 },
  { type: "weapon", rarity: "legendary/relic", target: 22, chances: 1, stones: 1458, shards: 1944, leapstones: 38, fusionMaterial: 26, silver: 45160, gold: 780 },
  { type: "weapon", rarity: "legendary/relic", target: 23, chances: 1, stones: 1458, shards: 2640, leapstones: 42, fusionMaterial: 28, silver: 46140, gold: 810 },
  { type: "weapon", rarity: "legendary/relic", target: 24, chances: 0.5, stones: 1458, shards: 3586, leapstones: 44, fusionMaterial: 32, silver: 47160, gold: 840 },
  { type: "weapon", rarity: "legendary/relic", target: 25, chances: 0.5, stones: 1614, shards: 4868, leapstones: 48, fusionMaterial: 36, silver: 48180, gold: 870 }
];
