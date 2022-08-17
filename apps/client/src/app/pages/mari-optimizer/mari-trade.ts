import { GameCode } from "../../data/game-code";

export interface MariTrade {
  gameCode: GameCode;
  icon: string;
  name: string;
  quantity: number;
  crystalPrice: number;
  mbQuantity: number;
  minIlvl: number;
  maxIlvl: number;
}
