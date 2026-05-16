export type SceneId =
  | "setup"
  | "archetypeIntro"
  | "event"
  | "roll"
  | "result"
  | "collapse"
  | "ending";

export type VisibleMetricKey = "spec" | "money" | "reputation" | "mental";

export type VisibleMetrics = Record<VisibleMetricKey, number>;

export type PlayerProfile = {
  name: string;
  friendName: string;
  favoriteFood: string;
  favoritePlace: string;
  cherishedThing: string;
  comfortingWords: string;
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
  results: RollOutcomeSet;
};

export type EventCard = {
  id: string;
  category:
    | "tutorial"
    | "interview"
    | "comparison"
    | "family"
    | "money"
    | "spec"
    | "mental"
    | "friendship"
    | "recovery";
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

export type EndingId = "proofOfWorth" | "barelySurvived" | "nameReborn";

export type EndingDefinition = {
  id: EndingId;
  title: string;
  summary: string;
  reveal: string;
  coda: string;
};

export type GameSession = {
  scene: SceneId;
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
  eventHistory: string[];
  latestResult: EventResult | null;
  settings: GameSettings;
};

export type GameAction =
  | {
      type: "profile/updated";
      payload: Partial<PlayerProfile>;
    }
  | {
      type: "game/started";
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
        nextScene: SceneId;
      };
    }
  | {
      type: "scene/set";
      payload: SceneId;
    }
  | {
      type: "event/queued";
      payload: {
        eventId: string;
      };
    };
