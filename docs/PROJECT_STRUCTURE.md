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
- encyclopedia scene
- run scenes
- memory hub
- true ending intro/story/credits scenes
- settings and modal UI
- persistence lifecycle

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
- turn-15 fragment events
- ordered fragment progression
- event gating by meta progress

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

### Planned Memory Fragment Logic
When the turn-15 fragment chain is implemented, it should be handled through a dedicated system rather than hardcoded inside UI components.

Recommended location:
- a new `memoryFragmentSystem.ts`

Responsibilities:
- detect whether fragment progression is active
- inject the correct fragment event on turn 15
- validate whether the player picked the correct fragment choice
- update `meta` progression after run completion or immediately if desired

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
- settings modal
- memory modal
- encyclopedia page

## 9. Persistence

### File
- `src/game/core/gamePersistence.ts`

### Current Behavior
- autosaves to `localStorage`
- loads on app boot
- hydrates `run` and `meta`

This means all new meta features should be designed assuming they persist across runs.

## 10. Encyclopedia

### Current File
- `src/app/App.tsx`

### Current Behavior
The event encyclopedia is app-scene based and shows:
- first-life tutorials
- second-life tutorials
- first-clear tutorials
- default loop tutorials
- normal events
- final interview

This is useful both for design reference and for content review while writing new events.

## 11. New Planned Progression and Where It Fits

The updated target progression is:

1. First run with tutorial
2. Second run with second tutorial
3. Repeat runs until employment succeeds
4. After employment success, a special fragment event appears on turn 15
5. Fragment order is `1 -> 2 -> 3`
6. Fragment themes are girlfriend, friend, family
7. After all fragments are collected, the true ending proceeds as event-style content

### Best Structural Mapping

#### Run gating
- event selection layer
- probably `eventCards/index.ts` plus a new fragment system

#### Fragment order
- `meta`
- probably a future field such as:

```ts
nextFragmentIndex: 0 | 1 | 2 | 3
```

#### Fragment event injection
- event selection layer at turn 15

#### Correct-choice validation
- dedicated system, not the component layer

#### True ending event chain
- current implementation uses dedicated true-ending intro/story/credits screens
- planned event-style true-ending route would replace or refactor that dedicated flow

## 12. Recommended Next Structural Additions

To support the next planned flow cleanly, the next additions should be:

- `meta.hasEmploymentClear` or equivalent
- `meta.nextFragmentIndex`
- `meta.collectedStoryFragmentIds`
- `src/game/content/eventCards/memoryFragments.ts`
- `src/game/systems/memoryFragmentSystem.ts`
- a true-ending event content file if the current dedicated true-ending screens are converted to card/event flow

## 13. Current Reality vs Planned Direction

### Already Implemented
- repeated lives
- first-life, second-life, first-clear, and default loop tutorial variants
- employment survival loop to a fixed successful interview outcome
- memory shard meta persistence
- scheduled phase-2 girlfriend events after first clear
- dedicated true-ending intro/story/credits screens
- unlock-card scaffolding
- encyclopedia page

### Not Yet Implemented
- turn-15 fragment event insertion
- ordered fragment collection
- girlfriend/friend/family fragment route
- event-style true ending chain
- separate interview success/failure scoring system

Keep this distinction in mind when editing future docs and content.
