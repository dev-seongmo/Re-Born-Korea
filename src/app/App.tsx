import { useEffect, useReducer, useState } from "react";
import { GameScreen } from "../components/game/GameScreen";
import { SetupScreen } from "../components/setup/SetupScreen";
import { memoryShards } from "../game/content/memoryShards";
import {
  loadPersistedGameState,
  persistGameState,
} from "../game/core/gamePersistence";
import { gameReducer } from "../game/core/gameReducer";
import { buildGameScreenViewModel } from "../game/viewModels/buildGameScreenViewModel";
import { buildSetupScreenViewModel } from "../game/viewModels/buildSetupScreenViewModel";

export function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    loadPersistedGameState,
  );
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const footerName = state.run?.profile.name ?? "";
  const footerDday =
    state.run && Number.isFinite(state.run.maxTurns)
      ? `D-${Math.max(state.run.maxTurns - state.run.turn - 1, 0)}`
      : "";
  const lifeCount =
    state.run || state.meta.runCount > 0
      ? `${state.meta.runCount + (state.run ? 1 : 0)}번째 인생`
      : "";

  useEffect(() => {
    persistGameState(state);
  }, [state]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Re:Born Korea</p>
        </div>
      </header>

      <main className="layout">
        <section className="layout__primary layout__primary--mobile-frame">
          {state.appScene === "title" ? (
            <section className="panel">
              <div className="panel__header">
                <p className="eyebrow">Title</p>
                <h2>Live again until interview day</h2>
                <p className="muted">
                  Survive one life, get employed, collect memory shards, and unlock
                  the final ending.
                </p>
              </div>
              <div className="setup-grid">
                <div className="panel">
                  <p className="eyebrow">Meta Progress</p>
                  <p className="muted">Runs: {state.meta.runCount}</p>
                  <p className="muted">Job clears: {state.meta.successCount}</p>
                  <p className="muted">
                    Memory shards: {state.meta.unlockedMemoryShardIds.length}/
                    {memoryShards.length}
                  </p>
                </div>
              </div>
              <button
                className="primary-button"
                onClick={() => dispatch({ type: "app/newRunRequested" })}
                type="button"
              >
                Start New Life
              </button>
            </section>
          ) : state.appScene === "run-setup" && state.run ? (
            <SetupScreen viewModel={buildSetupScreenViewModel(state.run, dispatch)} />
          ) : state.appScene === "run-event" ||
            state.appScene === "run-result" ||
            state.appScene === "run-ending" ? (
            state.run ? (
              <GameScreen viewModel={buildGameScreenViewModel(state.run, dispatch)} />
            ) : null
          ) : state.appScene === "memory-hub" ? (
            <section className="panel">
              <div className="panel__header">
                <p className="eyebrow">Memory Hub</p>
                <h2>Fragments recovered</h2>
                <p className="muted">
                  Each successful life brings back pieces of what was lost.
                </p>
              </div>

              <div className="choice-list">
                {memoryShards.map((shard) => {
                  const unlocked = state.meta.unlockedMemoryShardIds.includes(shard.id);

                  return (
                    <div className="choice-button" key={shard.id}>
                      <strong>{unlocked ? shard.title : "Locked shard"}</strong>
                      <p className="muted">
                        {unlocked
                          ? shard.description
                          : "Keep surviving to recover this memory."}
                      </p>
                    </div>
                  );
                })}
              </div>

              {state.meta.trueEndingUnlocked ? (
                <button
                  className="primary-button"
                  onClick={() => dispatch({ type: "hub/trueEndingRequested" })}
                  type="button"
                >
                  Begin True Ending
                </button>
              ) : null}

              <button
                className="primary-button"
                onClick={() => dispatch({ type: "hub/continueRequested" })}
                type="button"
              >
                Return to Title
              </button>
            </section>
          ) : (
            <section className="panel">
              <div className="panel__header">
                <p className="eyebrow">True Ending</p>
                <h2>The life designed on purpose</h2>
                <p className="muted">
                  All memory shards are restored. The final route can now be fully
                  authored.
                </p>
              </div>
              <button
                className="primary-button"
                onClick={() => dispatch({ type: "trueEnding/completed" })}
                type="button"
              >
                Finish True Ending
              </button>
            </section>
          )}
        </section>
      </main>

      <footer className="footer-bar">
        <div className="footer-bar__content">
          <div className="footer-bar__identity-block">
            <p className="footer-bar__life">{lifeCount}</p>
            <div className="footer-bar__identity">
              <p>{footerName}</p>
              <p className="footer-bar__dday">{footerDday}</p>
            </div>
          </div>

          <button
            aria-label="기억 조각 보기"
            className="memory-dots-button"
            onClick={() => setIsMemoryModalOpen(true)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </footer>

      {isMemoryModalOpen ? (
        <div
          aria-hidden="true"
          className="memory-modal-backdrop"
          onClick={() => setIsMemoryModalOpen(false)}
        >
          <div
            aria-modal="true"
            className="memory-modal panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="memory-modal__header">
              <div>
                <p className="eyebrow">Memory Shards</p>
                <h2>{state.meta.unlockedMemoryShardIds.length} / {memoryShards.length}</h2>
              </div>
              <button
                aria-label="닫기"
                className="memory-modal__close"
                onClick={() => setIsMemoryModalOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="memory-modal__list">
              {memoryShards.map((shard) => {
                const unlocked = state.meta.unlockedMemoryShardIds.includes(shard.id);

                return (
                  <div className="memory-modal__item" key={shard.id}>
                    <strong>{unlocked ? shard.title : "Locked shard"}</strong>
                    <p className="muted">
                      {unlocked
                        ? shard.description
                        : "아직 이 기억 조각은 회수되지 않았습니다."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
