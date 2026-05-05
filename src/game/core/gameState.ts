import { archetypes } from "../content/archetypes";
import type { GameSession, PlayerProfile, TendencyScores, VisibleMetrics } from "./gameTypes";

const defaultProfile: PlayerProfile = {
  name: "성모",
  friendName: "민수",
  favoriteFood: "김치찌개",
  favoritePlace: "한강",
  cherishedThing: "게임 만들기",
  comfortingWords: "너는 지금도 충분히 잘 버티고 있어",
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
    maxTurns: 12,
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
  return archetypes[Math.floor(Math.random() * archetypes.length)];
}
