import type { Dispatch } from "react";
import { drawNextPrototypeEventId } from "../content/eventCards";
import { pickPrototypeArchetype } from "../core/gameState";
import type { GameAction, RunState } from "../core/gameTypes";
import type { SetupScreenViewModel } from "./setupScreenViewModel";

const PROTOTYPE_MAX_TURNS = 30;

export function buildSetupScreenViewModel(
  session: RunState,
  completedRunCount: number,
  dispatch: Dispatch<GameAction>,
): SetupScreenViewModel {
  const name = session.profile.name;

  return {
    title: "영혼 등록",
    description: "면접일까지 데려갈 영혼의 이름을 정하세요.",
    startLabel: "시작하기",
    canStart: name.trim().length > 0,
    fields: [
      {
        key: "name",
        label: "이름",
        value: name,
        onChange: (value) =>
          dispatch({
            type: "profile/updated",
            payload: { name: value },
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
          ),
          maxTurns: PROTOTYPE_MAX_TURNS,
        },
      }),
  };
}
