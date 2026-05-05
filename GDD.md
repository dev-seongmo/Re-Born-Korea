# Re:Born Korea - Development GDD v1

## 1. Overview

### Title
Re:Born Korea

### Genre
- 2D web narrative game
- Choice-driven life simulation
- Social satire / emotional growth experience

### Platform
- Web browser
- Desktop and mobile responsive

### Target Build
- Short 2D web prototype focused on accessibility
- Single-session experience
- Playtime target: 10 to 15 minutes

### Core Fantasy
The player survives a comparison-driven Korean society, gradually loses their identity inside social metrics, and eventually recovers a personal standard for living.

### Core Message
- A person cannot be explained by scores alone.
- Money, credentials, reputation, and productivity are not the whole self.
- Even after comparison and pressure, a person can return to their own name.

## 2. Product Goals

### Player Experience Goals
The emotional arc should move through three phases.

1. Recognition
The player feels that the pressure, anxiety, and comparison are realistic and familiar.

2. Exhaustion
The player feels the cost of constantly optimizing for survival, reputation, and competition.

3. Recovery
The player feels relief when personal memories and values replace numerical judgment as the final lens of life.

### Prototype Goals
The first playable prototype must prove these five things.

1. The choice loop is emotionally compelling.
2. Social metrics create meaningful tradeoffs.
3. Hidden self-trust changes the tone of outcomes.
4. Name degradation creates identity loss.
5. The ending can emotionally land in a short session.

## 3. Design Pillars

### 1. Social pressure must feel systemic
Choices should rarely be purely good or bad. Most choices create gains in one area while causing cost elsewhere.

### 2. The game should judge the system, not the player
Even when the player struggles, the framing should not shame them. The game critiques the social structure and honors survival.

### 3. Recovery matters more than success
Endings should not sort players into simple success/failure buckets. The final meaning comes from what they protected or rediscovered.

### 4. Simple interaction, expressive presentation
The input model stays lightweight, but UI feedback carries emotional weight through animation, naming changes, and metric presentation.

### 5. Accessibility is part of the concept
The game should be easy to start, easy to understand, and fully playable without high dexterity or heavy device requirements.

## 4. Scope

### In Scope for Prototype v1
- Start screen with personal input fields
- Randomized life-start archetype
- Four visible social metrics
- One hidden metric: self-trust
- 20 event cards
- Two choices per event
- Dice-based outcome resolution
- Name degradation system
- 3 ending routes
- 2D web UI with accessible controls

### Out of Scope for Prototype v1
- AI-generated live content
- 30s full simulation system
- 40+ event branches
- Voice acting
- Background music system beyond minimal support
- Social sharing
- Save/load across sessions

## 5. Audience

### Primary Audience
- Korean young adults and students familiar with comparison pressure
- Players who enjoy short narrative web games
- Players drawn to reflective, socially aware themes

### Secondary Audience
- Global players interested in Korean social themes
- Narrative game players who enjoyed emotionally driven, choice-based experiences

## 6. Core Loop

Each turn follows the same structure.

1. Present event text.
2. Show two choices.
3. Player selects by click or drag.
4. Apply metric modifiers from choice.
5. Roll dice with stat-based adjustment.
6. Resolve outcome text.
7. Update metrics, tags, and hidden self-trust.
8. Recalculate identity label and continue.

### Session Structure
- Setup: 1 to 2 minutes
- Main play: 12 to 16 turns representing late teens to 20s
- Endgame collapse sequence
- Ending summary

## 7. Game Structure

### Phase 1: Setup
The player enters personal details:
- Name
- Close friend's name
- Favorite food
- Favorite place
- Something they have loved for a long time
- Words they want to hear

These values are stored for later use in the ending.

### Phase 2: 20s Main Play
This is the core interactive phase.

The player repeatedly receives social events tied to:
- exams
- university
- grades
- part-time work
- job seeking
- family pressure
- SNS comparison
- friendship
- burnout
- rest
- ambition
- compromise

### Phase 3: Identity Collapse
Near the end of the run, the system intensifies metric language, identity labels worsen, and screen presentation becomes colder and more evaluative.

### Phase 4: Ending Recovery
Visible social metrics lose narrative authority. Personal values and remembered details return to the foreground. The ending text evaluates the player by what they held onto, not only by what they achieved.

## 8. Systems

## 8.1 Visible Metrics

The player sees four metrics at all times.

### Spec
Meaning:
Academic credentials, portfolio quality, experience, employability.

### Money
Meaning:
Living stability, savings, ability to absorb risk.

### Reputation
Meaning:
External approval, family expectations, social image, perceived respectability.

### Mental
Meaning:
Stress tolerance, burnout level, emotional recovery capacity, self-worth stability.

### Metric Rules
- Range: 0 to 100
- Starting value: determined by start archetype
- Soft center target: 40 to 70
- Low values trigger crisis risk
- Very high values can create thematic penalties

Examples:
- Very low Money reduces flexibility.
- Very high Spec can increase alienation events.
- Very high Reputation can suppress honest choices.
- Very low Mental increases collapse text frequency.

