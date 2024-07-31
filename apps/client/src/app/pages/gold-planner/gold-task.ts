export interface Gate {
  name: string,
  taskName?: string,
  completionId: string,
  chestId?: string;
  modes: {
    name: string,
    HMThreashold: number,
    goldILvlLimit: number,
    goldReward: number,
    chestPrice: number,
  }[],
}

export interface GoldTask {
  name: string;
  taskName?: string;
  gates: Gate[]
}
