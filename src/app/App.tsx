import type { CSSProperties } from "react";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import titleBackgroundImage from "../assets/images/backgrounds/title/background_title_mobile.png";
import idCardImage from "../assets/images/objects/id_card.png";
import { preloadImagesWhenIdle } from "../assets/preload/imagePreloader";
import { TrueEndingCreditsScreen } from "../components/ending/TrueEndingCreditsScreen";
import { TrueEndingScreen } from "../components/ending/TrueEndingScreen";
import { TrueEndingStoryScreen } from "../components/ending/TrueEndingStoryScreen";
import { GameScreen } from "../components/game/GameScreen";
import { DdayCalendar } from "../components/layout/DdayCalendar";
import { SetupScreen } from "../components/setup/SetupScreen";
import { getPrototypeEventById } from "../game/content/eventCards";
import {
  countUnlockedDefinedMemoryShards,
  firstClearMemoryShardId,
  getMemoryShardById,
  getUnlockedDefinedMemoryShardIds,
  memoryShards,
} from "../game/content/memoryShards";
import {
  trueEndingCredits,
  trueEndingIntro,
  trueEndingStoryCards,
} from "../game/content/trueEnding";
import {
  loadPersistedGameState,
  persistGameState,
} from "../game/core/gamePersistence";
import { gameReducer } from "../game/core/gameReducer";
import type { AppScene } from "../game/core/gameTypes";
import { getPhase2DebugGameState } from "../game/debug/phase2DebugSave";
import { buildGameScreenViewModel } from "../game/viewModels/buildGameScreenViewModel";
import { buildSetupScreenViewModel } from "../game/viewModels/buildSetupScreenViewModel";

const SHOW_TITLE_DEBUG_BUTTONS = false;

const runGameScenes: AppScene[] = [
  "run-event",
  "run-result",
  "run-ending",
  "run-game-over",
];

const topbarHiddenScenes: AppScene[] = [
  "title",
  "run-event",
  "run-result",
  "run-ending",
  "run-game-over",
  "first-clear-reward",
];

const footerHiddenScenes: AppScene[] = [
  "title",
  "run-setup",
  "first-clear-reward",
];

function isSceneIn(scene: AppScene, scenes: AppScene[]) {
  return scenes.includes(scene);
}

const hudHighlightTutorialIds = [
  "tutorial-choice-state",
  "tutorial-stat-threshold",
  "tutorial-thirty-days",
  "second-life-four-metrics",
  "second-life-metric-meanings",
  "second-life-too-high",
];

function getTrueEndingImageSources() {
  return [
    ...trueEndingStoryCards.map((card) => card.imageSrc),
    ...trueEndingCredits.items.flatMap((item) =>
      item.type === "message" ? [] : [item.imageSrc],
    ),
  ];
}

function hasLockedMemoryShardTag(
  eventId: string | null | undefined,
  unlockedMemoryShardIds: string[],
) {
  if (!eventId) {
    return false;
  }

  const event = getPrototypeEventById(eventId);
  if (!event) {
    return false;
  }

  return event.choices.some((choice) =>
    choice.memoryTags?.some(
      (tag) =>
        getMemoryShardById(tag) !== null &&
        !unlockedMemoryShardIds.includes(tag),
    ),
  );
}

