import type { Dispatch } from "react";
import { audioManager } from "../../audio/audioManager";
import { getNextPrototypeEvent } from "../content/eventCards";
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
  label: string;
  icon: string;
  key: keyof GameSession["metrics"];
}> = [
  { label: "Spec", icon: "S", key: "spec" },
  { label: "Money", icon: "$", key: "money" },
  { label: "Reputation", icon: "R", key: "reputation" },
  { label: "Mental", icon: "M", key: "mental" },
];

function buildStatusItems(session: GameSession): StatusItemViewModel[] {
  return statusItemsConfig.map((item) => ({
    label: item.label,
    icon: item.icon,
    value: session.metrics[item.key],
  }));
}

function buildEventPanel(
  session: GameSession,
  dispatch: Dispatch<GameAction>,
): EventPanelViewModel {
  const event = getNextPrototypeEvent(session.eventHistory);

  return {
    categoryLabel: event.category,
    title: "Swipe to Choose",
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
  const turnLabel = `Turn ${Math.min(session.turn + 1, session.maxTurns)} / ${session.maxTurns}`;
  const currentLabel = getCurrentLabel(session);
  const statusItems = buildStatusItems(session);

  if (session.turn >= session.maxTurns) {
    const ending = getEndingResult(session);

    return {
      turnLabel,
      currentLabel,
      statusItems,
      endingPanel: {
        title: ending.title,
        summary: ending.summary,
      },
    };
  }

  if (session.latestResult && session.scene === "result") {
    return {
      turnLabel,
      currentLabel,
      statusItems,
      resultPanel: {
        text: session.latestResult.text,
        nextLabel: "Next Event",
        onContinue: () =>
          dispatch({
            type: "scene/set",
            payload: "event",
          }),
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
