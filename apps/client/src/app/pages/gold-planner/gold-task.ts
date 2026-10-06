import { Character } from "../../model/character/character";

export interface Gate {
  name: string,
  taskName?: string,
  completionId: string,
  chestId?: string;
  modes: {
    name: string,
    HMThreashold?: number,
    NightmareThreashold?: number,
    goldILvlLimit: number,
    unboundGoldReward: number,
    boundGoldReward: number,
    chestPrice: number,
  }[],
  reset?: resetType
}

export interface GoldTask {
  name: string;
  taskName: string;
  gates: Gate[]
}


export enum resetType {
  weekly,
  biWeekly,
  biWeeklyOffset
}

export function canRunHardModeForGateAndCharacter(gate: Gate, character: Character): boolean {
  const normalMode = gate.modes.find(mode => mode.name === 'NM')
  return normalMode?.HMThreashold ? normalMode.HMThreashold <= character.ilvl : true
}

export function canRunNightmareModeForGateAndCharacter(gate: Gate, character: Character): boolean {
  const hardMode = gate.modes.find(mode => mode.name === 'HM')
  return hardMode?.NightmareThreashold ? hardMode.NightmareThreashold <= character.ilvl : true
}

export function getHigherModeForGate(gate: Gate, selectedMode: string, character: Character): string | undefined {
  if (selectedMode === 'NM') {
    if (gate.modes.some(mode => mode.name === 'Nightmare') && canRunNightmareModeForGateAndCharacter(gate, character)) {
      return 'Nightmare'
    }
    if (gate.modes.some(mode => mode.name === 'HM') && canRunHardModeForGateAndCharacter(gate, character)) {
      return 'HM'
    }
  } else if (selectedMode === 'HM' && gate.modes.some(mode => mode.name === 'Nightmare') && canRunNightmareModeForGateAndCharacter(gate, character)) {
    return 'Nightmare'
  }

  return undefined;
}