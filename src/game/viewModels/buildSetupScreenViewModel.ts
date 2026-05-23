import type { Dispatch } from "react";
import { drawNextPrototypeEventId } from "../content/eventCards";
import { pickPrototypeArchetype } from "../core/gameState";
import type { GameAction, RunState } from "../core/gameTypes";
import type { SetupScreenViewModel } from "./setupScreenViewModel";

const PROTOTYPE_MAX_TURNS = 30;

export function buildSetupScreenViewModel(
  session: RunState,
  dispatch: Dispatch<GameAction>,
): SetupScreenViewModel {
  const name = session.profile.name;

  return {
    title: "Setup",
    description: "Enter a name to start the prototype run.",
    startLabel: "Start",
    canStart: name.trim().length > 0,
    fields: [
      {
        key: "name",
        label: "Name",
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
          initialEventId: drawNextPrototypeEventId(session.eventHistory),
          maxTurns: PROTOTYPE_MAX_TURNS,
        },
      }),
  };
}
