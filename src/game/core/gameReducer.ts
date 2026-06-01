import { memoryShards } from "../content/memoryShards";
import { clampMetric } from "../systems/metricSystem";
import { createInitialGameState, createInitialRunState } from "./gameState";
import type {
  EndingId,
  GameAction,
  GameState,
  RunScene,
  RunState,
} from "./gameTypes";

function toAppScene(scene: RunScene): GameState["appScene"] {
  switch (scene) {
    case "setup":
      return "run-setup";
    case "event":
      return "run-event";
    case "result":
      return "run-result";
    case "ending":
      return "run-ending";
    case "game-over":
      return "run-game-over";
    default:
      return "run-event";
  }
}

function mergeEndingIds(existing: EndingId[], next: EndingId) {
  return existing.includes(next) ? existing : [...existing, next];
}

function mergeShardIds(existing: string[], discovered: string[]) {
  return Array.from(new Set([...existing, ...discovered]));
}

function updateRun(run: RunState | null, updater: (current: RunState) => RunState) {
  return run ? updater(run) : run;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "app/newRunRequested": {
      const nextRun = createInitialRunState();
      return {
        ...state,
        appScene: "run-setup",
        run: nextRun,
      };
    }

    case "app/newGameResetRequested": {
      const nextState = createInitialGameState();
      return {
        ...nextState,
        appScene: "run-setup",
        run: createInitialRunState(),
      };
    }

    case "app/continueRequested":
      return state.run
        ? {
            ...state,
            appScene: toAppScene(state.run.scene),
          }
        : state;

    case "app/encyclopediaRequested":
      return {
        ...state,
        appScene: "encyclopedia",
      };

    case "app/returnedToTitle":
      return {
        ...state,
        appScene: "title",
      };

    case "profile/updated":
      return {
        ...state,
        run: updateRun(state.run, (run) => ({
          ...run,
          profile: {
            ...run.profile,
            ...action.payload,
          },
        })),
      };

    case "run/started":
      return {
        ...state,
        appScene: "run-event",
        run: updateRun(state.run, (run) => ({
          ...run,
          scene: "event",
          archetype: action.payload.archetype,
          metrics: action.payload.archetype.metrics,
          currentEventId: action.payload.initialEventId,
          maxTurns: action.payload.maxTurns,
        })),
      };

    case "turn/resolved":
      return {
        ...state,
        appScene: toAppScene(action.payload.nextScene),
        run: updateRun(state.run, (run) => ({
          ...run,
          scene: action.payload.nextScene,
          turn: run.turn + (action.payload.consumesTurn === false ? 0 : 1),
          currentEventId: action.payload.eventId,
          eventHistory: [...run.eventHistory, action.payload.eventId],
          latestResult: action.payload.result,
          gameOverReason: action.payload.gameOverReason ?? null,
          metrics: {
            spec: clampMetric(action.payload.metrics.spec),
            money: clampMetric(action.payload.metrics.money),
            reputation: clampMetric(action.payload.metrics.reputation),
            mental: clampMetric(action.payload.metrics.mental),
          },
          selfTrust: clampMetric(action.payload.selfTrust),
          identityStage: action.payload.identityStage,
          memoryTags: action.payload.memoryTags,
          tendencyScores: action.payload.tendencyScores,
        })),
      };

    case "run/continued":
      return {
        ...state,
        appScene: "run-event",
        run: updateRun(state.run, (run) => ({
          ...run,
          scene: "event",
          currentEventId: action.payload.nextEventId,
          gameOverReason: null,
        })),
      };

    case "run/completed": {
      const unlockedMemoryShardIds = mergeShardIds(
        state.meta.unlockedMemoryShardIds,
        action.payload.discoveredMemoryShardIds,
      );
      const trueEndingUnlocked =
        unlockedMemoryShardIds.length >= memoryShards.length;

      return {
        appScene:
          action.payload.outcome === "employed" ? "memory-hub" : "title",
        run: null,
        meta: {
          runCount: state.meta.runCount + 1,
          successCount:
            state.meta.successCount +
            (action.payload.outcome === "employed" ? 1 : 0),
          unlockedMemoryShardIds,
          unlockedCardIds: state.meta.unlockedCardIds,
          seenEndingIds: mergeEndingIds(
            state.meta.seenEndingIds,
            action.payload.endingId,
          ),
          trueEndingUnlocked,
          trueEndingSeen: state.meta.trueEndingSeen,
        },
      };
    }

    case "run/gameOverAcknowledged": {
      const unlockedMemoryShardIds = mergeShardIds(
        state.meta.unlockedMemoryShardIds,
        action.payload.discoveredMemoryShardIds,
      );
      const trueEndingUnlocked =
        unlockedMemoryShardIds.length >= memoryShards.length;

      return {
        appScene: "title",
        run: null,
        meta: {
          ...state.meta,
          runCount: state.meta.runCount + 1,
          unlockedMemoryShardIds,
          trueEndingUnlocked,
        },
      };
    }

    case "hub/continueRequested":
      return {
        ...state,
        appScene: "title",
      };

    case "hub/trueEndingRequested":
      return state.meta.trueEndingUnlocked
        ? {
            ...state,
            appScene: "true-ending",
          }
        : state;

    case "trueEnding/completed":
      return {
        ...state,
        appScene: "title",
        meta: {
          ...state.meta,
          trueEndingSeen: true,
        },
      };

    default:
      return state;
  }
}