## 8.2 Hidden Metric: Self-Trust

### Purpose
Self-trust is the thematic backbone of the game. It represents whether the player still believes in their own inner standard.

### Visibility
- Hidden during normal play
- Referenced indirectly through tone, event outcomes, and ending logic

### Range
- 0 to 100

### Increases When
- The player resists pure comparison
- The player rests when necessary
- The player speaks honestly
- The player keeps meaningful relationships
- The player does not abandon what they love
- The player accepts failure without self-erasure

### Decreases When
- The player acts mainly to satisfy external judgment
- The player constantly pretends to be fine
- The player sacrifices selfhood for optimization
- The player treats rest as guilt
- The player erases their own voice

### Gameplay Impact
- Modifies outcome text tone
- Helps determine final ending
- Can soften identity degradation
- Can unlock recovery-focused phrasing late in the game

## 8.3 Start Archetypes

The player receives one randomized starting condition. The language should describe life circumstances without explicitly labeling them as superior or inferior.

### Stable Start
- Higher Money
- Higher Reputation pressure
- More room to recover after mistakes

### Average Start
- Balanced values
- Strongly shaped by player choice

### Unstable Start
- Lower Money
- Higher pressure around survival
- Stronger resilience-flavored events

### Isolated Start
- Lower Reputation support
- Harder Mental stability
- Stronger self-trust recovery opportunities

### Over-Expected Start
- Strong external conditions
- High starting Reputation
- Greater risk of identity loss

## 8.4 Focus Tracking

The game tracks long-term behavioral patterns.

### Tracked Tendencies
- Spec-focused
- Money-focused
- Reputation-focused
- Mental-defensive
- Self-trust recovery
- Comparison-driven
- Balanced

### Usage
- Ending summary text
- Mid-run flavor lines
- Future expansion into tailored events

## 8.5 Dice Resolution

### Purpose
The dice system represents uncertainty, unfairness, and the fact that effort does not guarantee reward.

### Base Flow
1. Event offers two choices.
2. Each choice has:
   - immediate stat shifts
   - dice modifier
   - success/failure outcome table
3. Dice is rolled.
4. Relevant metrics modify the result.
5. Final outcome is selected.

### Suggested Prototype Formula
- Roll: `1d6`
- Final score = dice result + choice modifier + relevant stat bonus

### Suggested Stat Bonus Rule
- Relevant stat 0 to 24: `-1`
- Relevant stat 25 to 59: `0`
- Relevant stat 60 to 100: `+1`

### Outcome Bands
- 1 to 2: bad outcome
- 3 to 4: mixed outcome
- 5+: good outcome

This formula is intentionally simple for prototype balancing.

## 8.6 Identity Label System

The player's displayed name changes based on cumulative surrender to external evaluation.

### Narrative Function
The player begins as a person and gradually becomes a category, ranking, or probability.

### Trigger Inputs
- Low self-trust
- High comparison-driven behavior
- Severe Mental decline
- High Reputation dependence

### Suggested Label Stages
1. `{name}`
2. `취준생 {name}`
3. `지원자`
4. `지원자 #1042`
5. `평가 대상`
6. `평균 이하`
7. `합격 가능성 37%`
8. `데이터 없음`

### Recovery Rule
The true name must reappear in the ending, especially in recovery-oriented endings.

## 9. Content Structure

## 9.1 Event Card Format

Each event card should contain:
- id
- phase tag
- event text
- choice A text
- choice B text
- primary affected metrics
- self-trust delta
- dice modifier
- result text for bad / mixed / good outcomes
- memory tags
- optional follow-up tags

### Example Data Shape
```json
{
  "id": "friend_job_offer",
  "phase": "20s_early",
  "text": "A friend posts that they got into a major company. You stop while typing congratulations.",
  "choices": [
    {
      "id": "stay_grounded",
      "label": "Congratulate them sincerely and keep your pace.",
      "effects": { "mental": 4, "reputation": 0, "spec": 0, "money": 0, "selfTrust": 5 },
      "rollMod": 0,
      "primaryStat": "mental",
      "results": {
        "bad": "You still feel shaken, but you do not abandon your own rhythm.",
        "mixed": "The anxiety lingers, yet your day stays intact.",
        "good": "The conversation leaves you steadier than before."
      },
      "memoryTags": ["friendship", "self_pace"]
    }
  ]
}
```

## 9.2 Event Categories

The first prototype should distribute 20 events across these themes.

- Comparison and SNS
- Family pressure
- Part-time work and money
- Study and credentials
- Rest and guilt
- Friendship and connection
- Honesty versus performance
- Burnout and health
- Opportunity and exploitation
- Small recovery moments

## 10. Endings

Prototype v1 uses three endings. More can be added later.

## 10.1 Ending A: Proof of Worth

### Likely Conditions
- High Spec or Reputation
- Low self-trust
- Frequent comparison-driven choices

### Theme
The player achieved externally legible success but became alienated from the self.

