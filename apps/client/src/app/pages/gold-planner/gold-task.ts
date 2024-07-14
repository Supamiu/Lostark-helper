export interface GoldTask {
  name: string;
  completionId: string;
  entryId?: string;
  taskName?: string;
  goldReward?: number;
  goldRewardPerIlvl?: Record<number, number>;
  chestPrice?: number;
  chestId?: string;
  modes?: {
      name: string,
      goldReward: number,
      chestPrice: number,
      HMThreashold: number
    }[]
}
