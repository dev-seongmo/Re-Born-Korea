import type { GameScreenViewModel } from "./gameScreenViewModel";
import type { SetupScreenViewModel } from "./setupScreenViewModel";

export type AppViewModel =
  | {
      activeScreen: "setup";
      setup: SetupScreenViewModel;
    }
  | {
      activeScreen: "game";
      game: GameScreenViewModel;
    };
