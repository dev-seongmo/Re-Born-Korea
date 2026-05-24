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

const metricMessageLabels: Record<VisibleMetricKey, string> = {
  spec: "준비도",
  money: "생활 안정",
  reputation: "관계",
  mental: "체력",
};

const interviewPressureQuestions: Record<VisibleMetricKey, string> = {
  spec:
    "\"지원서에는 의지가 보이지만, 실제로 해낼 근거는 부족해 보입니다. 무엇으로 증명하시겠습니까?\"",
  money:
    "\"생활이 흔들리면 일도 흔들립니다. 지금 상태로 매일 출근을 버틸 수 있습니까?\"",
  reputation:
    "\"협업에서 신뢰를 얻는 데 시간이 걸리는 편입니까? 저희 팀은 오래 기다려주기 어렵습니다.\"",
  mental:
    "\"많이 지쳐 보입니다. 압박이 오면 무너지지 않을 자신이 정말 있습니까?\"",
};

function buildStatusItems(session: RunState): StatusItemViewModel[] {
  return statusItemsConfig.map((item) => ({
    key: item.key,
    label: item.label,
    value: session.metrics[item.key],
  }));
}

function buildDDayPulse(
  remainingDays: number,
  statusItems: StatusItemViewModel[],
): GameScreenViewModel["dDayPulse"] {
  if (remainingDays < 0 || remainingDays % 10 !== 0) {
    return undefined;
  }

  return {
    milestone: remainingDays,
    label: remainingDays === 0 ? "INTERVIEW DAY" : `D-${remainingDays}`,
    statusItems,
  };
}

function getCurrentEvent(session: RunState, completedRunCount: number) {
  const eventId =
    session.currentEventId ??
    drawNextPrototypeEventId(session.eventHistory, completedRunCount);

  return getPrototypeEventById(eventId);
}

function getWeakestMetricKey(session: RunState): VisibleMetricKey | null {
  const weakMetricKeys = statusItemsConfig
    .map((item) => item.key)
    .filter((key) => session.metrics[key] < 50);

  if (weakMetricKeys.length === 0) {
    return null;
  }

  return weakMetricKeys.reduce((weakest, key) =>
    session.metrics[key] < session.metrics[weakest] ? key : weakest,
  );
}

function buildNarrativeText(session: RunState, eventText: string) {
  if (session.currentEventId !== finalInterviewEventId) {
    return eventText;
  }

  const weakestMetricKey = getWeakestMetricKey(session);

  if (!weakestMetricKey) {
    return eventText;
  }

  return `${eventText}\n\n면접관의 시선이 ${metricMessageLabels[weakestMetricKey]} 항목에서 멈췄다.\n\n${interviewPressureQuestions[weakestMetricKey]}`;
}

function getNextEventId(session: RunState, completedRunCount: number) {
  return session.turn + 1 >= session.maxTurns - 1
    ? finalInterviewEventId
    : drawNextPrototypeEventId(session.eventHistory, completedRunCount);
}

function buildResolveChoice(
  session: RunState,
  completedRunCount: number,
  dispatch: Dispatch<GameAction>,
  eventPanel: EventPanelViewModel,
) {
  return (choice: Parameters<EventPanelViewModel["onResolveChoice"]>[0]) => {
    const event = eventPanel.event;
    const resolvedTurn = resolveTurn({
      session,
      event,
      choice,
    });

    audioManager.play("choice.confirm", session.settings.sfxVolume);

    dispatch({
      type: "turn/resolved",
      payload: isTutorialEventId(event.id)
        ? {
            ...resolvedTurn,
            nextScene: "event",
          }
        : resolvedTurn,
    });

    if (isTutorialEventId(event.id)) {
      dispatch({
        type: "run/continued",
        payload: {
          nextEventId: getNextEventId(
            {
              ...session,
              eventHistory: [...session.eventHistory, event.id],
              turn: session.turn + 1,
            },
            completedRunCount,
          ),
        },
      });
    }
  };
}

function buildEventPanel(
  session: RunState,
  completedRunCount: number,
  dispatch: Dispatch<GameAction>,
): EventPanelViewModel {
  const event = getCurrentEvent(session, completedRunCount);

  if (!event) {
    throw new Error("No event available for current game state.");
  }

  const basePanel: EventPanelViewModel = {
    narrativeText: buildNarrativeText(session, event.text),
    event,
    onResolveChoice: () => undefined,
  };

  basePanel.onResolveChoice = buildResolveChoice(
    session,
    completedRunCount,
    dispatch,
    basePanel,
  );

  if (session.scene === "result" && session.latestResult) {
    const tutorialJustEnded =
      isTutorialEventId(session.latestResult.eventId) &&
      !hasRemainingTutorialEvents(session.eventHistory, completedRunCount);

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
            nextEventId: getNextEventId(session, completedRunCount),
          },
        }),
    };
  }

  return basePanel;
}

export function buildGameScreenViewModel(
  session: RunState,
  completedRunCount: number,
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
  const dDayPulse = Number.isFinite(session.maxTurns)
    ? buildDDayPulse(Math.max(session.maxTurns - session.turn, 0), statusItems)
    : undefined;

  if (Number.isFinite(session.maxTurns) && session.turn >= session.maxTurns) {
    const ending = getEndingResult(session);
    const interview = evaluateInterviewOutcome(session);
    const outcome = interview.passed ? "employed" : "failed";
    const weakMetricText = interview.weakMetricKeys
      .map((key) => metricMessageLabels[key])
      .join(", ");

    return {
      turnLabel,
      currentLabel,
      statusItems,
      dDayPulse: undefined,
      endingPanel: {
        eyebrow: "New Message",
        title:
          outcome === "employed"
            ? "[Re:Born Korea] 최종 합격 안내"
            : "[Re:Born Korea] 전형 결과 안내",
        outcome,
        sender: "recruit@reborn-careers.kr",
        receivedAt: "오늘 18:07",
        messageLines:
          outcome === "employed"
            ? [
                `${session.profile.name}님, 안녕하세요.`,
                "Re:Born Korea 채용팀입니다.",
                "최종 면접 결과, 합격하셨음을 안내드립니다.",
                "불안정한 하루들을 통과해 끝까지 균형을 잃지 않은 점을 높게 평가했습니다.",
                "자세한 입사 절차는 다음 안내 메일로 전달드리겠습니다.",
              ]
            : [
                `${session.profile.name}님, 안녕하세요.`,
                "Re:Born Korea 채용팀입니다.",
                "최종 면접 결과, 아쉽게도 이번 전형에서는 함께하지 못하게 되었습니다.",
                weakMetricText
                  ? `면접 과정에서 ${weakMetricText} 항목의 불안정성이 확인되었습니다. 모든 항목이 50 이상이어야 최종 합격이 가능합니다.`
                  : "면접 과정에서 최종 기준을 충족하지 못한 항목이 확인되었습니다.",
                "지원해주셔서 감사드리며, 다음 기회에 더 좋은 인연으로 만나 뵙겠습니다.",
              ],
        metricLines: statusItems.map(
          (item) => `${metricMessageLabels[item.key as VisibleMetricKey]} ${item.value}`,
        ),
        nextLabel: outcome === "employed" ? "기억 확인하기" : "처음으로 돌아가기",
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
      eventPanel: buildEventPanel(session, completedRunCount, dispatch),
    };
  }

  return {
    turnLabel,
    currentLabel,
    statusItems,
    dDayPulse,
    eventPanel: buildEventPanel(session, completedRunCount, dispatch),
  };
}
