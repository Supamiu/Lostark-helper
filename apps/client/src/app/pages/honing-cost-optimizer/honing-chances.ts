export interface HoningChances {
  type: "weapon" | "armor";
  rarity: "epic" | "legendary/relic";
  target: number;
  chances: number;
  stones: number;
  shards: number;
  leapstones: number;
  fusionMaterial: number;
  silver: number;
  gold?: number;
}


export const honingChances: HoningChances[] = [
  // Epic armor
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

  // Epic weapon
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
  { type: "weapon", rarity: "legendary/relic", target: 20, chances: 3, stones: 1300, shards: 1054, leapstones: 32, fusionMaterial: 20, silver: 43260, gold: 730 }
];
