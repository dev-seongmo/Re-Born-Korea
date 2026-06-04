import {
  createInitialGameState,
  createInitialMetaState,
  createInitialRunState,
} from "../core/gameState";
import type { GameState } from "../core/gameTypes";

type Phase2DebugSave = GameState | { state: GameState };

const phase2DebugSave: Phase2DebugSave | null = null;

function hasState(value: Phase2DebugSave): value is { state: GameState } {
  return "state" in value;
}

export function getPhase2DebugGameState(): GameState | null {
  if (!phase2DebugSave) {
    return null;
  }

  const rawState = hasState(phase2DebugSave)
    ? phase2DebugSave.state
    : phase2DebugSave;

  return {
    ...createInitialGameState(),
    ...rawState,
    run: rawState.run ? createInitialRunState(rawState.run) : null,
    meta: {
      ...createInitialMetaState(),
      ...rawState.meta,
    },
  };
}
