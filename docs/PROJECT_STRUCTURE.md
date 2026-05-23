# Re:Born Korea - Project Structure

This document explains how the current codebase is organized and how the new planned progression fits into it.

## 1. Top-Level Mental Model

Think of the project as four layers:

```text
content -> systems -> view models -> components
```

- `content`: event data, tutorials, endings, fragments
- `systems`: turn resolution, interview scoring, unlock logic
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
- true ending placeholder
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
- `src/game/content/memoryShards.ts`
- `src/game/content/unlockCards.ts`
- `src/game/content/eventPortraits.ts`
- `src/game/content/endings.ts`
- `src/game/content/archetypes.ts`

### Current Meaning
- `tutorial.ts`: first-life intro flow
- `tutorial_second.ts`: second-life intro flow
- general event files: main replayable event pool
- `interview.ts`: fixed final event

## 5. Event Flow Selection

### Main File
- `src/game/content/eventCards/index.ts`

This file currently decides:
- which tutorial set is active
- how events are registered
- how the next event is drawn
- which event is the final interview

### Current Rule
- completed runs `0`: first tutorial set
- completed runs `1`: second tutorial set
- completed runs `2+`: no tutorial

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
- `src/game/systems/interviewSystem.ts`
- `src/game/systems/endingSystem.ts`
- `src/game/systems/unlockSystem.ts`

### What they do
- `turnSystem.ts`: resolves a choice into stat changes and result text
- `rollSystem.ts`: determines bad/mixed/good outcome bands
- `metricSystem.ts`: clamps numeric values
- `interviewSystem.ts`: evaluates final employment success
- `endingSystem.ts`: chooses ending text
- `unlockSystem.ts`: placeholder for future choice-driven collectible card unlocks

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
- should be modeled as event content, not a one-off paragraph screen

## 12. Recommended Next Structural Additions

To support the next planned flow cleanly, the next additions should be:

- `meta.hasEmploymentClear` or equivalent
- `meta.nextFragmentIndex`
- `meta.collectedStoryFragmentIds`
- `src/game/content/eventCards/memoryFragments.ts`
- `src/game/systems/memoryFragmentSystem.ts`
- a true-ending event content file

## 13. Current Reality vs Planned Direction

### Already Implemented
- repeated lives
- two tutorial variants
- employment survival loop
- memory shard meta persistence
- unlock-card scaffolding
- encyclopedia page

### Not Yet Implemented
- turn-15 fragment event insertion
- ordered fragment collection
- girlfriend/friend/family fragment route
- event-style true ending chain

Keep this distinction in mind when editing future docs and content.
