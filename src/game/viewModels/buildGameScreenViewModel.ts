import type { Dispatch } from "react";
import { audioManager } from "../../audio/audioManager";
import {
  drawNextPrototypeEventId,
  finalInterviewEventId,
  getPrototypeEventById,
  hasRemainingTutorialEvents,
  isTutorialEventId,
} from "../content/eventCards";
import type { GameAction, GameSession } from "../core/gameTypes";
import { getEndingResult } from "../selectors/getEndingResult";
import { getCurrentLabel } from "../selectors/getCurrentLabel";
import { resolveTurn } from "../systems/turnSystem";
import type {
  EventPanelViewModel,
  GameScreenViewModel,
  StatusItemViewModel,
} from "./gameScreenViewModel";

const statusItemsConfig: Array<{
  id: string;
  label: string;
  key: keyof GameSession["metrics"];
}> = [
  { id: "spec", label: "Spec", key: "spec" },
  { id: "money", label: "Money", key: "money" },
  { id: "reputation", label: "Reputation", key: "reputation" },
  { id: "mental", label: "Mental", key: "mental" },
];

function buildStatusItems(session: GameSession): StatusItemViewModel[] {
  return statusItemsConfig.map((item) => ({
    key: item.id,
    label: item.label,
    value: session.metrics[item.key],
  }));
}

function buildEventPanel(
  session: GameSession,
  dispatch: Dispatch<GameAction>,
): EventPanelViewModel {
  const event =
    (session.currentEventId
      ? getPrototypeEventById(session.currentEventId)
      : null) ?? getPrototypeEventById(drawNextPrototypeEventId(session.eventHistory));

  if (!event) {
    throw new Error("No event available for current game state.");
  }

  return {
    categoryLabel: event.category,
    title: event.category === "interview" ? "Final Interview" : "Swipe to Choose",
    event,
    onResolveChoice: (choice) => {
      audioManager.play("choice.confirm", session.settings.sfxVolume);

      dispatch({
        type: "turn/resolved",
        payload: resolveTurn({
          session,
          event,
          choice,
        }),
      });
    },
  };
}

export function buildGameScreenViewModel(
  session: GameSession,
  dispatch: Dispatch<GameAction>,
): GameScreenViewModel {
  const remainingDays = Number.isFinite(session.maxTurns)
    ? Math.max(session.maxTurns - session.turn - 1, 0)
    : 0;
  const isInterviewDay = remainingDays === 0;
  const turnLabel = Number.isFinite(session.maxTurns)
    ? isInterviewDay
      ? "면접 D-Day"
      : `면접 D-${remainingDays}`
    : `Turn ${session.turn + 1}`;
  const currentLabel = getCurrentLabel(session);
  const statusItems = buildStatusItems(session);

  if (Number.isFinite(session.maxTurns) && session.turn >= session.maxTurns) {
    const ending = getEndingResult(session);

    return {
      turnLabel,
      currentLabel,
      statusItems,
      endingPanel: {
        title: ending.title,
        summary: ending.summary,
        reveal: ending.reveal,
        coda: ending.coda,
      },
    };
  }

  if (session.latestResult && session.scene === "result") {
    const tutorialJustEnded =
      isTutorialEventId(session.latestResult.eventId) &&
      !hasRemainingTutorialEvents(session.eventHistory);

    return {
      turnLabel,
      currentLabel,
      statusItems,
      resultPanel: {
        text: session.latestResult.text,
        nextLabel:
          session.turn + 1 >= session.maxTurns
            ? "Finish"
            : tutorialJustEnded
              ? "메인 사건 시작"
              : session.turn + 1 >= session.maxTurns - 1
                ? "면접장으로 간다"
                : "Next Event",
        onContinue: () => {
          dispatch({
            type: "event/queued",
            payload: {
              eventId:
                session.turn + 1 >= session.maxTurns - 1
                  ? finalInterviewEventId
                  : drawNextPrototypeEventId(session.eventHistory),
            },
          });
          dispatch({
            type: "scene/set",
            payload: "event",
          });
        },
      },
    };
  }

  return {
    turnLabel,
    currentLabel,
    statusItems,
    eventPanel: buildEventPanel(session, dispatch),
  };
}
