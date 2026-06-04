import type { CSSProperties } from "react";
import { useEffect, useReducer, useState } from "react";
import titleBackgroundImage from "../assets/images/backgrounds/title/background_title_mobile.png";
import { GameScreen } from "../components/game/GameScreen";
import { SetupScreen } from "../components/setup/SetupScreen";
import { prototypeEvents } from "../game/content/eventCards";
import { memoryShards } from "../game/content/memoryShards";
import {
  loadPersistedGameState,
  persistGameState,
} from "../game/core/gamePersistence";
import { gameReducer } from "../game/core/gameReducer";
import { getPhase2DebugGameState } from "../game/debug/phase2DebugSave";
import { buildGameScreenViewModel } from "../game/viewModels/buildGameScreenViewModel";
import { buildSetupScreenViewModel } from "../game/viewModels/buildSetupScreenViewModel";

const firstLifeTutorialIds = [
  "tutorial-afterlife-question",
  "tutorial-chasa-request",
  "tutorial-employment-grudge",
  "tutorial-choice-state",
  "tutorial-stat-threshold",
  "tutorial-thirty-days",
  "tutorial-chasa-name",
  "tutorial-first-soul-arrives",
  "tutorial-fog-clears",
];

const secondLifeTutorialIds = [
  "second-life-wakeup",
  "second-life-failure-review",
  "second-life-four-metrics",
  "second-life-metric-meanings",
  "second-life-too-high",
  "second-life-oath",
];

