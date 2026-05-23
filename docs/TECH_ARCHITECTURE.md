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
- an encyclopedia scene
- a true-ending route placeholder

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
- `encyclopedia`
- `run-setup`
- `run-event`
- `run-result`
- `run-ending`
- `memory-hub`
- `true-ending`

### Run Scenes
- `setup`
- `event`
- `result`
- `ending`

### Important Note
Even though the result card is visually merged into the event card flow, the internal `result` scene is still useful for clean transition logic.

## 6. Event Architecture

### Current Event Shape
Events are typed data modules.

That is the correct direction because it allows:
- easier writing iteration
- easier balancing
- easier future event injection
- easier encyclopedia rendering

### Current Event Selection Logic
`src/game/content/eventCards/index.ts` currently handles:
- tutorial set selection by completed run count
- normal event draw
- final interview insertion

### Why this matters
The upcoming fragment-event phase should be added here or beside it, not inside React components.

## 7. Recommended Progression Architecture for the Next Phase

The next planned game flow is:

1. Run 1 tutorial
2. Run 2 tutorial
3. Repeat until employment success
4. After success, inject a fragment event on turn 15
5. Collect fragments in order `1 -> 2 -> 3`
6. After all fragments are collected, unlock true-ending event chain

### Recommended Split

#### A. Run Selection Layer
Responsible for:
- deciding which event comes next
- deciding whether turn 15 should become a fragment event

Suggested implementation:
- extend `eventCards/index.ts`
- add `memoryFragmentSystem.ts`

#### B. Meta Progress Layer
Responsible for:
- knowing whether employment has been cleared before
- tracking which fragment comes next
- tracking which story fragments are already collected

Suggested future shape:

```ts
meta: {
  runCount: number;
  successCount: number;
  hasEmploymentClear: boolean;
  nextFragmentIndex: number;
  collectedStoryFragmentIds: string[];
}
```

#### C. Event Content Layer
Responsible for:
- fragment event data
- true-ending event data

Suggested files:
- `eventCards/memoryFragments.ts`
- `eventCards/trueEnding.ts`

#### D. Resolution Layer
Responsible for:
- checking whether the fragment choice was correct
- awarding the fragment
- deciding whether true ending becomes available

## 8. Memory Fragment System Recommendation

The turn-15 fragment event should not be modeled as a generic random event.

It should be a gated injection rule.

### Recommended Rule Set
- only becomes active after employment success is achieved
- only appears on turn 15
- only offers the next required fragment in sequence
- only awards the fragment when the correct choice is selected

### Why this is better
- easier to reason about
- easier to test
- avoids accidental duplicate fragment events
- keeps narrative order stable

## 9. True Ending Architecture Recommendation

The true ending should no longer be just a static text scene.

It should become a special event-style route.

### Recommended Modeling
Treat the true ending as:
- a special content sequence
- still rendered through the same card/event presentation system
- driven by dedicated event data

Benefits:
- consistent UX
- less one-off UI code
- easier story iteration

## 10. Encyclopedia Architecture

The event encyclopedia being app-scene based is a good decision.

Why:
- it reuses current event content directly
- it does not require separate content duplication
- it helps debugging and writing

This same pattern can later support:
- fragment encyclopedia
- unlock card encyclopedia
- ending archive

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

1. Add a dedicated meta field for post-employment progression.
2. Add a fragment-event content file.
3. Add a system that injects the fragment event on turn 15.
4. Add ordered fragment validation by choice.
5. Convert true ending from placeholder scene to event-style sequence.

## 14. Summary

The current architecture is on the right track.

It already supports:
- repeated lives
- different tutorial sets
- persistent meta state
- app-level scene expansion

The next challenge is not rendering.
It is progression gating.

So the main architectural priority from here is:

`build a clean post-employment progression layer without mixing that logic into UI components`