## 10.2 Ending B: Barely Survived

### Likely Conditions
- Money-focused survival
- Low to mid self-trust
- Low Mental or unstable balance

### Theme
The player endured and protected life under pressure, but rest and warmth were repeatedly postponed.

## 10.3 Ending C: Name Reborn

### Likely Conditions
- Mid or high self-trust
- At least one preserved personal-value tag
- Not fully collapsed into external identity

### Theme
The player rediscovers a human-scale life standard beyond scores.

## 10.4 Ending Composition

Each ending should combine:
- social summary
- behavior tendency summary
- one recovered personal detail
- final naming line

### Required Ending Inputs
- Final visible metrics
- Final self-trust
- Dominant tendency
- Identity label stage reached
- Saved personal inputs
- Memory tags collected

## 11. UX and UI Direction

## 11.1 Visual Direction

The game is 2D and browser-first. Presentation should feel restrained, sharp, and emotionally intentional rather than flashy.

### Primary Symbols
- Scale: burden of comparison and tradeoffs
- Dice: uncertainty, unfairness, and chance
- Breaking numbers: collapse of social measurement
- Name mutation: loss of self

### Base Layout
- Top: four visible metrics
- Center: event text card
- Bottom: two choices
- Side or overlay: dice feedback and result text

## 11.2 Interaction Model

Support both methods:
- click/tap to choose
- drag token toward a choice as an optional expressive interaction

The click path must always be available as the simplest and most accessible control.

## 11.3 Accessibility Requirements

- Full keyboard support
- High contrast text
- Text should not rely on color alone
- Motion reduction option
- Minimum readable font sizes on mobile
- Clear focus states
- Short animation timings
- No drag-only required interactions

## 11.4 Responsive Rules

### Desktop
- Metrics stay visible at top
- Event card centered
- Choice cards side by side or stacked depending on width

### Mobile
- Metrics collapse into compact bars or chips
- Event card remains central
- Choice buttons stack vertically
- Drag interaction becomes optional only

## 12. Audio Direction

Prototype audio is optional. If included:
- subtle ambient loop
- restrained UI sounds
- soft but tense result feedback

Avoid triumphant reward language. The emotional tone should remain humane and reflective.

## 13. Narrative Tone Guide

### Principles
- The game can be sharp, but not cruel.
- The system may feel cold; the authorial voice should remain compassionate.
- The player should feel seen, not accused.
- Social satire should target structures and norms more than individuals.

### Writing Style
- Short event text
- Concrete everyday situations
- Natural Korean phrasing in final implementation
- Avoid overly abstract moral statements during main play
- Reserve the strongest emotional lines for collapse and ending sequences

## 14. Technical Design Notes

### Recommended Prototype Architecture
- Frontend-only 2D web game
- Scene/state-based structure
- Data-driven event cards in JSON or TS object arrays

### Suggested Game States
- title
- setup
- archetype_intro
- event_turn
- dice_resolution
- result
- collapse_sequence
- ending

### Suggested Data Modules
- `playerProfile`
- `metrics`
- `events`
- `endingRules`
- `memoryTags`
- `identityLabelRules`

## 15. Balancing Rules

### Baseline Principles
- Every choice should cost something or protect something.
- The player should feel tension without constant punishment.
- Recovery choices must exist often enough to avoid emotional monotony.
- The hidden self-trust path should be discoverable through tone, not explanation.

### Failure Philosophy
The game should allow difficult runs without making the player feel "wrong." Even harsh endings should carry dignity and recognition.

## 16. Prototype Content Targets

### Must-Have Content
- 20 event cards
- 5 start archetypes
- 3 endings
- 8 identity labels
- 10 to 15 memory tags

### Nice-to-Have If Time Allows
- 1 late-game collapse vignette set
- 1 special recovery event chain
- dynamic metric warning text

## 17. Success Criteria

The prototype succeeds if playtesters can clearly report:

1. "I felt the pressure of trying to optimize my life."
2. "I understood that visible success was not the whole point."
3. "The ending felt personal."
4. "The name change hit emotionally."
5. "I could play comfortably on both desktop and mobile."

## 18. Production Priorities

### Priority 1
- Finalize metric formulas
- Finalize self-trust rules
- Build event data structure
- Define ending rules
- Define UI wireframe

### Priority 2
- Write 20 prototype events
- Implement identity label transitions
- Build collapse sequence
- Tune dice outcome pacing

### Priority 3
- Add richer animations
- Add more endings
- Expand event pool
- Add audio polish

## 19. Open Questions

- How often should explicitly positive recovery events appear?
- Should self-trust subtly alter odds, or only narrative tone and ending logic?
- How punishing should low Money be in a short prototype?
- How visible should identity degradation triggers feel to the player?
- Should the 30s phase remain cut from v1, or appear as a compressed ending montage?

## 20. Next Deliverables

The next practical documents to produce are:

1. Prototype system spec
2. Event card schema
3. 20-card prototype event set
4. Ending rule table
5. UI wireframe for desktop and mobile
