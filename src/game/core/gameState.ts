import { archetypes } from "../content/archetypes";
import type {
  GameSession,
  PlayerProfile,
  TendencyScores,
  VisibleMetrics,
} from "./gameTypes";

const defaultProfile: PlayerProfile = {
  name: "이름 없는 영혼",
  friendName: "남겨 둔 사람",
  favoriteFood: "따뜻한 국",
  favoritePlace: "집 앞 골목",
  cherishedThing: "아직 끝내지 못한 약속",
  comfortingWords: "천천히 가도 된다",
};

const defaultMetrics: VisibleMetrics = {
  spec: 50,
  money: 50,
  reputation: 50,
  mental: 50,
};

const defaultTendencies: TendencyScores = {
  spec: 0,
  money: 0,
  reputation: 0,
  mental: 0,
  selfTrust: 0,
  comparison: 0,
};

export function createInitialGameSession(): GameSession {
  return {
    scene: "setup",
    turn: 0,
    maxTurns: Number.POSITIVE_INFINITY,
    profile: defaultProfile,
    archetype: null,
    metrics: defaultMetrics,
    selfTrust: 50,
    identityStage: 0,
    currentEventId: null,
    memoryTags: [],
    tendencyScores: defaultTendencies,
    eventHistory: [],
    latestResult: null,
    settings: {
      reducedMotion: false,
      particleLevel: "medium",
      screenShake: true,
      masterVolume: 0.8,
      musicVolume: 0.5,
      sfxVolume: 0.7,
    },
  };
}

export function pickPrototypeArchetype() {
  return (
    archetypes.find((archetype) => archetype.id === "average") ?? archetypes[0]
  );
}
