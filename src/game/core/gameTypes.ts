export type RunScene =
  | "setup"
  | "event"
  | "result"
  | "ending"
  | "game-over";

export type AppScene =
  | "title"
  | "run-setup"
  | "run-event"
  | "run-result"
  | "run-ending"
  | "run-game-over"
  | "first-clear-reward"
  | "memory-hub"
  | "true-ending"
  | "true-ending-story"
  | "true-ending-credits";

export type VisibleMetricKey = "spec" | "money" | "reputation" | "mental";

export type VisibleMetrics = Record<VisibleMetricKey, number>;

export type PlayerProfile = {
  name: string;
  targetCompany: string;
};

export type StartArchetypeId =
  | "stable"
  | "average"
  | "unstable"
  | "isolated"
  | "overExpected";

export type StartArchetype = {
  id: StartArchetypeId;
  name: string;
  description: string;
  metrics: VisibleMetrics;
};

export type TendencyScores = {
  spec: number;
  money: number;
  reputation: number;
  mental: number;
  selfTrust: number;
  comparison: number;
};

export type GirlfriendStatus = "none" | "met" | "dating" | "failed";

export type RelationshipState = {
  girlfriendStatus: GirlfriendStatus;
};

export type GameSettings = {
  reducedMotion: boolean;
  particleLevel: "high" | "medium" | "low" | "off";
  screenShake: boolean;
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
};

export type MetricDelta = Partial<VisibleMetrics>;

export type RollOutcomeBand = "bad" | "mixed" | "good";

export type RollOutcomeSet = Record<
  RollOutcomeBand,
  {
    text: string;
    delta?: MetricDelta;
    selfTrustDelta?: number;
  }
>;

export type EventChoice = {
  id: string;
  label: string;
  immediate: MetricDelta;
  selfTrustDelta: number;
  primaryStat: VisibleMetricKey;
  modifier: number;
  memoryTags?: string[];
  tendencyTags?: Array<keyof TendencyScores>;
  relationshipEffect?: Partial<RelationshipState>;
  results: RollOutcomeSet;
};

export type EventCard = {
  id: string;
  characterName?: string;
  imageSrc?: string;
  imageAlt?: string;
  category:
    | "tutorial"
    | "interview"
    | "comparison"
    | "family"
    | "money"
    | "spec"
    | "mental"
    | "friendship"
    | "recovery"
    | "girlfriend";
  phase: "early20s" | "mid20s" | "late20s";
  text: string;
  choices: [EventChoice, EventChoice];
};

export type EventResult = {
  eventId: string;
  choiceId: string;
  band: RollOutcomeBand;
  text: string;
};

export type GameOverReason =
  | "mental_zero"
  | "money_zero"
  | "reputation_zero"
  | "spec_zero"
  | "mental_max"
  | "money_max"
  | "reputation_max"
  | "spec_max";

export type EndingId = "proofOfWorth" | "barelySurvived" | "nameReborn";

export type EndingDefinition = {
  id: EndingId;
  title: string;
  summary: string;
  reveal: string;
  coda: string;
};

export type UnlockCardId =
  | "hidden_card_1"
  | "hidden_card_2"
  | "hidden_card_3"
  | "hidden_card_4";

export type UnlockCardDefinition = {
  id: UnlockCardId;
  title: string;
  description: string;
  flavor: string;
  imageId?: string;
};

export type UnlockSource =
  | {
      type: "choice";
      eventId: string;
      choiceId: string;
    }
  | {
      type: "ending";
      endingId: EndingId;
    }
  | {
      type: "memory";
      memoryShardId: string;
    };

export type RunOutcome = "failed" | "employed";

export type RunState = {
  scene: RunScene;
  turn: number;
  maxTurns: number;
  profile: PlayerProfile;
  archetype: StartArchetype | null;
  metrics: VisibleMetrics;
  selfTrust: number;
  identityStage: number;
  currentEventId: string | null;
  memoryTags: string[];
  tendencyScores: TendencyScores;
  relationship: RelationshipState;
  eventHistory: string[];
  latestResult: EventResult | null;
  gameOverReason: GameOverReason | null;
  settings: GameSettings;
  runOutcome: RunOutcome | null;
};

export type GameSession = RunState;

export type MetaState = {
  playerName: string;
  targetCompany: string;
  runCount: number;
  successCount: number;
  isFirstCleared: boolean;
  pendingFirstClearTutorial: boolean;
  unlockedMemoryShardIds: string[];
  unlockedCardIds: UnlockCardId[];
  seenEndingIds: EndingId[];
  trueEndingUnlocked: boolean;
  trueEndingSeen: boolean;
};

export type TrueEndingProgress = {
  storyIndex: number;
};

export type GameState = {
  appScene: AppScene;
  run: RunState | null;
  meta: MetaState;
  trueEndingProgress: TrueEndingProgress | null;
};

export type GameAction =
  | {
      type: "app/newRunRequested";
    }
  | {
      type: "app/newGameResetRequested";
    }
  | {
      type: "app/continueRequested";
    }
  | {
      type: "app/returnedToTitle";
    }
  | {
      type: "app/trueEndingReplayRequested";
    }
  | {
      type: "debug/phase2SaveLoaded";
      payload: {
        state: GameState;
      };
    }
  | {
      type: "debug/trueEndingRequested";
    }
  | {
      type: "profile/updated";
      payload: Partial<PlayerProfile>;
    }
  | {
      type: "run/started";
      payload: {
        archetype: StartArchetype;
        initialEventId: string;
        maxTurns: number;
      };
    }
  | {
      type: "turn/resolved";
      payload: {
        eventId: string;
        choiceId: string;
        result: EventResult;
        metrics: VisibleMetrics;
        selfTrust: number;
        identityStage: number;
        memoryTags: string[];
        tendencyScores: TendencyScores;
        relationshipEffect?: Partial<RelationshipState>;
        nextScene: RunScene;
        gameOverReason?: GameOverReason | null;
        consumesTurn?: boolean;
      };
    }
  | {
      type: "run/continued";
      payload: {
        nextEventId: string;
      };
    }
  | {
      type: "run/completed";
      payload: {
        endingId: EndingId;
        outcome: RunOutcome;
        discoveredMemoryShardIds: string[];
      };
    }
  | {
      type: "run/gameOverAcknowledged";
      payload: {
        discoveredMemoryShardIds: string[];
      };
    }
  | {
      type: "hub/continueRequested";
    }
  | {
      type: "reward/continueRequested";
    }
  | {
      type: "hub/trueEndingRequested";
    }
  | {
      type: "trueEnding/started";
    }
  | {
      type: "trueEnding/storyAdvanced";
    }
  | {
      type: "trueEnding/completed";
    };