export function App() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    loadPersistedGameState,
  );
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [selectedMemoryShardId, setSelectedMemoryShardId] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "failed">("idle");
  const knownUnlockedMemoryShardIdsRef = useRef(
    getUnlockedDefinedMemoryShardIds(state.meta.unlockedMemoryShardIds),
  );
  const selectedMemoryShard = selectedMemoryShardId
    ? getMemoryShardById(selectedMemoryShardId)
    : null;
  const unlockedMemoryShardCount = countUnlockedDefinedMemoryShards(
    state.meta.unlockedMemoryShardIds,
  );
  const activeTrueEndingCard =
    state.trueEndingProgress &&
    trueEndingStoryCards[state.trueEndingProgress.storyIndex]
      ? trueEndingStoryCards[state.trueEndingProgress.storyIndex]
      : null;

  const footerName = state.run?.profile.name ?? "";
  const footerDaysLeft =
    state.run && Number.isFinite(state.run.maxTurns)
      ? Math.max(state.run.maxTurns - state.run.turn - 1, 0)
      : null;
  const lifeCount =
    state.run || state.meta.runCount > 0
      ? `${state.meta.runCount + (state.run ? 1 : 0)}번째 인생`
      : "";
  const hasStartedGame = Boolean(state.run || state.meta.runCount > 0);
  const canOpenSurvey = state.meta.trueEndingSeen;
  const isMemoryShardButtonDisabled = !state.meta.isFirstCleared;
  const shouldFlashMemoryShardButton =
    !isMemoryShardButtonDisabled &&
    state.run?.scene === "event" &&
    hasLockedMemoryShardTag(
      state.run.currentEventId,
      state.meta.unlockedMemoryShardIds,
    );
  const shouldShowPhase2DebugLoad =
    SHOW_TITLE_DEBUG_BUTTONS && import.meta.env.DEV;
  const shouldShowTrueEndingDebug =
    SHOW_TITLE_DEBUG_BUTTONS && import.meta.env.DEV;
  const shouldShowTrueEndingReplay =
    state.appScene === "title" && state.meta.trueEndingSeen;
  const shouldHighlightHud =
    state.run?.currentEventId !== null &&
    state.run?.currentEventId !== undefined &&
    hudHighlightTutorialIds.includes(state.run.currentEventId);
  const shouldShowTopbar = !isSceneIn(state.appScene, topbarHiddenScenes);
  const shouldShowFooter = !isSceneIn(state.appScene, footerHiddenScenes);
  const setupViewModel = useMemo(
    () =>
      state.appScene === "run-setup" && state.run
        ? buildSetupScreenViewModel(
            state.run,
            state.meta.runCount,
            state.meta,
            dispatch,
          )
        : null,
    [state.appScene, state.meta, state.run],
  );
  const gameViewModel = useMemo(
    () =>
      isSceneIn(state.appScene, runGameScenes) && state.run
        ? buildGameScreenViewModel(
            state.run,
            state.meta.runCount,
            state.meta,
            dispatch,
          )
        : null,
    [state.appScene, state.meta, state.run],
  );

  useEffect(() => {
    persistGameState(state);
  }, [state]);

  useEffect(() => {
    const unlockedDefinedMemoryShardIds = getUnlockedDefinedMemoryShardIds(
      state.meta.unlockedMemoryShardIds,
    );
    const newlyUnlockedMemoryShardId = unlockedDefinedMemoryShardIds.find(
      (id) =>
        id !== firstClearMemoryShardId &&
        !knownUnlockedMemoryShardIdsRef.current.includes(id),
    );

    knownUnlockedMemoryShardIdsRef.current = unlockedDefinedMemoryShardIds;

    if (!newlyUnlockedMemoryShardId) {
      return;
    }

    setIsMemoryModalOpen(false);
    setSelectedMemoryShardId(newlyUnlockedMemoryShardId);
  }, [state.meta.unlockedMemoryShardIds]);

  useEffect(() => {
    if (
      state.appScene !== "true-ending" &&
      state.appScene !== "true-ending-story" &&
      state.appScene !== "true-ending-credits"
    ) {
      return undefined;
    }

    return preloadImagesWhenIdle(getTrueEndingImageSources(), {
      batchSize: 5,
      timeout: 800,
    });
  }, [state.appScene]);

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

  function handleOpenTrueEndingDebug() {
    dispatch({ type: "debug/trueEndingRequested" });
  }

  function handleReplayTrueEnding() {
    dispatch({ type: "app/trueEndingReplayRequested" });
  }

  function handleReturnToTitle() {
    setIsSettingsModalOpen(false);
    dispatch({ type: "app/returnedToTitle" });
  }

  function handleOpenResetConfirm() {
    setIsSettingsModalOpen(false);
    setIsResetConfirmOpen(true);
  }

  function handleConfirmResetGame() {
    dispatch({ type: "app/newGameResetRequested" });
    setIsResetConfirmOpen(false);
  }

  async function copyShareUrl(url: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }

  function showShareStatus(status: "copied" | "failed") {
    setShareStatus(status);
    window.setTimeout(() => setShareStatus("idle"), 1800);
  }

  async function handleShareGame() {
    const shareData = {
      title: "Re:Born Korea",
      text: "면접일까지 다시 태어나 버티는 선택형 생존 게임",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
        }
      }

      await copyShareUrl(shareData.url);
      showShareStatus("copied");
    } catch {
      showShareStatus("failed");
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
                <p className="title-screen__subtitle">2026 한국 취업 시뮬레이션</p>
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
                {shouldShowTrueEndingDebug ? (
                  <button
                    className="title-screen__button"
                    onClick={handleOpenTrueEndingDebug}
                    type="button"
                  >
                    최종엔딩
                  </button>
                ) : null}
                {shouldShowTrueEndingReplay ? (
                  <button
                    className="title-screen__button"
                    onClick={handleReplayTrueEnding}
                    type="button"
                  >
                    최종엔딩 다시 보기
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
          ) : setupViewModel ? (
            <SetupScreen
              viewModel={setupViewModel}
            />
          ) : isSceneIn(state.appScene, runGameScenes) ? (
            gameViewModel ? (
              <GameScreen
                highlightHud={shouldHighlightHud}
                viewModel={gameViewModel}
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
          ) : state.appScene === "first-clear-reward" ? (
            <div className="memory-modal-backdrop memory-modal-backdrop--reward">
              <section
                aria-modal="true"
                className="memory-modal panel first-clear-reward"
                role="dialog"
              >
                <div className="memory-modal__header">
                  <div>
                    <h2>기억의 조각 획득</h2>
                  </div>
                </div>

                <div className="first-clear-reward__showcase">
                  <div className="first-clear-reward__halo" />
                  <div className="first-clear-reward__burst first-clear-reward__burst--left" />
                  <div className="first-clear-reward__burst first-clear-reward__burst--right" />
                  <div className="first-clear-reward__card-frame">
                    <img
                      alt="첫 합격으로 되찾은 기억의 조각 신분증 이미지"
                      className="first-clear-reward__image"
                      src={idCardImage}
                    />
                  </div>
                </div>

                <div className="memory-modal__item first-clear-reward__copy">
                  <strong>첫 합격의 흔적</strong>
                  <p className="muted">
                    첫 면접을 넘어섰다.
                    잊고 있던 기억의 조각 하나가 돌아왔다.
                  </p>
                </div>

                <button
                  className="primary-button first-clear-reward__button"
                  onClick={() => dispatch({ type: "reward/continueRequested" })}
                  type="button"
                >
                  확인
                </button>
              </section>
            </div>
          ) : state.appScene === "true-ending" ? (
            <TrueEndingScreen
              ending={trueEndingIntro}
              onComplete={() => dispatch({ type: "trueEnding/started" })}
            />
          ) : state.appScene === "true-ending-story" && activeTrueEndingCard ? (
            <TrueEndingStoryScreen
              card={activeTrueEndingCard}
              currentIndex={state.trueEndingProgress?.storyIndex ?? 0}
              onNext={() => dispatch({ type: "trueEnding/storyAdvanced" })}
              total={trueEndingStoryCards.length}
            />
          ) : (
            <TrueEndingCreditsScreen
              credits={trueEndingCredits}
              onComplete={() => dispatch({ type: "trueEnding/completed" })}
            />
          )}
        </section>
      </main>

      {shouldShowFooter ? (
        <footer className="footer-bar">
          <div className="footer-bar__content">
            <div className="footer-bar__calendar-slot">
              {footerDaysLeft !== null ? (
                <DdayCalendar daysLeft={footerDaysLeft} />
              ) : null}
            </div>

            <div className="footer-bar__identity-block">
              <p className="footer-bar__life">{lifeCount}</p>
              <div className="footer-bar__identity">
                <p>{footerName}</p>
              </div>
            </div>

            <div className="footer-bar__actions">
              <button
                key={
                  shouldFlashMemoryShardButton
                    ? `memory-shard-${state.run?.currentEventId}`
                    : "memory-shard"
                }
                aria-label={
                  isMemoryShardButtonDisabled
                    ? "기억 조각은 2페이즈부터 확인할 수 있습니다"
                    : "기억 조각 보기"
                }
                className={`memory-shard-button${
                  shouldFlashMemoryShardButton
                    ? " memory-shard-button--flash"
                    : ""
                }`}
                disabled={isMemoryShardButtonDisabled}
                onClick={() => setIsMemoryModalOpen(true)}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="memory-shard-button__icon"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M25 2C21.704 2 19 4.704 19 8h-6.5C10.585 8 9 9.585 9 11.5V18c-3.296 0-6 2.704-6 6s2.704 6 6 6v6.5c0 1.915 1.585 3.5 3.5 3.5H19c0 3.296 2.704 6 6 6s6-2.704 6-6h6.5c1.915 0 3.5-1.585 3.5-3.5v-8a1.5 1.5 0 0 0-1.5-1.5H37c-1.674 0-3-1.326-3-3s1.326-3 3-3h2.5a1.5 1.5 0 0 0 1.5-1.5v-8C41 9.585 39.415 8 37.5 8H31c0-3.296-2.704-6-6-6Zm0 3c1.674 0 3 1.326 3 3v1.5a1.5 1.5 0 0 0 1.5 1.5h8c.295 0 .5.205.5.5V18h-1c-3.296 0-6 2.704-6 6s2.704 6 6 6h1v6.5c0 .295-.205.5-.5.5h-8a1.5 1.5 0 0 0-1.5 1.5V40c0 1.674-1.326 3-3 3s-3-1.326-3-3v-1.5a1.5 1.5 0 0 0-1.5-1.5h-8c-.295 0-.5-.205-.5-.5v-8a1.5 1.5 0 0 0-1.5-1.5H9c-1.674 0-3-1.326-3-3s1.326-3 3-3h1.5a1.5 1.5 0 0 0 1.5-1.5v-8c0-.295.205-.5.5-.5h8A1.5 1.5 0 0 0 22 9.5V8c0-1.674 1.326-3 3-3Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

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
            </div>
          </div>
        </footer>
      ) : null}

      {isMemoryModalOpen ? (
        <div
          aria-hidden="true"
          className="memory-modal-backdrop"
          onClick={() => {
            setIsMemoryModalOpen(false);
            setSelectedMemoryShardId(null);
          }}
        >
          <div
            aria-modal="true"
            className="memory-modal panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="memory-modal__header">
              <div>
                <p className="eyebrow">기억 조각</p>
                <h2>
                  {unlockedMemoryShardCount} / {memoryShards.length}
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
                  <div
                    className={`memory-modal__item ${
                      unlocked ? "memory-modal__item--unlocked" : "memory-modal__item--locked"
                    }`}
                    key={shard.id}
                    onClick={() => {
                      if (unlocked) {
                        setSelectedMemoryShardId(shard.id);
                      }
                    }}
                    role={unlocked ? "button" : undefined}
                    tabIndex={unlocked ? 0 : undefined}
                  >
                    <div className="memory-modal__item-header">
                      <strong>{unlocked ? shard.title : "잠긴 조각"}</strong>
                      <span className="memory-modal__status">
                        {unlocked ? "획득" : "힌트"}
                      </span>
                    </div>
                    <p className="muted">
                      {unlocked
                        ? shard.description
                        : "아직 이 기억 조각은 회수하지 못했습니다."}
                    </p>
                    <p className="memory-modal__hint">힌트: {shard.hint}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {selectedMemoryShard ? (
        <div
          aria-hidden="true"
          className="memory-modal-backdrop memory-modal-backdrop--detail"
          onClick={() => setSelectedMemoryShardId(null)}
        >
          <div
            aria-modal="true"
            className="memory-modal panel memory-detail-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="memory-modal__header">
              <div>
                <p className="eyebrow">기억 조각</p>
                <h2>{selectedMemoryShard.title}</h2>
              </div>
              <button
                aria-label="닫기"
                className="memory-modal__close"
                onClick={() => setSelectedMemoryShardId(null)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="memory-detail-modal__symbol">
              <span>{selectedMemoryShard.title.slice(0, 1)}</span>
            </div>

            <div className="memory-modal__item memory-detail-modal__copy">
              <strong>회수 완료</strong>
              <p className="muted">{selectedMemoryShard.description}</p>
              <p className="memory-modal__hint">힌트: {selectedMemoryShard.hint}</p>
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

            {canOpenSurvey ? (
              <a
                className="secondary-button settings-modal__action"
                href="https://docs.google.com/forms/d/e/1FAIpQLScmz4FW2-r0DLMqy3-QNPsqfH9ihX-BSLFQvEOuRxu256l0-g/viewform?usp=publish-editor"
                rel="noreferrer"
                target="_blank"
              >
                설문 참여하기
              </a>
            ) : (
              <button
                className="secondary-button settings-modal__action"
                disabled
                type="button"
              >
                엔딩 후 설문 가능
              </button>
            )}

            <button
              className="secondary-button settings-modal__action"
              onClick={handleShareGame}
              type="button"
            >
              {shareStatus === "copied"
                ? "링크 복사됨"
                : shareStatus === "failed"
                  ? "공유 실패"
                  : "공유하기"}
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
