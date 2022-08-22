export interface Subtask {
  id: string;
  name: string;
  parentName: string;
  minIlvl: number;
  maxIlvl?: number;
  banner?: string;
}