export function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    loadPersistedGameState,
  );
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "failed">("idle");

  const footerName = state.run?.profile.name ?? "";
  const footerDday =
    state.run && Number.isFinite(state.run.maxTurns)
      ? `D-${Math.max(state.run.maxTurns - state.run.turn - 1, 0)}`
      : "";
  const lifeCount =
    state.run || state.meta.runCount > 0
      ? `${state.meta.runCount + (state.run ? 1 : 0)}번째 인생`
      : "";
  const hasStartedGame = Boolean(state.run || state.meta.runCount > 0);
  const shouldShowPhase2DebugLoad = import.meta.env.DEV;
  const shouldShowTopbar =
    state.appScene !== "title" &&
    state.appScene !== "run-event" &&
    state.appScene !== "run-result" &&
    state.appScene !== "run-ending" &&
    state.appScene !== "run-game-over";
  const shouldShowFooter =
    state.appScene !== "title" && state.appScene !== "run-setup";

  const eventGroups = [
    {
      label: "첫 번째 인생 튜토리얼",
      events: prototypeEvents.filter((event) => firstLifeTutorialIds.includes(event.id)),
    },
    {
      label: "두 번째 인생 튜토리얼",
      events: prototypeEvents.filter((event) => secondLifeTutorialIds.includes(event.id)),
    },
    {
      label: "일반 이벤트",
      events: prototypeEvents.filter(
        (event) =>
          !firstLifeTutorialIds.includes(event.id) &&
          !secondLifeTutorialIds.includes(event.id) &&
          event.id !== "final-interview",
      ),
    },
    {
      label: "최종 면접",
      events: prototypeEvents.filter((event) => event.id === "final-interview"),
    },
  ];

  useEffect(() => {
    persistGameState(state);
  }, [state]);

  function handlePrimaryTitleAction() {
    if (state.run) {
      dispatch({ type: "app/continueRequested" });
      return;
    }

    if (!hasStartedGame) {
      dispatch({ type: "app/newRunRequested" });
      return;
    }

    dispatch({ type: "app/newRunRequested" });
  }

  function handleLoadPhase2DebugSave() {
    const debugState = getPhase2DebugGameState();

    if (!debugState) {
      window.alert("페이즈2 저장데이터가 아직 연결되지 않았습니다.");
      return;
    }

    dispatch({
      type: "debug/phase2SaveLoaded",
      payload: {
        state: debugState,
      },
    });
  }

  function handleReturnToTitle() {
    setIsSettingsModalOpen(false);
    dispatch({ type: "app/returnedToTitle" });
  }

  function handleOpenEncyclopedia() {
    setIsSettingsModalOpen(false);
    dispatch({ type: "app/encyclopediaRequested" });
  }

  function handleOpenResetConfirm() {
    setIsSettingsModalOpen(false);
    setIsResetConfirmOpen(true);
  }

  function handleConfirmResetGame() {
    dispatch({ type: "app/newGameResetRequested" });
    setIsResetConfirmOpen(false);
  }

  async function handleShareGame() {
    const shareData = {
      title: "Re:Born Korea",
      text: "면접일까지 다시 태어나 버티는 선택형 생존 게임",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1800);
    } catch {
      setShareStatus("failed");
      window.setTimeout(() => setShareStatus("idle"), 1800);
    }
  }

  return (
    <div className="app-shell">
      {shouldShowTopbar ? (
        <header className="topbar">
          <div>
            <p className="eyebrow">Re:Born Korea</p>
          </div>
          <button
            aria-label="설정"
            className="topbar__settings-button"
            onClick={() => setIsSettingsModalOpen(true)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="topbar__settings-icon"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.6 2.9h2.8l.5 2.3c.6.2 1.1.4 1.6.7l2.1-1.1 2 2-1.1 2.1c.3.5.5 1 .7 1.6l2.3.5v2.8l-2.3.5c-.2.6-.4 1.1-.7 1.6l1.1 2.1-2 2-2.1-1.1c-.5.3-1 .5-1.6.7l-.5 2.3h-2.8l-.5-2.3c-.6-.2-1.1-.4-1.6-.7l-2.1 1.1-2-2 1.1-2.1c-.3-.5-.5-1-.7-1.6l-2.3-.5v-2.8l2.3-.5c.2-.6.4-1.1.7-1.6L4.5 6.8l2-2 2.1 1.1c.5-.3 1-.5 1.6-.7z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                fill="none"
                r="3.2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </header>
      ) : null}

      <main className="layout">
        <section className="layout__primary layout__primary--mobile-frame">
          {state.appScene === "title" ? (
            <section
              className="title-screen"
              style={{ "--title-bg": `url(${titleBackgroundImage})` } as CSSProperties}
            >
              <div className="title-screen__logo">
                <span>Re:Born</span>
                <strong>Korea</strong>
              </div>

              <div className="title-screen__actions">
                {shouldShowPhase2DebugLoad ? (
                  <button
                    className="title-screen__button"
                    onClick={handleLoadPhase2DebugSave}
                    type="button"
                  >
                    페이즈2 불러오기
                  </button>
                ) : null}
                <button
                  className="title-screen__button title-screen__button--primary"
                  onClick={handlePrimaryTitleAction}
                  type="button"
                >
                  {hasStartedGame ? "이어하기" : "새 게임"}
                </button>
                <button
                  className="title-screen__button"
                  onClick={() => setIsSettingsModalOpen(true)}
                  type="button"
                >
                  설정
                </button>
                <button
                  className="title-screen__button"
                  onClick={handleShareGame}
                  type="button"
                >
                  {shareStatus === "copied"
                    ? "링크 복사됨"
                    : shareStatus === "failed"
                      ? "공유 실패"
                      : "공유하기"}
                </button>
              </div>
            </section>
          ) : state.appScene === "encyclopedia" ? (
            <section className="panel">
              <div className="panel__header">
                <p className="eyebrow">Encyclopedia</p>
                <h2>이벤트 도감</h2>
                <p className="muted">
                  현재 등록된 모든 이벤트와 좌우 선택지를 한 번에 확인할 수 있습니다.
                </p>
              </div>

              <div className="encyclopedia-list">
                {eventGroups.map((group) => (
                  <section className="encyclopedia-group" key={group.label}>
                    <div className="encyclopedia-group__header">
                      <strong>{group.label}</strong>
                      <span className="muted">{group.events.length}개</span>
                    </div>

                    <div className="encyclopedia-group__items">
                      {group.events.map((event) => (
                        <article className="encyclopedia-card" key={event.id}>
                          <div className="encyclopedia-card__meta">
                            <span>{event.category}</span>
                            <span>{event.phase}</span>
                            <span>{event.id}</span>
                          </div>
                          <p className="encyclopedia-card__text">{event.text}</p>
                          <div className="encyclopedia-card__choices">
                            <div className="encyclopedia-choice">
                              <strong>오른쪽 선택</strong>
                              <p>{event.choices[0].label}</p>
                            </div>
                            <div className="encyclopedia-choice">
                              <strong>왼쪽 선택</strong>
                              <p>{event.choices[1].label}</p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <button
                className="secondary-button"
                onClick={() => dispatch({ type: "app/returnedToTitle" })}
                type="button"
              >
                메인화면으로 돌아가기
              </button>
            </section>
          ) : state.appScene === "run-setup" && state.run ? (
            <SetupScreen
              viewModel={buildSetupScreenViewModel(
                state.run,
                state.meta.runCount,
                state.meta,
                dispatch,
              )}
            />
          ) : state.appScene === "run-event" ||
            state.appScene === "run-result" ||
            state.appScene === "run-ending" ||
            state.appScene === "run-game-over" ? (
            state.run ? (
              <GameScreen
                viewModel={buildGameScreenViewModel(
                  state.run,
                  state.meta.runCount,
                  state.meta,
                  dispatch,
                )}
              />
            ) : null
          ) : state.appScene === "memory-hub" ? (
            <section className="panel memory-hub">
              <div className="panel__header">
                <p className="eyebrow">Memory Hub</p>
                <h2>Fragments recovered</h2>
                <p className="muted">
                  Each successful life brings back pieces of what was lost.
                </p>
              </div>

              <div className="choice-list memory-hub__list">
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

              <div className="memory-hub__actions">
                {state.meta.trueEndingUnlocked ? (
                  <button
                    className="primary-button"
                    onClick={() => dispatch({ type: "hub/trueEndingRequested" })}
                    type="button"
                  >
                    진엔딩 시작
                  </button>
                ) : null}

                <button
                  className="secondary-button"
                  onClick={() => dispatch({ type: "hub/continueRequested" })}
                  type="button"
                >
                  다시 태어나기
                </button>
              </div>
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

      {shouldShowFooter ? (
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
              aria-label="설정"
              className="footer-bar__settings-button"
              onClick={() => setIsSettingsModalOpen(true)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="footer-bar__settings-icon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.6 2.9h2.8l.5 2.3c.6.2 1.1.4 1.6.7l2.1-1.1 2 2-1.1 2.1c.3.5.5 1 .7 1.6l2.3.5v2.8l-2.3.5c-.2.6-.4 1.1-.7 1.6l1.1 2.1-2 2-2.1-1.1c-.5.3-1 .5-1.6.7l-.5 2.3h-2.8l-.5-2.3c-.6-.2-1.1-.4-1.6-.7l-2.1 1.1-2-2 1.1-2.1c-.3-.5-.5-1-.7-1.6l-2.3-.5v-2.8l2.3-.5c.2-.6.4-1.1.7-1.6L4.5 6.8l2-2 2.1 1.1c.5-.3 1-.5 1.6-.7z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="3.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

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
      ) : null}

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
                <h2>
                  {state.meta.unlockedMemoryShardIds.length} / {memoryShards.length}
                </h2>
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
                        : "아직 이 기억 조각은 회수하지 못했습니다."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {isSettingsModalOpen ? (
        <div
          aria-hidden="true"
          className="memory-modal-backdrop"
          onClick={() => setIsSettingsModalOpen(false)}
        >
          <div
            aria-modal="true"
            className="memory-modal panel settings-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="memory-modal__header">
              <div>
                <p className="eyebrow">Settings</p>
                <h2>설정</h2>
              </div>
              <button
                aria-label="닫기"
                className="memory-modal__close"
                onClick={() => setIsSettingsModalOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <button
              className="secondary-button settings-modal__action"
              onClick={handleOpenEncyclopedia}
              type="button"
            >
              이벤트 도감
            </button>

            <button
              className="secondary-button settings-modal__action"
              onClick={handleReturnToTitle}
              type="button"
            >
              메인화면으로 나가기
            </button>

            <button
              className="secondary-button secondary-button--danger settings-modal__action"
              onClick={handleOpenResetConfirm}
              type="button"
            >
              게임 초기화
            </button>
          </div>
        </div>
      ) : null}

      {isResetConfirmOpen ? (
        <div
          aria-hidden="true"
          className="memory-modal-backdrop"
          onClick={() => setIsResetConfirmOpen(false)}
        >
          <div
            aria-modal="true"
            className="memory-modal panel confirm-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="panel__header">
              <p className="eyebrow">Reset</p>
              <h2>게임을 초기화할까요?</h2>
              <p className="muted">
                현재 진행과 회차 기록, 기억 조각이 모두 처음 상태로 돌아갑니다.
              </p>
            </div>

            <div className="confirm-modal__actions">
              <button
                className="secondary-button"
                onClick={() => setIsResetConfirmOpen(false)}
                type="button"
              >
                취소
              </button>
              <button
                className="primary-button primary-button--danger"
                onClick={handleConfirmResetGame}
                type="button"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
