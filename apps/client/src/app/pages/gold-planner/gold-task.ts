export interface GoldTask {
  name: string;
  completionId: string;
  taskName?: string;
  chestId?: string;
  modes: {
      name: string,
      goldReward: number,
      chestPrice: number,
      HMThreashold: number,
      goldILvlLimit: number
    }[]
}
