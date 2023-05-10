export enum LostarkClass {
  DESTROYER = 0,
  SLAYER = 1,
  ARCANA = 2,
  BERSERKER = 3,
  WARDANCER = 4,
  DEADEYE = 5,
  GUNLANCER = 7,
  GUNNER = 8,
  SCRAPPER = 9,
  MAGE = 10,
  SUMMONER = 11,
  WARRIOR = 12,
  SOULFIST = 13,
  SHARPSHOOTER = 14,
  ARTILLERIST = 15,
  BARD = 16,
  GLAIVIER = 17,
  ASSASSIN = 18,
  DEATHBLADE = 19,
  SHADOWHUNTER = 20,
  PALADIN = 21,
  SCOUTER = 22,
  REAPER = 23,
  GUNSLINGER = 25,
  STRIKER = 27,
  SORCERESS = 28,
  ARTIST = 29,
  SLAYER = 30
}

export function isSupportClass(c: LostarkClass): boolean {
  return [LostarkClass.BARD, LostarkClass.PALADIN, LostarkClass.ARTIST].includes(+c);
}
