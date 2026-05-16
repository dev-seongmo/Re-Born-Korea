import { useReducer } from "react";
import { GameScreen } from "../components/game/GameScreen";
import { SetupScreen } from "../components/setup/SetupScreen";
import { createInitialGameSession } from "../game/core/gameState";
import { gameReducer } from "../game/core/gameReducer";
import { buildAppViewModel } from "../game/viewModels/buildAppViewModel";

export function App() {
  const [session, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameSession,
  );
  const viewModel = buildAppViewModel(session, dispatch);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Re:Born Korea</p>
          <h1>저승 입구 프로토타입</h1>
        </div>
      </header>

      <main className="layout">
        <section className="layout__primary layout__primary--mobile-frame">
          {viewModel.activeScreen === "setup" ? (
            <SetupScreen viewModel={viewModel.setup} />
          ) : (
            <GameScreen viewModel={viewModel.game} />
          )}
        </section>
      </main>
    </div>
  );
}
