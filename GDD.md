# Re:Born Korea - Prototype GDD v3

## 1. Overview

### Title
Re:Born Korea

### Core Definition
This game is still a job-search and survival simulator.

The concept has **not** changed into a pure afterlife fantasy game.
The `저승사자 / 차사` is a framing device, tutorial guide, and thematic mirror.
He adds narrative plausibility, emotional weight, and historical resonance to the player's suffering.

### Prototype Goal
Build a playable short prototype that:
- teaches the loop quickly
- delivers a strong emotional hook
- carries the player from tutorial into the main random event loop
- ends at a fixed interview day
- resolves pass/fail based on accumulated stats

### Intended Player Feeling
The player should feel:
- modern job-search pain is systemic, not individual failure
- the fear of being evaluated is timeless
- the tutorial guide is not just a fantasy NPC, but someone who also belonged to a world that crushed young people
- the final ending connects modern youth suffering with Joseon-era youth suffering

### Platform
- Web browser
- Desktop first
- Mobile readable

### Target Session Length
- 10 to 15 minutes

## 2. High-Level Pillars

### 1. Job simulator first
The gameplay core is a short choice-driven employment survival simulator.
The player manages condition, resources, and emotional erosion while moving toward interview day.

### 2. The afterlife frame supports the simulator
The `차사` does not replace the core loop.
He gives the loop meaning, continuity, and symbolic weight.

### 3. Reigns-like readability
The player should understand the loop instantly:
- card appears
- swipe left or right
- stats change
- result card appears
- next card follows

### 4. Short form, strong impact
This is not a giant life sim.
It is a compressed, emotionally sharp prototype centered on:
- pressure
- comparison
- survival
- exhaustion
- interview day

### 5. Cross-era empathy
The ending should widen the frame from one modern applicant to a longer Korean history of youth burden, fear, duty, and social pressure.

## 3. Core Concept

The player is a modern Korean young adult approaching a crucial interview.
The game counts down toward that day.

At the beginning, the player encounters a `차사`.
He is not there to transport the player into another genre.
He is there to narratively frame the struggle.

He understands the player because he too was once a young man trapped by duty, fear, and a system larger than himself.
He once lived as a nameless soldier in the Joseon period.
He survived where others died, broke under pressure, and tried to flee.
He died before escape was possible.
Now he guides souls and watches the living struggle with different uniforms, different institutions, and the same terror of judgment.

The game therefore says:

`The setting changes. The century changes. The form of suffering changes. But the pressure placed on the young can remain painfully recognizable.`

## 4. Game Identity

### What the game is
- a narrative job-search simulator
- a stat-management prototype
- a card-based choice loop
- a short emotional critique of evaluation systems

### What the game is not
- a full afterlife management game
- a historical simulation
- a pure fantasy adventure
- a large-scale lore game

### One-sentence identity
`A Reigns-like Korean job survival simulator framed by a haunted Joseon chasa who reveals that youth suffering transcends era.`

## 5. Narrative Role of the Chasa

### Function
The `차사` serves four roles:
- tutorial guide
- atmospheric narrator
- symbolic mirror to the player
- bridge between modern and historical suffering

### Important Clarification
He does **not** replace the main character.
He does **not** become the main playable storyline.
He is the one who contextualizes the player's struggle.

### Backstory Summary
- He was once a young soldier.
- He followed a great general into war.
- He lost all familiar comrades.
- He broke under war trauma, fear, isolation, and survivor's guilt.
- He tried to run.
- He died before escape.
- In death, he became a guide for those who cannot outrun judgment.

### Writing Goal
The player should slowly realize:

`This reaper is not merely lecturing me. He was also once a young man cornered by a system, expected to endure until he broke.`

## 6. Historical Handling Rules

### Required Framing
- Focus on emotional truth, not historical trivia
- Keep the `차사` centered, not the great general
- Treat Joseon suffering as a human mirror, not a spectacle

### Naming Rule
Do not directly name real historical figures.
Use:
- `위대한 장군`
- `이름 높은 장군`
- `장군`
- `병사`

### Avoid
- long historical exposition
- history lecture tone
- direct political argument inside the tutorial
- making the Joseon frame feel gimmicky

## 7. Core Loop

Each turn follows this rhythm:

1. A card presents a life situation.
2. The player swipes left or right.
3. Immediate stat changes apply.
4. A short result card appears.
5. The player continues.
6. The countdown moves closer to interview day.

### Fixed Session Arc
- Tutorial cards first
- Main random event loop second
- Final interview card last
- Ending result after interview

## 8. Countdown Structure

### Time Model
The game uses `면접 D-Day` countdown language instead of generic turn count.

### Prototype Count
- total: 30 turns
- tutorial included inside the 30-turn flow
- D-29 to D-1: preparation and erosion
- D-Day: final interview event

### Final Event Rule
The last event is not random.
The interview event is guaranteed to appear at the end.

## 9. Core Stats

### Visible Stats
- `Spec`
- `Money`
- `Reputation`
- `Mental`

### Meaning
`Spec`
Ability to appear employable on paper.

`Money`
Ability to keep surviving materially.

