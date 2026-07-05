import type { Dispatch } from "react";
import { audioManager } from "../../audio/audioManager";
import {
  tutorialEventIds,
} from "../content/eventCards";
import { getGameOverContent } from "../content/gameOverResults";
import type {
  GameAction,
  MetaState,
  RunState,
  VisibleMetricKey,
} from "../core/gameTypes";
import {
  getCurrentRunEvent,
  getNextRunEventId,
  hasRunResultTutorialJustEnded,
  resolveChoiceForRun,
} from "../core/runFlow";
import { getEndingResult } from "../selectors/getEndingResult";
import { formatCompanyName } from "../utils/playerName";
import type {
  AtmosphereEffect,
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

const metricMessageLabels: Record<VisibleMetricKey, string> = {
  spec: "스펙",
  money: "돈",
  reputation: "관계",
  mental: "멘탈",
};

const metricDisplayLabels: Record<VisibleMetricKey, string> = {
  spec: "Spec",
  money: "Money",
  reputation: "Reputation",
  mental: "Mental",
};

const gameOverBoundaryLabels = {
  zero: "고갈",
  max: "초과",
} as const;

const FOG_CLEARING_TUTORIAL_EVENT_ID = "tutorial-fog-clears";

function getEventAtmosphere(eventId: string): AtmosphereEffect | undefined {
  if (!tutorialEventIds.includes(eventId)) {
    return undefined;
  }

  return eventId === FOG_CLEARING_TUTORIAL_EVENT_ID
    ? "fog-clearing"
    : "tutorial-fog";
}

function buildStatusItems(session: RunState): StatusItemViewModel[] {
  return statusItemsConfig.map((item) => ({
    key: item.key,
    label: item.label,
    value: session.metrics[item.key],
  }));
}

function buildResolveChoice(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
  dispatch: Dispatch<GameAction>,
  eventPanel: EventPanelViewModel,
) {
  return (choice: Parameters<EventPanelViewModel["onResolveChoice"]>[0]) => {
    const event = eventPanel.event;
    const resolvedChoice = resolveChoiceForRun({
      session,
      event,
      choice,
      completedRunCount,
      meta,
    });

    audioManager.play("choice.confirm", session.settings.sfxVolume);

    dispatch({
      type: "turn/resolved",
      payload: resolvedChoice.turnPayload,
    });

    if (!resolvedChoice.autoContinueEventId) {
      return;
    }

    if (resolvedChoice.exitsTutorialFlow) {
      audioManager.stop("music.afterlife");
    }

    dispatch({
      type: "run/continued",
      payload: {
        nextEventId: resolvedChoice.autoContinueEventId,
      },
    });
  };
}

function buildEventPanel(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
  dispatch: Dispatch<GameAction>,
): EventPanelViewModel {
  const event = getCurrentRunEvent(session, completedRunCount, meta);

  if (!event) {
    throw new Error("No event available for current game state.");
  }

  const basePanel: EventPanelViewModel = {
    narrativeText: event.text,
    event,
    onResolveChoice: () => undefined,
  };

  basePanel.onResolveChoice = buildResolveChoice(
    session,
    completedRunCount,
    meta,
    dispatch,
    basePanel,
  );

  if (session.scene === "result" && session.latestResult) {
    const tutorialJustEnded = hasRunResultTutorialJustEnded(
      session,
      completedRunCount,
      meta,
    );

    return {
      ...basePanel,
      narrativeText: session.latestResult.text,
      disabled: true,
      continueLabel:
        session.turn + 1 >= session.maxTurns
          ? "Go to Interview"
          : tutorialJustEnded
            ? "Start Main Run"
            : "Next Event",
      onContinue: () =>
        dispatch({
          type: "run/continued",
          payload: {
            nextEventId: getNextRunEventId(session, completedRunCount, meta),
          },
        }),
    };
  }

  return basePanel;
}

export function buildGameScreenViewModel(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
  dispatch: Dispatch<GameAction>,
): GameScreenViewModel {
  const statusItems = buildStatusItems(session);

  if (session.scene === "game-over" && session.gameOverReason) {
    const gameOver = getGameOverContent(session.gameOverReason);

    return {
      statusItems,
      completedRunCount,
      gameOverPanel: {
        eyebrow: "Game Over",
        title: "Bad Ending",
        summary: `${metricDisplayLabels[gameOver.metric]} ${
          gameOverBoundaryLabels[gameOver.boundary]
        }`,
        description: gameOver.description,
        nextLabel: gameOver.restartLabel,
        onContinue: () =>
          dispatch({
            type: "run/gameOverAcknowledged",
            payload: {
              discoveredMemoryShardIds: session.memoryTags,
            },
          }),
      },
    };
  }

  if (Number.isFinite(session.maxTurns) && session.turn >= session.maxTurns) {
    const ending = getEndingResult(session);
    const outcome = "employed";
    const targetCompany = formatCompanyName(session.profile.targetCompany);

    return {
      statusItems,
      completedRunCount,
      endingPanel: {
        eyebrow: "New Message",
        title: `[${targetCompany}] 최종 합격 안내`,
        outcome,
        sender: "recruit@reborn-careers.kr",
        receivedAt: "오늘 18:07",
        messageLines: [
          `${session.profile.name}님, 안녕하세요.`,
          `${targetCompany} 채용팀입니다.`,
          "최종 면접 결과, 합격하셨음을 안내드립니다.",
          "불안정한 하루들을 통과해 면접장까지 도착한 점을 높게 평가했습니다.",
          "자세한 입사 절차는 다음 안내 메일로 전달드리겠습니다.",
        ],
        metricLines: statusItems.map(
          (item) => `${metricMessageLabels[item.key as VisibleMetricKey]} ${item.value}`,
        ),
        nextLabel: "기억 확인하기",
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
      eventPanel: buildEventPanel(session, completedRunCount, meta, dispatch),
    };
  }

  const eventPanel = buildEventPanel(session, completedRunCount, meta, dispatch);

  return {
    statusItems,
    completedRunCount,
    atmosphere: getEventAtmosphere(eventPanel.event.id),
    eventPanel,
  };
}
