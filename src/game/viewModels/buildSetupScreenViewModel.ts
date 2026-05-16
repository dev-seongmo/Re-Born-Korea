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
];

const fieldLabels: Record<SetupFieldKey, string> = {
  name: "영혼의 이름",
  friendName: "남겨 둔 사람",
  favoriteFood: "가장 따뜻한 음식",
  favoritePlace: "되돌아가고 싶은 곳",
  cherishedThing: "끝내지 못한 것",
  comfortingWords: "듣고 싶은 말",
};

const PROTOTYPE_MAX_TURNS = 30;

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
    title: "저승 입구",
    description:
      "이름 하나만 적어도 튜토리얼을 시작할 수 있습니다. 나머지 기억은 아직 안개 속에 남아 있습니다.",
    startLabel: "길을 연다",
    canStart: fields.every((field) => field.value.trim().length > 0),
    fields,
    onStart: () =>
      dispatch({
        type: "game/started",
        payload: {
          archetype: pickPrototypeArchetype(),
          initialEventId: drawNextPrototypeEventId(session.eventHistory),
          maxTurns: PROTOTYPE_MAX_TURNS,
        },
      }),
  };
}
