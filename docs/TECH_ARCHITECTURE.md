# Re:Born Korea - Technical Architecture

## 1. Current Technical Direction

The project is now a small state-driven React game with persistent multi-run progression.

Current stack:
- `Vite`
- `React`
- `TypeScript`
- `Howler.js`

This is still a good fit.

## 2. What Changed Structurally

The project is no longer best described as a single-run prototype.

It now has:
- repeated runs
- run-specific tutorials
- persistent meta progression
- collectible systems
- dedicated true-ending intro, story, and credits scenes
- a settings modal with survey, title-return, and reset actions

Because of that, architecture decisions should now assume:
- multiple lives are normal
- meta state matters
- content gating will grow

## 3. Core Architectural Rule

Keep these concerns separate:

- `event selection`
- `turn resolution`
- `meta progression`
- `screen rendering`

Do not let UI components decide progression rules.

## 4. State Architecture

### Current Model

```ts
GameState = {
  appScene,
  run,
  meta,
  trueEndingProgress,
}
```

### Why this is correct

#### `run`
Represents one current life.

#### `meta`
Represents all persistent progression across lives.

This separation is necessary because the target game flow is:
- fail and retry
- eventually clear employment
- then unlock mid-run fragment progression
- then unlock a true ending route

## 5. Scene Architecture

### App Scenes
- `title`
- `run-setup`
- `run-event`
- `run-result`
- `run-ending`
- `run-game-over`
- `first-clear-reward`
- `memory-hub`
- `true-ending`
- `true-ending-story`
- `true-ending-credits`

### Run Scenes
- `setup`
- `event`
- `result`
- `ending`
- `game-over`

### Important Note
Even though the result card is visually merged into the event card flow, the internal `result` scene is still useful for clean transition logic.

## 6. Event Architecture

### Current Event Shape
Events are typed data modules.

That is the correct direction because it allows:
- easier writing iteration
- easier balancing
- easier future event injection
- easier future debug/content-review tooling

### Current Event Selection Logic
`src/game/content/eventCards/index.ts` currently handles:
- tutorial set selection by completed run count
- first-clear and default loop tutorial selection
- scheduled phase-2 girlfriend event selection
- normal event draw
- final interview insertion

### Why this matters
The upcoming fragment-event phase should be added here or beside it, not inside React components.

### Current Interview Reality
There is no separate interview-scoring system yet. The final interview is a fixed event chain, and reaching the end of the current run flow produces an `employed` outcome.

## 7. Current Memory Progression Architecture

Current implemented memory flow:

1. Run 1 tutorial
2. Run 2 tutorial
3. Repeat until employment success
4. First employment clear opens Phase 2
5. `interview_day` is awarded automatically when Phase 2 starts
6. Later fragments are discovered from choice `memoryTags`
7. After all non-final fragments are collected and employment succeeds again, `final_truth` is awarded and the true ending unlocks

### Current Split

#### A. Run Selection Layer
Responsible for:
- deciding which event comes next
- deciding tutorial set and scheduled Phase 2 relationship events

Implemented in:
- `src/game/content/eventCards/index.ts`

#### B. Meta Progress Layer
Responsible for:
- knowing whether employment has been cleared before
- tracking unlocked memory shards
- tracking whether first-clear tutorial is pending
- tracking whether true ending is unlocked

Current relevant fields already include `isFirstCleared`, `pendingFirstClearTutorial`, `unlockedMemoryShardIds`, `successCount`, and `trueEndingUnlocked`.

#### C. Event Content Layer
Responsible for:
- normal event data and `memoryTags`
- dedicated true-ending intro/story/credits content

Implemented in:
- `src/game/content/eventCards/*`
- `src/game/content/memoryShards/index.ts`
- `src/game/content/trueEnding/*`

#### D. Resolution Layer
Responsible for:
- merging eligible memory tags into persistent memory shards
- deciding whether true ending becomes available

Implemented in:
- `src/game/core/gameReducer.ts`

## 8. Memory Fragment System

The current system does not use special turn-15 fragment events.

### Current Rule Set
- memory shard unlocking is disabled before Phase 2
- the first employment shard is awarded automatically when the player continues after first clear
- normal choices can carry `memoryTags`
- eligible tags are merged into `meta.unlockedMemoryShardIds`
- the first-clear shard does not open the normal newly-unlocked modal
- the final shard is awarded after all other defined shards are collected and the player succeeds at employment

### Why this is better
- reuses existing event content
- keeps fragment discovery tied to meaningful life choices
- avoids a single predictable collection turn
- keeps progression logic out of React components

## 9. True Ending Architecture Recommendation

The current true ending is not only a placeholder: it has dedicated intro, story-card, and credits screens under `src/game/content/trueEnding` and `src/components/ending`.

The story section already reuses the swipe-card interaction style through `TrueEndingStoryScreen`, while still using dedicated content definitions.

### Recommended Modeling
Treat the true ending as:
- a special content sequence
- still rendered through the same card/event presentation system
- driven by dedicated event data

Benefits:
- consistent UX
- less one-off UI code
- easier story iteration

## 10. Settings and Debug Visibility

The settings modal currently exposes:
- survey link
- return to title
- game reset

Title-screen debug buttons remain implemented but are hidden by the `SHOW_TITLE_DEBUG_BUTTONS` flag in `App.tsx`.

Card impact previews remain implemented but are hidden by the `SHOW_CARD_IMPACT_PREVIEW` flag in `SwipeChoiceCard.tsx`.

## 11. Persistence Architecture

Autosave is already active.

This means any new progression feature should be designed with persistence in mind from the start.

### Good Fit for Persistence
- fragment progression
- employment-clear state
- unlock cards
- true-ending unlock state

### Not Recommended
- storing transient animation state
- storing UI-only modal state

## 12. UI / Rendering Responsibilities

### Components should do
- display current event
- display choices
- display overlays, portraits, and labels
- react to swipe and continue actions

### Components should not do
- decide which fragment is next
- decide whether turn 15 becomes a special event
- decide whether employment clear has happened

Those rules belong to systems and meta progression.

## 13. Recommended Next Technical Steps

1. Decide whether true-ending story should remain dedicated screens or become full event-card content.
2. Add explicit interview success/failure scoring if employment should be more than reaching the final flow.
3. Add tests around Phase 2 memory gating and final shard unlock.
4. Continue balancing run difficulty and stat delta amplification.
5. Add a cleaner debug tooling surface if hidden title buttons are needed again.

## 14. Summary

The current architecture is on the right track.

It already supports:
- repeated lives
- first-life, second-life, first-clear, and default loop tutorial sets
- persistent meta state
- app-level scene expansion
- dedicated true-ending screens
- Phase 2 memory shard progression

The next challenge is not basic rendering.
It is tuning progression clarity, balancing, and authored ending polish.

So the main architectural priority from here is:

`keep progression rules testable while tuning memory collection, balance, and authored ending content`
