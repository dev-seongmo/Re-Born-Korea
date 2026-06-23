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
- Uses the default loop tutorial by default.
- Then moves into the normal event loop.
- Failure means repeating runs until employment is achieved.

## 3. Main Game Flow

### Phase 1. Employment Survival
The first goal is simple:
- survive to interview day
- reach and complete the final interview chain

The player may fail multiple lives before succeeding. In the current implementation, reaching the final interview flow results in employment success; separate interview pass/fail scoring is planned but not implemented.

### Phase 2. Memory Fragment Collection
After the player has succeeded at employment at least once, the long-term structure changes.

Current flow:
- memory fragments are only available after Phase 2 starts
- the first employment fragment is awarded automatically when Phase 2 begins
- later fragments are unlocked from existing event choices through `memoryTags`
- the memory button is disabled in Phase 1
- if the current event can unlock an uncollected fragment, the footer memory icon flashes once
- collecting all non-final fragments and then achieving employment unlocks the final fragment and true ending

### Phase 3. True Ending Route
After all memory fragments are collected:
- the true ending route unlocks
- the current implementation plays it through dedicated intro, story, and credits screens
- the story screen uses the same swipe-card interaction language as the main game
- the credits screen autoscrolls and supports press-and-hold speed-up

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
- Phase 2 relationship events can be scheduled after first clear
- memory fragments are discovered through event choice `memoryTags`

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
- `first-clear-reward`
- `memory-hub`
- `true-ending`
- `true-ending-story`
- `true-ending-credits`

Important note:
- the true ending exists as dedicated screens and content
- the full event-style true-ending route is still planned content, not the current implementation

## 8. Current Content Status

### Implemented
- first-life tutorial
- second-life tutorial
- first-clear tutorial
- default loop tutorial
- random event pool
- fixed final interview
- guaranteed employment success after reaching the final interview flow
- memory shard meta system with Phase 2 gating
- automatic first-clear memory shard reward
- memory hub and memory detail modal
- memory footer button disabled before Phase 2
- memory footer icon flash when a current event can unlock a new shard
- scheduled phase-2 girlfriend events after first clear
- dedicated true-ending intro/story/credits screens
- phone-style employment result message
- settings modal with survey link, title return, and reset
- unlock-card scaffolding

### Planned Next Story Progression
- event-style true ending route
- explicit interview success/failure scoring, if desired

## 9. Memory Fragment Design Direction

### Narrative Rule
Memory fragments should not feel like random collectibles.
They should reveal emotional truth through repeated lives.

### Current Shards
- `interview_day`: first employment clear, awarded automatically at Phase 2 start
- `self_pace`: choices about rejecting comparison and keeping one's own pace
- `warm_meal`: choices around friendship, food, and small comfort
- `survival`: pragmatic choices about enduring a difficult life
- `girlfriend_first_meet`: meeting the relationship character
- `girlfriend_confession`: honestly expressing feelings
- `final_truth`: awarded after all non-final shards are collected and employment succeeds

### Mechanical Rule
- fragments can only be unlocked after Phase 2 starts
- event choices accumulate `memoryTags`
- run completion and game-over acknowledgement merge eligible tags into persistent memory shard ids
- `interview_day` is an exception: it is awarded on Phase 2 start without opening the normal shard modal
- `final_truth` is awarded only after all other defined fragments are unlocked and the player gets employed again

## 10. Ending Structure

### Failure Ending
- the player fails the run before meaningful completion

### Employment Success
- the player survives and completes the final interview flow
- this advances the larger progression but does not finish the whole game

### True Ending
- only available after collecting all key memory fragments
- should unfold as a sequence of special events

## 11. Scope Rules

### In Scope Right Now
- repeated lives
- first-life, second-life, first-clear, and default loop tutorial variants
- employment survival loop
- meta persistence
- memory shard collection and hub
- dedicated true-ending screens
- settings modal and survey link

### Next In Scope
- true ending event route
- additional post-employment event writing and memory shard tuning

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
- memory-related choices matter
- the fragment collection path feels intentional
- the true ending feels earned through repeated lives
