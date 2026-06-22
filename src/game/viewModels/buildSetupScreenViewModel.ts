import type { Dispatch } from "react";
import { runConfig } from "../config/runConfig";
import { drawNextPrototypeEventId } from "../content/eventCards";
import { pickPrototypeArchetype } from "../core/gameState";
import type { GameAction, MetaState, RunState } from "../core/gameTypes";
import { sanitizeCompanyName, sanitizePlayerName } from "../utils/playerName";
import type { SetupScreenViewModel } from "./setupScreenViewModel";

function getCompanyEasterEggMessage(companyName: string) {
  const normalized = companyName.toLocaleLowerCase();

  if (normalized.includes("kai")) {
    return "정말정말 좋은 회사네요!";
  }

  if (
    normalized.includes("lig") ||
    normalized.includes("posco") ||
    normalized.includes("하이닉스") ||
    normalized.includes("삼성")
  ) {
    return "좋은 회사네요!";
  }

  return undefined;
}

export function buildSetupScreenViewModel(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
  dispatch: Dispatch<GameAction>,
): SetupScreenViewModel {
  const name = sanitizePlayerName(session.profile.name);
  const targetCompany = sanitizeCompanyName(session.profile.targetCompany);

  return {
    title: "지원 정보 등록",
    description: "이번 생에서 사용할 이름과 목표 회사를 입력하세요.",
    startLabel: "시작하기",
    canStart: name.length > 0 && targetCompany.trim().length > 0,
    fields: [
      {
        key: "name",
        label: "내 이름",
        placeholder: "내 이름",
        value: name,
        onChange: (value) =>
          dispatch({
            type: "profile/updated",
            payload: { name: sanitizePlayerName(value) },
          }),
      },
      {
        key: "targetCompany",
        label: "목표 회사",
        placeholder: "예: Re:Born Korea",
        value: targetCompany,
        helperText: getCompanyEasterEggMessage(targetCompany),
        onChange: (value) =>
          dispatch({
            type: "profile/updated",
            payload: { targetCompany: sanitizeCompanyName(value) },
          }),
      },
    ],
    onStart: () =>
      dispatch({
        type: "run/started",
        payload: {
          archetype: pickPrototypeArchetype(),
          initialEventId: drawNextPrototypeEventId(
            session.eventHistory,
            completedRunCount,
            meta.pendingFirstClearTutorial,
            {
              nextTurn: 1,
              girlfriendStatus: session.relationship.girlfriendStatus,
              phase2Unlocked: meta.isFirstCleared,
            },
          ),
          maxTurns: runConfig.maxTurns,
        },
      }),
  };
}
