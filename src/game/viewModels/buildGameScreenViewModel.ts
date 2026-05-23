import type { Dispatch } from "react";
import { audioManager } from "../../audio/audioManager";
import {
  drawNextPrototypeEventId,
  finalInterviewEventId,
  getPrototypeEventById,
  hasRemainingTutorialEvents,
  isTutorialEventId,
} from "../content/eventCards";
import type {
  GameAction,
  RunState,
  VisibleMetricKey,
} from "../core/gameTypes";
import { getEndingResult } from "../selectors/getEndingResult";
import { getCurrentLabel } from "../selectors/getCurrentLabel";
import { resolveTurn } from "../systems/turnSystem";
import { evaluateInterviewOutcome } from "../systems/interviewSystem";
import type {
  EventPanelViewModel,
  GameScreenViewModel,
  StatusItemViewModel,
} from "./gameScreenViewModel";

const statusItemsConfig: Array<{
  key: VisibleMetricKey;
  label: string;
}> = [
  { key: "spec", label: "Spec" },
  { key: "money", label: "Money" },
  { key: "reputation", label: "Reputation" },
  { key: "mental", label: "Mental" },
];

function buildStatusItems(session: RunState): StatusItemViewModel[] {
  return statusItemsConfig.map((item) => ({
    key: item.key,
    label: item.label,
    value: session.metrics[item.key],
  }));
}

function getCurrentEvent(session: RunState) {
  const eventId =
    session.currentEventId ?? drawNextPrototypeEventId(session.eventHistory);

  return getPrototypeEventById(eventId);
}

function getNextEventId(session: RunState) {
  return session.turn + 1 >= session.maxTurns - 1
    ? finalInterviewEventId
    : drawNextPrototypeEventId(session.eventHistory);
}

function buildResolveChoice(
  session: RunState,
  dispatch: Dispatch<GameAction>,
  eventPanel: EventPanelViewModel,
) {
  return (choice: Parameters<EventPanelViewModel["onResolveChoice"]>[0]) => {
    const event = eventPanel.event;

    audioManager.play("choice.confirm", session.settings.sfxVolume);

    dispatch({
      type: "turn/resolved",
      payload: resolveTurn({
        session,
        event,
        choice,
      }),
    });
  };
}

function buildEventPanel(
  session: RunState,
  dispatch: Dispatch<GameAction>,
): EventPanelViewModel {
  const event = getCurrentEvent(session);

  if (!event) {
    throw new Error("No event available for current game state.");
  }

  const basePanel: EventPanelViewModel = {
    narrativeText: event.text,
    event,
    onResolveChoice: () => undefined,
  };

  basePanel.onResolveChoice = buildResolveChoice(session, dispatch, basePanel);

  if (session.scene === "result" && session.latestResult) {
    const tutorialJustEnded =
      isTutorialEventId(session.latestResult.eventId) &&
      !hasRemainingTutorialEvents(session.eventHistory);

    return {
      ...basePanel,
      narrativeText: session.latestResult.text,
      disabled: true,
      continueLabel:
        session.turn + 1 >= session.maxTurns
          ? "Finish"
          : tutorialJustEnded
            ? "Start Main Run"
            : session.turn + 1 >= session.maxTurns - 1
              ? "Go to Interview"
              : "Next Event",
      onContinue: () =>
        dispatch({
          type: "run/continued",
          payload: {
            nextEventId: getNextEventId(session),
          },
        }),
    };
  }

  return basePanel;
}

export function buildGameScreenViewModel(
  session: RunState,
  dispatch: Dispatch<GameAction>,
): GameScreenViewModel {
  const remainingDays = Number.isFinite(session.maxTurns)
    ? Math.max(session.maxTurns - session.turn - 1, 0)
    : 0;
  const turnLabel = Number.isFinite(session.maxTurns)
    ? remainingDays === 0
      ? "Interview Day"
      : `Interview D-${remainingDays}`
    : `Turn ${session.turn + 1}`;
  const currentLabel = getCurrentLabel(session);
  const statusItems = buildStatusItems(session);

  if (Number.isFinite(session.maxTurns) && session.turn >= session.maxTurns) {
    const ending = getEndingResult(session);
    const interview = evaluateInterviewOutcome(session);
    const outcome = interview.passed ? "employed" : "failed";

    return {
      turnLabel,
      currentLabel,
      statusItems,
      endingPanel: {
        eyebrow: outcome === "employed" ? "Run Complete" : "Run Failed",
        title: ending.title,
        summary: ending.summary,
        reveal: ending.reveal,
        coda: ending.coda,
        nextLabel: outcome === "employed" ? "Open Memory Hub" : "Return to Title",
        onContinue: () =>
          dispatch({
            type: "run/completed",
            payload: {
              endingId: ending.id,
              outcome,
              discoveredMemoryShardIds: session.memoryTags,
            },
          }),
      },
      eventPanel: buildEventPanel(session, dispatch),
    };
  }

  return {
    turnLabel,
    currentLabel,
    statusItems,
    eventPanel: buildEventPanel(session, dispatch),
  };
}