`Reputation`
External social confidence and impression.

`Mental`
Psychological stability, resilience, and ability to endure pressure.

### Hidden Tone Variable
`SelfTrust`
- still valuable for ending tone
- still useful for text flavor and identity
- but not the main visible loop

## 10. Interview Resolution

### Design Principle
The final interview should feel like the accumulation of the whole run.

### Required Rule
Pass/fail is decided by stats, not by arbitrary narrative whim.

### Current Prototype Direction
The result should reflect:
- Spec most strongly
- Mental as a major stabilizer
- Reputation as interview impression
- Money as survival support, but less heavily weighted

### Narrative Meaning
Even if the player chooses well in the final interview card, they cannot fully erase 29 turns of accumulated pressure.
The final scene should feel like a reckoning of everything before it.

## 11. Tutorial Design

### Tutorial Purpose
Teach:
- swiping
- stat consequence
- result card flow
- countdown structure
- who the `차사` is

### Tutorial Role in Overall Structure
The tutorial is not a separate game mode with unrelated rules.
It is simply the first part of the same simulator loop.

### Tutorial Beats
1. The `차사` stops the player.
2. He explains that hesitation and judgment both have costs.
3. The player performs first swipe choices.
4. The player sees stat changes.
5. The player gets a short hint that the `차사` once failed to endure his own world.
6. The game transitions naturally into the main random event pool.

## 12. Main Random Event Direction

### Main Theme
Modern Korean employment survival.

### Event Topics
- comparison with peers
- family pressure
- part-time labor
- résumé and portfolio building
- online self-marketing
- savings and rent
- missed rest
- guilt around comfort
- delayed friendships
- burnout
- compromise

### Tone Rule
The game remains grounded in modern job-seeking reality.
The `차사` may occasionally comment, but the event content itself should still feel like a recognizably modern struggle.

## 13. Ending Direction

### Immediate Ending Layer
The player receives:
- interview result
- emotional summary
- reflection on the path they took

### Final Thematic Layer
The ending should then widen the lens and reveal that the pain of young people being cornered by duty, scarcity, hierarchy, and expectation is not unique to the present.

### Joseon-Era Empathy Goal
The player should leave feeling something like:

`The modern applicant and the Joseon-era soldier were not living the same life, but their fear, exhaustion, and pressure to endure were painfully alike.`

### Required Effect
The game should create cross-era empathy, not flatten history.

### Avoid
- making the ending feel like a twist for shock value
- pretending modern hiring and war service are identical
- melodrama without systemic critique

## 14. Character Direction: Chasa Portrait

### Visual Role
The `차사` portrait should support the card interface and become the face of the tutorial and framing device.

### Desired Impression
- handsome
- strong
- pale
- mysterious
- restrained
- haunted

### Shape Language
- low-poly / faceted feeling
- angular hat silhouette
- clean planar face
- narrow eyes
- composed lips
- broad shoulder read

### Korean Readability
He should read immediately as a Korean afterlife guide rather than a western fantasy reaper.

## 15. UI Direction

### Main Screen
- top: visible stats
- center: current card
- portrait integrated into card
- result also displayed as a card, not a separate detached panel

### Flow Principle
Everything should feel like one continuous card ritual:
- event card
- swipe
- result card
- continue
- next card

### Turn Language
Use `면접 D-Day` countdown framing instead of abstract turns wherever possible.

## 16. Audio Direction

### Mood
- lonely piano
- restrained tension
- romantic-era melancholy
- no vocals
- no modern drum dominance

### Meaning
The sound should support exhaustion, reflection, and quiet dread rather than triumph.

## 17. Scope for Prototype

### Must Have
- playable tutorial integrated into main loop
- main random event loop
- 30-turn countdown structure
- fixed final interview event
- stat-based pass/fail
- result cards
- one strong `차사` portrait asset

### Nice to Have
- subtle `차사` interjections between some modern events
- stronger visual distinction for D-Day
- separate pass/fail result card styling

### Out of Scope
- giant worldbuilding expansion
- many NPC portraits
- full branching storyline
- historical flashback chapter
- large afterlife bureaucracy systems

## 18. Production Priorities

### Priority 1
- stabilize main Reigns-like loop
- connect tutorial to random event flow
- support 30-turn countdown
- guarantee final interview event

### Priority 2
- tune stat balance for pass/fail
- improve tutorial `차사` writing
- improve result card presentation

### Priority 3
- deepen ending resonance with Joseon parallel
- add more event variety
- polish portrait and atmosphere

## 19. Success Criteria

The prototype succeeds if players can say:

1. "This felt like a short but stressful job-search simulator."
2. "The card loop was easy to understand."
3. "The grim reaper framing made the suffering feel heavier, not random."
4. "The ending connected modern youth pain with Joseon-era pain in a moving way."
5. "The interview result felt earned by my stats and choices."

## 20. Next Practical Deliverables

1. Full tutorial-to-main-loop implementation
2. 30-turn event pacing pass
3. Final interview resolution tuning
4. Ending text revision for cross-era empathy
5. Additional random events that better fit the updated framing
