import { Character } from "../../model/character/character";

export interface Gate {
  name: string,
  taskName?: string,
  completionId: string,
  chestId?: string;
  modes: GoldMode[];
  reset?: resetType
}

export type DifficultyTier = 'normal' | 'hard' | 'nightmare';

export interface GoldMode {
  name: string,
  difficultyTier?: DifficultyTier,
  HMThreashold?: number,
  NightmareThreashold?: number,
  goldILvlLimit: number,
  unboundGoldReward: number,
  boundGoldReward: number,
  chestPrice: number,
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

function getModeTierFromName(name: string): DifficultyTier | undefined {
  switch (name) {
    case 'NM':
      return 'normal';
    case 'HM':
      return 'hard';
    case 'Nightmare':
      return 'nightmare';
    default:
      return undefined;
  }
}

function getModeForTier(gate: Gate, tier: DifficultyTier): GoldMode | undefined {
  return gate.modes.find(mode => (mode.difficultyTier ?? getModeTierFromName(mode.name)) === tier);
}

export function getModeForSelection(gate: Gate, selection: string | undefined): GoldMode | undefined {
  if (!selection || selection === 'Mixed') return undefined;

  const namedMode = gate.modes.find(mode => mode.name === selection);
  if (namedMode) return namedMode;

  const tier = getModeTierFromName(selection);
  return tier ? getModeForTier(gate, tier) : undefined;
}

export function getModeLabelForSelection(gate: Gate, selection: string | undefined, defaultLabel: string): string {
  const mode = getModeForSelection(gate, selection);
  return mode?.difficultyTier ? mode.name : defaultLabel;
}

function getModeSelection(mode: GoldMode): string {
  const tier = mode.difficultyTier ?? getModeTierFromName(mode.name);
  switch (tier) {
    case 'normal':
      return 'NM';
    case 'hard':
      return 'HM';
    case 'nightmare':
      return 'Nightmare';
    default:
      return mode.name;
  }
}

export function canRunHardModeForGateAndCharacter(gate: Gate, character: Character): boolean {
  const normalMode = getModeForTier(gate, 'normal')
  return normalMode?.HMThreashold ? normalMode.HMThreashold <= character.ilvl : true
}

export function canRunNightmareModeForGateAndCharacter(gate: Gate, character: Character): boolean {
  const hardMode = getModeForTier(gate, 'hard')
  return hardMode?.NightmareThreashold ? hardMode.NightmareThreashold <= character.ilvl : true
}

export function getHigherModeForGate(gate: Gate, selectedMode: string, character: Character): string | undefined {
  const selectedTier = getModeForSelection(gate, selectedMode)?.difficultyTier
    ?? getModeTierFromName(selectedMode);

  if (selectedTier === 'normal') {
    const nightmareMode = getModeForTier(gate, 'nightmare');
    if (nightmareMode && canRunNightmareModeForGateAndCharacter(gate, character)) {
      return getModeSelection(nightmareMode)
    }
    const hardMode = getModeForTier(gate, 'hard');
    if (hardMode && canRunHardModeForGateAndCharacter(gate, character)) {
      return getModeSelection(hardMode)
    }
  } else if (selectedTier === 'hard') {
    const nightmareMode = getModeForTier(gate, 'nightmare');
    if (nightmareMode && canRunNightmareModeForGateAndCharacter(gate, character)) {
      return getModeSelection(nightmareMode)
    }
  }

  return undefined;
}