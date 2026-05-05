import type { Dispatch } from "react";
import { drawNextPrototypeEventId } from "../content/eventCards";
import { pickPrototypeArchetype } from "../core/gameState";
import type { GameAction, GameSession, PlayerProfile } from "../core/gameTypes";
import type {
  SetupFieldKey,
  SetupFieldViewModel,
  SetupScreenViewModel,
} from "./setupScreenViewModel";

const fieldOrder: SetupFieldKey[] = [
  "name",
  "friendName",
  "favoriteFood",
  "favoritePlace",
  "cherishedThing",
  "comfortingWords",
];

const fieldLabels: Record<SetupFieldKey, string> = {
  name: "Name",
  friendName: "Close Friend",
  favoriteFood: "Favorite Food",
  favoritePlace: "Favorite Place",
  cherishedThing: "Long-loved Thing",
  comfortingWords: "Words You Need",
};

function buildFieldViewModel(params: {
  field: SetupFieldKey;
  profile: PlayerProfile;
  dispatch: Dispatch<GameAction>;
}): SetupFieldViewModel {
  const { field, profile, dispatch } = params;

  return {
    key: field,
    label: fieldLabels[field],
    value: profile[field],
    onChange: (value) =>
      dispatch({
        type: "profile/updated",
        payload: { [field]: value },
      }),
  };
}

export function buildSetupScreenViewModel(
  session: GameSession,
  dispatch: Dispatch<GameAction>,
): SetupScreenViewModel {
  const fields = fieldOrder.map((field) =>
    buildFieldViewModel({
      field,
      profile: session.profile,
      dispatch,
    }),
  );

  return {
    title: "Memory Inputs",
    description:
      "These details feel ordinary at first, but they become the most human part of the ending.",
    startLabel: "Start Run",
    canStart: fields.every((field) => field.value.trim().length > 0),
    fields,
    onStart: () =>
      dispatch({
        type: "game/started",
        payload: {
          archetype: pickPrototypeArchetype(),
          initialEventId: drawNextPrototypeEventId(session.eventHistory),
        },
      }),
  };
}
