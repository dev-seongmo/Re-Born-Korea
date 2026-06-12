import { archetypes } from "../content/archetypes";
import type {
  GameSession,
  GameState,
  GameSettings,
  MetaState,
  PlayerProfile,
  RunState,
  TendencyScores,
  VisibleMetrics,
} from "./gameTypes";

const defaultProfile: PlayerProfile = {
  name: "",
  targetCompany: "",
};

const defaultMetrics: VisibleMetrics = {
  spec: 46,
  money: 46,
  reputation: 46,
  mental: 46,
};

const defaultTendencies: TendencyScores = {
  spec: 0,
  money: 0,
  reputation: 0,
  mental: 0,
  selfTrust: 0,
  comparison: 0,
};

const defaultRelationship = {
  girlfriendStatus: "none" as const,
};

const defaultSettings: GameSettings = {
  reducedMotion: false,
  particleLevel: "medium",
  screenShake: true,
  masterVolume: 0.8,
  musicVolume: 0.5,
  sfxVolume: 0.7,
};

export function createInitialRunState(
  overrides: Partial<RunState> = {},
): RunState {
  const profile = {
    ...defaultProfile,
    ...overrides.profile,
  };

  return {
    scene: "setup",
    turn: 0,
    maxTurns: Number.POSITIVE_INFINITY,
    archetype: null,
    metrics: defaultMetrics,
    selfTrust: 50,
    identityStage: 0,
    currentEventId: null,
    memoryTags: [],
    tendencyScores: defaultTendencies,
    relationship: defaultRelationship,
    eventHistory: [],
    latestResult: null,
    gameOverReason: null,
    settings: defaultSettings,
    runOutcome: null,
    ...overrides,
    profile,
  };
}

export function createInitialMetaState(): MetaState {
  return {
    playerName: "",
    targetCompany: "",
    runCount: 0,
    successCount: 0,
    isFirstCleared: false,
    pendingFirstClearTutorial: false,
    unlockedMemoryShardIds: [],
    unlockedCardIds: [],
    seenEndingIds: [],
    trueEndingUnlocked: false,
    trueEndingSeen: false,
  };
}

export function createInitialGameState(): GameState {
  return {
    appScene: "title",
    run: null,
    meta: createInitialMetaState(),
    trueEndingProgress: null,
  };
}

export function createInitialGameSession(): GameSession {
  return createInitialRunState();
}

export function pickPrototypeArchetype() {
  return (
    archetypes.find((archetype) => archetype.id === "average") ?? archetypes[0]
  );
}
