import {
  createInitialGameState,
  createInitialMetaState,
  createInitialRunState,
} from "./gameState";
import type { GameState, MetaState, RunState } from "./gameTypes";

const STORAGE_KEY = "reborn-korea.autosave";
const SAVE_VERSION = 1;

type PersistedGameState = {
  version: number;
  savedAt: string;
  state: GameState;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hydrateRunState(value: unknown): RunState | null {
  if (!isObject(value)) {
    return null;
  }

  return createInitialRunState(value as Partial<RunState>);
}

function hydrateMetaState(value: unknown): MetaState {
  if (!isObject(value)) {
    return createInitialMetaState();
  }

  return {
    ...createInitialMetaState(),
    ...(value as Partial<MetaState>),
  };
}

export function loadPersistedGameState(): GameState {
  if (typeof window === "undefined") {
    return createInitialGameState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return createInitialGameState();
    }

    const parsed = JSON.parse(raw) as PersistedGameState;

    if (!isObject(parsed) || parsed.version !== SAVE_VERSION || !isObject(parsed.state)) {
      return createInitialGameState();
    }

    return {
      ...createInitialGameState(),
      ...parsed.state,
      run: hydrateRunState(parsed.state.run),
      meta: hydrateMetaState(parsed.state.meta),
    };
  } catch {
    return createInitialGameState();
  }
}

export function persistGameState(state: GameState) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: PersistedGameState = {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    state,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
