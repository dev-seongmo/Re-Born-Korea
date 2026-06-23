# Re:Born Korea - Project Structure

This document explains how the current codebase is organized and how the new planned progression fits into it.

## 1. Top-Level Mental Model

Think of the project as four layers:

```text
content -> systems -> view models -> components
```

- `content`: event data, tutorials, endings, memory shards, true-ending story content
- `systems`: turn resolution, roll/balance logic, ending selection, unlock scaffolding
- `view models`: convert game state into screen-ready props
- `components`: render the actual UI

## 2. App-Level Structure

### Entry
- `src/main.tsx`
- `src/app/App.tsx`

### What `App.tsx` currently owns
- reducer wiring
- title scene
- run scenes
- memory hub
- true ending intro/story/credits scenes
- settings and modal UI
- persistence lifecycle
- hidden debug button flags

## 3. Core State Structure

### Main Files
- `src/game/core/gameTypes.ts`
- `src/game/core/gameState.ts`
- `src/game/core/gameReducer.ts`
- `src/game/core/gamePersistence.ts`

### Important Shape
The project now separates:

```ts
GameState = {
  appScene,
  run,
  meta,
  trueEndingProgress,
}
```

### `run`
Current life only:
- scene
- turn
- maxTurns
- profile
- metrics
- selfTrust
- currentEventId
- memoryTags
- eventHistory
- latestResult

### `meta`
Persistent multi-life progress:
- runCount
- successCount
- isFirstCleared
- pendingFirstClearTutorial
- unlockedMemoryShardIds
- unlockedCardIds
- seenEndingIds
- trueEndingUnlocked
- trueEndingSeen

This split is important because the project is no longer a one-run prototype only. It is now built around repeated lives.

## 4. Content Structure

### Event Content
- `src/game/content/eventCards/tutorial.ts`
- `src/game/content/eventCards/tutorial_second.ts`
- `src/game/content/eventCards/tutorial_first_clear.ts`
- `src/game/content/eventCards/tutorial_default.ts`
- `src/game/content/eventCards/girlfriend.ts`
- `src/game/content/eventCards/interview.ts`
- `src/game/content/eventCards/comparison.ts`
- `src/game/content/eventCards/family.ts`
- `src/game/content/eventCards/friendship.ts`
- `src/game/content/eventCards/money.ts`
- `src/game/content/eventCards/spec.ts`
- `src/game/content/eventCards/mental.ts`
- `src/game/content/eventCards/recovery.ts`
- `src/game/content/eventCards/index.ts`

### Other Content
- `src/game/content/memoryShards/index.ts`
- `src/game/content/unlockCards.ts`
- `src/game/content/eventPortraits.ts`
- `src/game/content/endings.ts`
- `src/game/content/archetypes.ts`
- `src/game/content/trueEnding/intro.ts`
- `src/game/content/trueEnding/storyCards.ts`
- `src/game/content/trueEnding/credits.ts`

### Current Meaning
- `tutorial.ts`: first-life intro flow
- `tutorial_second.ts`: second-life intro flow
- `tutorial_first_clear.ts`: short tutorial flow after the first employment clear
- `tutorial_default.ts`: default one-card loop intro for later lives
- `girlfriend.ts`: scheduled phase-2 relationship events after first clear
- general event files: main replayable event pool
- `interview.ts`: fixed final interview event chain
- `memoryShards/index.ts`: defined shard ids, titles, descriptions, hints, and helper queries
- `trueEnding/*`: dedicated true-ending intro, story cards, and credits content

## 5. Event Flow Selection

### Main File
- `src/game/content/eventCards/index.ts`

This file currently decides:
- which tutorial set is active
- how events are registered
- how the next event is drawn
- whether a scheduled girlfriend event should appear after first clear
- which event is the final interview

### Current Rule
- completed runs `0`: first tutorial set
- completed runs `1`: second tutorial set
- pending first-clear tutorial: first-clear tutorial set
- completed runs `2+`: default loop tutorial set
- phase 2 unlocked: scheduled girlfriend events can appear when their turn/status rule matches

### Planned Extension
This same area is the right place to later inject:
- event gating by meta progress
- additional scheduled post-employment authored events

## 6. Game Logic Systems

### Main System Files
- `src/game/systems/turnSystem.ts`
- `src/game/systems/rollSystem.ts`
- `src/game/systems/metricSystem.ts`
- `src/game/systems/gameOverSystem.ts`
- `src/game/systems/endingSystem.ts`
- `src/game/systems/balanceSystem.ts`
- `src/game/systems/identitySystem.ts`
- `src/game/systems/selfTrustSystem.ts`
- `src/game/systems/unlockSystem.ts`

### What they do
- `turnSystem.ts`: resolves a choice into stat changes and result text
- `rollSystem.ts`: determines bad/mixed/good outcome bands
- `metricSystem.ts`: clamps numeric values
- `gameOverSystem.ts`: detects metric boundary failures
- `endingSystem.ts`: chooses ending text
- `balanceSystem.ts`: amplifies deltas and builds impact previews
- `identitySystem.ts`: derives identity stage from stats and tendencies
- `selfTrustSystem.ts`: applies self-trust changes
- `unlockSystem.ts`: placeholder for future choice-driven collectible card unlocks

