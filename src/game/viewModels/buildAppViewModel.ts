import type { Dispatch } from "react";
import type { GameAction, GameSession } from "../core/gameTypes";
import type { AppViewModel } from "./appViewModel";
import { buildGameScreenViewModel } from "./buildGameScreenViewModel";
import { buildSetupScreenViewModel } from "./buildSetupScreenViewModel";

export function buildAppViewModel(
  session: GameSession,
  dispatch: Dispatch<GameAction>,
): AppViewModel {
  if (session.scene === "setup") {
    return {
      activeScreen: "setup",
      setup: buildSetupScreenViewModel(session, dispatch),
    };
  }

  return {
    activeScreen: "game",
    game: buildGameScreenViewModel(session, dispatch),
  };
}
