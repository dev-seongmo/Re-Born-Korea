import {
  createInitialGameState,
  createInitialMetaState,
  createInitialRunState,
} from "../core/gameState";
import type { GameState } from "../core/gameTypes";

type Phase2DebugSave = GameState | { state: GameState };

const phase2DebugSave: Phase2DebugSave | null = {
  state: {
    appScene: "run-event",
    run: {
      scene: "event",
      turn: 0,
      maxTurns: 30,
      profile: {
        name: "페이즈투",
      },
      archetype: {
        id: "average",
        name: "막 도착한 영혼",
        description: "아직 판단도, 구원도, 정착도 끝나지 않은 상태다.",
        metrics: {
          spec: 46,
          money: 46,
          reputation: 46,
          mental: 46,
        },
      },
      metrics: {
        spec: 46,
        money: 46,
        reputation: 46,
        mental: 46,
      },
      selfTrust: 50,
      identityStage: 0,
      currentEventId: "first-clear-memory-shard-congrats",
      memoryTags: [],
      tendencyScores: {
        spec: 0,
        money: 0,
        reputation: 0,
        mental: 0,
        selfTrust: 0,
        comparison: 0,
      },
      relationship: {
        girlfriendStatus: "none",
      },
      eventHistory: [],
      latestResult: null,
      gameOverReason: null,
      settings: {
        reducedMotion: false,
        particleLevel: "medium",
        screenShake: true,
        masterVolume: 0.8,
        musicVolume: 0.5,
        sfxVolume: 0.7,
      },
      runOutcome: null,
    },
    meta: {
      playerName: "페이즈투",
      runCount: 2,
      successCount: 1,
      isFirstCleared: true,
      pendingFirstClearTutorial: true,
      unlockedMemoryShardIds: [
        "self_pace",
        "warm_meal",
        "name_return",
        "girlfriend_first_meet",
        "old_love",
        "honesty",
        "rest",
        "girlfriend_confession",
        "friendship",
        "asked_rule",
        "survival",
        "small_comfort",
        "interview_day",
        "steady_answer",
      ],
      unlockedCardIds: [],
      seenEndingIds: ["nameReborn"],
      trueEndingUnlocked: false,
      trueEndingSeen: false,
    },
  },
};

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