### Current Interview Reality
There is no separate `interviewSystem.ts` yet. The final interview is modeled as a fixed chain of interview events, and reaching the end of the run currently produces an `employed` outcome in the game-screen view model.

### Current Memory Fragment Logic
Memory shard unlocks are currently handled through meta progression in `gameReducer.ts`.

Current responsibilities:
- block memory shard unlocks before Phase 2
- automatically grant `interview_day` when the player continues after first employment clear
- merge eligible event `memoryTags` into `meta.unlockedMemoryShardIds`
- ignore the first-clear shard for the normal auto-open detail modal
- award `final_truth` after all non-final shards are collected and the player succeeds at employment

## 7. View Models

### Main Files
- `src/game/viewModels/buildSetupScreenViewModel.ts`
- `src/game/viewModels/buildGameScreenViewModel.ts`
- `src/game/viewModels/cardViewModel.ts`

### Current Role
These files decide what the player sees from the current state.

Important examples:
- setup screen start data
- current D-day label
- whether the run is showing event, result, or ending
- what current card portrait and name should be
- final employment message presentation
- dispatch handlers for resolving choices, continuing results, and completing runs
- completed-run count passed into difficulty and preview calculations

### Important Note
The result card has already been collapsed into the same event-card flow, but run state still keeps a `result` scene internally.

## 8. Presentation and UI

### Main Files
- `src/components/game/GameScreen.tsx`
- `src/components/game/SwipeChoiceCard.tsx`
- `src/components/game/CardBody.tsx`
- `src/components/game/CardPortrait.tsx`
- `src/styles/global.css`

### Current UI Facts
- image-based square event cards
- fixed text slot above the card
- fixed name slot below the card
- footer with life count, name, D-day, memory button
- memory button disabled before Phase 2
- memory button flashes when the current event can unlock a new shard
- settings modal
- memory modal
- phone-style employment result message
- true-ending intro/story/credits screens
- title debug buttons hidden by `SHOW_TITLE_DEBUG_BUTTONS`
- card impact preview hidden by `SHOW_CARD_IMPACT_PREVIEW`

## 9. Persistence

### File
- `src/game/core/gamePersistence.ts`

### Current Behavior
- autosaves to `localStorage`
- loads on app boot
- hydrates `run` and `meta`

This means all new meta features should be designed assuming they persist across runs.

## 10. Audio and Assets

### Current Audio Hooks
- `SetupScreen.tsx` starts the afterlife ambience when the game begins
- `buildGameScreenViewModel.ts` stops afterlife ambience when the tutorial flow ends
- `PhoneMessageResult.tsx` plays the message notification sound
- `TrueEndingCreditsScreen.tsx` starts the credits music at 35 seconds and stops it on unmount

### Asset Note
The repository `.gitignore` ignores most files under `src/assets/**/*`.
When adding generated audio or image files that must ship, add them intentionally with `git add -f`.

Previously generated but currently unused experiments may still exist on disk if not removed manually.

## 11. New Planned Progression and Where It Fits

The updated target progression is:

1. First run with tutorial
2. Second run with second tutorial
3. Repeat runs until employment succeeds
4. After employment success, Phase 2 starts
5. The first employment shard is awarded automatically
6. Additional shards are unlocked through meaningful event choices
7. After all non-final shards are collected, another employment success unlocks `final_truth`
8. The true ending proceeds through dedicated intro/story/credits screens

### Best Structural Mapping

#### Run gating
- event selection layer
- `eventCards/index.ts`

#### Fragment unlocks
- `meta`
- `gameReducer.ts`
- event choice `memoryTags`

#### True ending event chain
- current implementation uses dedicated true-ending intro/story/credits screens
- planned event-style true-ending route would replace or refactor that dedicated flow

## 12. Recommended Next Structural Additions

To support the next planned flow cleanly, the next additions should be:

- tests for memory shard gating and final shard unlock
- a small debug/devtools surface if hidden title buttons need to return
- optional true-ending event content if the current dedicated screens are converted to a full card/event route

## 13. Current Reality vs Planned Direction

### Already Implemented
- repeated lives
- first-life, second-life, first-clear, and default loop tutorial variants
- employment survival loop to a fixed successful interview outcome
- Phase 2 memory shard meta persistence
- automatic first-clear shard reward
- event `memoryTags` based shard unlocks
- final shard based true-ending unlock
- scheduled phase-2 girlfriend events after first clear
- dedicated true-ending intro/story/credits screens
- phone-style employment result UI
- survey link in settings
- unlock-card scaffolding

### Not Yet Implemented
- event-style true ending chain
- separate interview success/failure scoring system
- automated tests for memory gating and true-ending unlock

Keep this distinction in mind when editing future docs and content.
