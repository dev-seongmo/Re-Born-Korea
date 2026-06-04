import type { Dispatch } from "react";
import { runConfig } from "../config/runConfig";
import { drawNextPrototypeEventId } from "../content/eventCards";
import { pickPrototypeArchetype } from "../core/gameState";
import type { GameAction, MetaState, RunState } from "../core/gameTypes";
import { sanitizePlayerName } from "../utils/playerName";
import type { SetupScreenViewModel } from "./setupScreenViewModel";

export function buildSetupScreenViewModel(
  session: RunState,
  completedRunCount: number,
  meta: MetaState,
  dispatch: Dispatch<GameAction>,
): SetupScreenViewModel {
  const name = sanitizePlayerName(session.profile.name);

  return {
    title: "이름 등록",
    description: "이번 생에서 사용할 내 이름을 입력하세요.",
    startLabel: "시작하기",
    canStart: name.length > 0,
    fields: [
      {
        key: "name",
        label: "내 이름",
        value: name,
        onChange: (value) =>
          dispatch({
            type: "profile/updated",
            payload: { name: sanitizePlayerName(value) },
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
            meta.isFirstCleared,
          ),
          maxTurns: runConfig.maxTurns,
        },
      }),
  };
}
