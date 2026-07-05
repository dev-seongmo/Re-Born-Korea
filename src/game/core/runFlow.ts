import {
  drawNextPrototypeEventId,
  finalInterviewEventId,
  getPrototypeEventById,
  hasRemainingTutorialEvents,
  isTutorialEventId,
} from "../content/eventCards";
import {
  getNextInterviewEventId,
  isInterviewEventId,
  lastInterviewEventId,
} from "../content/eventCards/interview";
import { resolveTurn } from "../systems/turnSystem";
import type {
  EventCard,
  EventChoice,
  GameAction,
  GameState,
  MetaState,
  RunScene,
  RunState,
} from "./gameTypes";

type TurnResolvedPayload = Extract<
  GameAction,
  { type: "turn/resolved" }
>["payload"];

export function toAppScene(scene: RunScene): GameState["appScene"] {
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

export function getCurrentRunEvent(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
): EventCard | null {
  const eventId =
    session.currentEventId ?? getNextRunEventId(session, completedRunCount, meta);

  return getPrototypeEventById(eventId);
}

export function getNextRunEventId(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
) {
  return session.turn + 1 >= session.maxTurns
    ? finalInterviewEventId
    : drawNextPrototypeEventId(
        session.eventHistory,
        completedRunCount,
        meta.pendingFirstClearTutorial,
        {
          nextTurn: session.turn + 1,
          girlfriendStatus: session.relationship.girlfriendStatus,
          phase2Unlocked: meta.isFirstCleared,
        },
      );
}

export function hasRunResultTutorialJustEnded(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
) {
  return (
    session.latestResult !== null &&
    isTutorialEventId(session.latestResult.eventId) &&
    !hasRemainingTutorialEvents(
      session.eventHistory,
      completedRunCount,
      meta.pendingFirstClearTutorial,
    )
  );
}

export function resolveChoiceForRun(params: {
  session: RunState;
  event: EventCard;
  choice: EventChoice;
  completedRunCount: number;
  meta: MetaState;
}): {
  turnPayload: TurnResolvedPayload;
  autoContinueEventId: string | null;
  exitsTutorialFlow: boolean;
} {
  const { session, event, choice, completedRunCount, meta } = params;
  const isTutorialEvent = isTutorialEventId(event.id);
  const nextInterviewEventId = getNextInterviewEventId(event.id);
  const isIntermediateInterviewEvent =
    isInterviewEventId(event.id) && nextInterviewEventId !== null;
  const resolvedTurn = resolveTurn({
    session,
    event,
    choice,
    completedRunCount,
  });

  const turnPayload: TurnResolvedPayload =
    isTutorialEvent || isIntermediateInterviewEvent
      ? {
          ...resolvedTurn,
          consumesTurn: false,
          nextScene: resolvedTurn.gameOverReason ? "game-over" : "event",
        }
      : event.id === lastInterviewEventId
        ? {
            ...resolvedTurn,
            nextScene: "ending",
          }
        : resolvedTurn;

  if (
    (!isTutorialEvent && !isIntermediateInterviewEvent) ||
    resolvedTurn.gameOverReason
  ) {
    return {
      turnPayload,
      autoContinueEventId: null,
      exitsTutorialFlow: false,
    };
  }

  const nextEventId =
    nextInterviewEventId ??
    getNextRunEventId(
      {
        ...session,
        eventHistory: [...session.eventHistory, event.id],
      },
      completedRunCount,
      meta,
    );

  return {
    turnPayload,
    autoContinueEventId: nextEventId,
    exitsTutorialFlow: isTutorialEvent && !isTutorialEventId(nextEventId),
  };
}
