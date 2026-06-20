import {
  countUnlockedDefinedMemoryShards,
  memoryShards,
} from "../content/memoryShards";
import { trueEndingStoryCards } from "../content/trueEnding";
import {
  drawNextPrototypeEventId,
  isFirstClearTutorialEventId,
} from "../content/eventCards";
import { runConfig } from "../config/runConfig";
import { clampMetric } from "../systems/metricSystem";
import {
  DEFAULT_COMPANY_NAME,
  sanitizeCompanyName,
  sanitizePlayerName,
} from "../utils/playerName";
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
  const targetCompany =
    state.meta.targetCompany ||
    state.run?.profile.targetCompany ||
    DEFAULT_COMPANY_NAME;

  return createInitialRunState({
    scene: "event",
    archetype,
    profile: { name: playerName, targetCompany },
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
          trueEndingProgress: null,
          run: createStartedRunForNextLife(state),
        };
      }

      const nextRun = createInitialRunState({
        profile: {
          name: state.meta.playerName || "이름 없음",
          targetCompany: state.meta.targetCompany,
        },
      });

      return {
        ...state,
        appScene: "run-setup",
        trueEndingProgress: null,
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
        trueEndingProgress: null,
      };

    case "debug/phase2SaveLoaded":
      return action.payload.state;

    case "debug/trueEndingRequested":
      return {
        ...state,
        appScene: "true-ending",
        run: null,
        trueEndingProgress: { storyIndex: 0 },
      };

    case "profile/updated": {
      const nextProfileName =
        typeof action.payload.name === "string"
          ? sanitizePlayerName(action.payload.name)
          : undefined;
      const nextTargetCompany =
        typeof action.payload.targetCompany === "string"
          ? sanitizeCompanyName(action.payload.targetCompany)
          : undefined;

      return {
        ...state,
        meta:
          typeof nextProfileName === "string" ||
          typeof nextTargetCompany === "string"
            ? {
                ...state.meta,
                ...(typeof nextProfileName === "string"
                  ? { playerName: nextProfileName }
                  : null),
                ...(typeof nextTargetCompany === "string"
                  ? { targetCompany: nextTargetCompany }
                  : null),
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
            ...(typeof nextTargetCompany === "string"
              ? { targetCompany: nextTargetCompany }
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
          targetCompany:
            state.run?.profile.targetCompany ?? state.meta.targetCompany,
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
        countUnlockedDefinedMemoryShards(unlockedMemoryShardIds) >= memoryShards.length;
      const shouldShowTrueEnding =
        action.payload.outcome === "employed" && trueEndingUnlocked;

      return {
        appScene:
          shouldShowTrueEnding
            ? "true-ending"
            : action.payload.outcome === "employed"
            ? state.meta.successCount === 0
              ? "first-clear-reward"
              : "memory-hub"
            : "title",
        run: null,
        trueEndingProgress: shouldShowTrueEnding ? { storyIndex: 0 } : null,
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
        countUnlockedDefinedMemoryShards(unlockedMemoryShardIds) >= memoryShards.length;
      const nextRunCount = state.meta.runCount + 1;
      const archetype = pickPrototypeArchetype();
      const nextRun = createInitialRunState({
        scene: "event",
        archetype,
        profile: {
          name: state.meta.playerName || state.run?.profile.name || "이름 없음",
          targetCompany:
            state.meta.targetCompany ||
            state.run?.profile.targetCompany ||
            DEFAULT_COMPANY_NAME,
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
        trueEndingProgress: null,
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
        trueEndingProgress: null,
        run: createStartedRunForNextLife(state),
      };

    case "hub/trueEndingRequested":
      return state.meta.trueEndingUnlocked
        ? {
            ...state,
            appScene: "true-ending",
            trueEndingProgress: { storyIndex: 0 },
          }
        : state;

    case "trueEnding/started":
      return {
        ...state,
        appScene: "true-ending-story",
        trueEndingProgress: state.trueEndingProgress ?? { storyIndex: 0 },
      };

    case "trueEnding/storyAdvanced":
      return {
        ...state,
        appScene:
          state.trueEndingProgress &&
          state.trueEndingProgress.storyIndex >= trueEndingStoryCards.length - 1
            ? "true-ending-credits"
            : "true-ending-story",
        trueEndingProgress:
          state.trueEndingProgress &&
          state.trueEndingProgress.storyIndex >= trueEndingStoryCards.length - 1
            ? state.trueEndingProgress
            : {
                storyIndex: (state.trueEndingProgress?.storyIndex ?? 0) + 1,
              },
      };

    case "trueEnding/completed":
      return {
        ...state,
        appScene: "title",
        trueEndingProgress: null,
        meta: {
          ...state.meta,
          trueEndingSeen: true,
        },
      };

    default:
      return state;
  }
}
