import { memoryShards } from "../content/memoryShards";
import {
  drawNextPrototypeEventId,
  isFirstClearTutorialEventId,
} from "../content/eventCards";
import { getGameOverFinalEventId } from "../content/eventCards/gameOverFinalEvents";
import { runConfig } from "../config/runConfig";
import { clampMetric } from "../systems/metricSystem";
import { sanitizePlayerName } from "../utils/playerName";
import {
  createInitialGameState,
  createInitialRunState,
  pickPrototypeArchetype,
} from "./gameState";
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
    case "game-over-final":
      return "run-event";
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

function createStartedRunForNextLife(state: GameState) {
  const archetype = pickPrototypeArchetype();
  const playerName = state.meta.playerName || state.run?.profile.name || "이름 없음";

  return createInitialRunState({
    scene: "event",
    archetype,
    profile: { name: playerName },
    metrics: archetype.metrics,
    currentEventId: drawNextPrototypeEventId(
      [],
      state.meta.runCount,
      state.meta.pendingFirstClearTutorial,
      {
        nextTurn: 1,
        girlfriendStatus: "none",
        phase2Unlocked: state.meta.isFirstCleared,
      },
    ),
    maxTurns: runConfig.maxTurns,
  });
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "app/newRunRequested": {
      if (state.meta.runCount > 0) {
        return {
          ...state,
          appScene: "run-event",
          run: createStartedRunForNextLife(state),
        };
      }

      const nextRun = createInitialRunState({
        profile: {
          name: state.meta.playerName || "이름 없음",
        },
      });

      return {
        ...state,
        appScene: "run-setup",
        run: nextRun,
      };
    }

    case "app/newGameResetRequested": {
      return createInitialGameState();
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

    case "debug/phase2SaveLoaded":
      return action.payload.state;

    case "profile/updated": {
      const nextProfileName =
        typeof action.payload.name === "string"
          ? sanitizePlayerName(action.payload.name)
          : undefined;

      return {
        ...state,
        meta:
          typeof nextProfileName === "string"
            ? {
                ...state.meta,
                playerName: nextProfileName,
              }
            : state.meta,
        run: updateRun(state.run, (run) => ({
          ...run,
          profile: {
            ...run.profile,
            ...action.payload,
            ...(typeof nextProfileName === "string"
              ? { name: nextProfileName }
              : null),
          },
        })),
      };
    }

    case "run/started":
      return {
        ...state,
        appScene: "run-event",
        meta: {
          ...state.meta,
          playerName: state.run?.profile.name ?? state.meta.playerName,
        },
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
          currentEventId:
            action.payload.nextScene === "game-over-final" &&
            action.payload.gameOverReason
              ? getGameOverFinalEventId(action.payload.gameOverReason)
              : action.payload.eventId,
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
          relationship: {
            ...run.relationship,
            ...action.payload.relationshipEffect,
          },
        })),
      };

    case "run/continued":
      return {
        ...state,
        appScene: "run-event",
        meta:
          state.run &&
          state.meta.pendingFirstClearTutorial &&
          state.run.eventHistory.some((eventId) =>
            isFirstClearTutorialEventId(eventId),
          ) &&
          !isFirstClearTutorialEventId(action.payload.nextEventId)
            ? {
                ...state.meta,
                pendingFirstClearTutorial: false,
              }
            : state.meta,
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
          action.payload.outcome === "employed"
            ? state.meta.successCount === 0
              ? "first-clear-reward"
              : "memory-hub"
            : "title",
        run: null,
        meta: {
          ...state.meta,
          runCount: state.meta.runCount + 1,
          successCount:
            state.meta.successCount +
            (action.payload.outcome === "employed" ? 1 : 0),
          isFirstCleared:
            action.payload.outcome === "employed" || state.meta.isFirstCleared,
          pendingFirstClearTutorial:
            action.payload.outcome === "employed" && state.meta.successCount === 0
              ? true
              : state.meta.pendingFirstClearTutorial,
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
      const nextRunCount = state.meta.runCount + 1;
      const archetype = pickPrototypeArchetype();
      const nextRun = createInitialRunState({
        scene: "event",
        archetype,
        profile: {
          name: state.meta.playerName || state.run?.profile.name || "이름 없음",
        },
        metrics: archetype.metrics,
        currentEventId: drawNextPrototypeEventId(
          [],
          nextRunCount,
          state.meta.pendingFirstClearTutorial,
          {
            nextTurn: 1,
            girlfriendStatus: "none",
            phase2Unlocked: state.meta.isFirstCleared,
          },
        ),
        maxTurns: state.run?.maxTurns ?? runConfig.maxTurns,
      });

      return {
        appScene: "run-event",
        run: nextRun,
        meta: {
          ...state.meta,
          runCount: nextRunCount,
          unlockedMemoryShardIds,
          trueEndingUnlocked,
        },
      };
    }

    case "hub/continueRequested":
    case "reward/continueRequested":
      return {
        ...state,
        appScene: "run-event",
        run: createStartedRunForNextLife(state),
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
