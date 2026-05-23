# Re:Born Korea - GDD

## 1. Game Summary

### Title
Re:Born Korea

### Core Pitch
A Reigns-like Korean job survival game about repeating lives until interview day, surviving long enough to get employed, and eventually recovering lost memory fragments to reach a true ending.

### Core Experience
- Swipe left or right to make life decisions.
- Keep four visible stats alive until the final interview.
- Fail, restart, and try again with more context.
- Clear employment first, then move into memory-fragment progression.
- Recover all memory fragments to unlock the true ending route.

## 2. Current Run Structure

The current project is built around short repeated lives.

### Run 1
- Starts with the first-life tutorial.
- Moves into the normal random event loop.
- Ends at the fixed final interview.

### Run 2
- Starts with a separate second-life tutorial.
- Moves into the normal random event loop.
- Ends at the fixed final interview.

### Run 3 and Later
- No tutorial by default.
- The player immediately enters the normal event loop.
- Failure means repeating runs until employment is achieved.

## 3. Main Game Flow

### Phase 1. Employment Survival
The first goal is simple:
- survive to interview day
- pass the final interview

The player may fail multiple lives before succeeding.

### Phase 2. Memory Fragment Collection
After the player has succeeded at employment at least once, the long-term structure changes.

Planned flow:
- a special memory-fragment event appears on turn 15
- the player must choose correctly to obtain the fragment
- fragments are collected in order: `1 -> 2 -> 3`
- each fragment is tied to a relationship theme:
  - girlfriend
  - friend
  - family

### Phase 3. True Ending Route
After all memory fragments are collected:
- the true ending route unlocks
- it is played as event-style story progression, not as a detached ending screen
- the final route should feel like a deliberate authored life, not just another survival run

## 4. Design Pillars

### 1. Job-search pressure comes first
The game is still grounded in Korean employment anxiety, survival pressure, exhaustion, and social comparison.

### 2. Repetition is the structure
The roguelike layer matters.
The player is expected to fail, retry, and gradually understand more.

### 3. Tutorials are life-specific
The first and second lives are intentionally distinct:
- life 1 teaches the base loop
- life 2 teaches that repetition itself matters

### 4. Employment is not the final goal
Getting hired is a major milestone, not the final ending.

### 5. Memory fragments reshape the game
Once the player reaches the memory phase, the run structure gains a mid-run objective beyond mere survival.

## 5. Turn Structure

### Current Structure
- total run length: `30 turns`
- tutorial events are included inside the same run
- final interview appears at the end as a guaranteed event

### Planned Memory Event Rule
After employment progression is unlocked:
- a special fragment event should appear at turn 15
- only one fragment should be available at a time
- the next fragment should not appear until the previous one has been obtained

## 6. Stats

### Visible Stats
- `Spec`
- `Money`
- `Reputation`
- `Mental`

### Hidden Tone Variable
- `SelfTrust`

### Interpretation
- `Spec`: employability on paper
- `Money`: material survival
- `Reputation`: social impression and surface confidence
- `Mental`: psychological endurance
- `SelfTrust`: inner stability and identity tone

## 7. Current Scene Model

Inside a run, the current implementation still uses:
- `setup`
- `event`
- `result`
- `ending`

At the app level, the project now also includes:
- `title`
- `encyclopedia`
- `memory-hub`
- `true-ending`

Important note:
- the true ending scene exists structurally
- the full event-style true-ending route is still planned content, not completed content

## 8. Current Content Status

### Implemented
- first-life tutorial
- second-life tutorial
- random event pool
- fixed final interview
- stat-based interview resolution
- memory shard meta system
- event encyclopedia page
- unlock-card scaffolding

### Planned Next Story Progression
- turn-15 fragment event chain
- ordered fragment acquisition
- girlfriend, friend, family fragment themes
- event-style true ending route

## 9. Memory Fragment Design Direction

### Narrative Rule
Memory fragments should not feel like random collectibles.
They should reveal emotional truth through repeated lives.

### Planned Order
1. Girlfriend fragment
2. Friend fragment
3. Family fragment

### Mechanical Rule
- fragments are unlocked sequentially
- the player must make the correct choice inside the fragment event
- missing the correct choice means the fragment is not acquired that run

## 10. Ending Structure

### Failure Ending
- the player fails the run before meaningful completion

### Employment Success
- the player survives and passes the final interview
- this advances the larger progression but does not finish the whole game

### True Ending
- only available after collecting all key memory fragments
- should unfold as a sequence of special events

## 11. Scope Rules

### In Scope Right Now
- repeated lives
- two tutorial variants
- employment survival loop
- event encyclopedia
- meta persistence
- memory and unlock scaffolding

### Next In Scope
- post-employment fragment progression
- gated turn-15 memory events
- true ending event route

### Out of Scope for Now
- giant branching NPC relationship simulator
- large hub-world exploration
- heavy combat or action systems

## 12. Success Criteria

The current structure succeeds if players understand:
- life 1 and life 2 are intentionally different
- failing and retrying is expected
- employment is a milestone, not the whole game
- the game is building toward memory recovery and a true ending

The next structure succeeds if players feel:
- the turn-15 fragment events matter
- the fragment order feels intentional
- the true ending feels earned through repeated lives
