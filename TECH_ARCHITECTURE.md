# Re:Born Korea - Technical Architecture v1

## 1. Recommendation

Yes, `React + TypeScript` is a good choice for this project.

The recommended structure is:

- `React`: app shell, menus, setup form, HUD, accessibility UI, overlays
- `TypeScript`: all gameplay logic, data typing, content safety
- `HTML/CSS`: responsive layout, typography, non-canvas UI
- `Web Audio wrapper`: sound effects, ambience, music control

### Final Recommendation

Use:

- `Vite`
- `React`
- `TypeScript`
- `Howler.js` for audio

Do not scatter animation logic across many React components.  
That will become painful once you add:

- screen shake
- particles
- layered background effects
- metric collapse effects
- mobile performance tuning

## 2. Why This Stack Fits

### React is good for
- setup screens
- form input
- HUD and stat display
- accessibility settings
- modal overlays
- ending text presentation
- responsive layout

### CSS motion is good for v1
- swipe card interaction
- card reveal and flyout transitions
- HUD transitions
- answer overlays
- lightweight motion polish

### A renderer layer can come later if needed
- particles
- heavier collapse effects
- dense sprite scenes
- richer layered backgrounds

### TypeScript is important because
- event cards will grow large
- branching data needs validation
- asset references should be typed
- animation/effect payloads should not become stringly-typed chaos

## 3. High-Level Architecture

Split the project into 4 layers.

### Layer 1. App Shell
Handles:
- routing between title/setup/game/ending
- global settings
- save/load in memory
- accessibility preferences

Tech:
- React

### Layer 2. Game State Layer
Handles:
- player profile
- visible metrics
- hidden self-trust
- current turn
- story tags
- ending evaluation
- identity label stage

Tech:
- TypeScript domain modules
- React state or a small dedicated store

### Layer 3. Presentation Layer
Handles:
- animations
- transitions
- swipe feedback
- answer reveal feedback
- optional future VFX integration

Tech:
- React components
- CSS transforms and transitions

### Layer 4. Content Layer
Handles:
- event cards
- outcome text
- ending text
- archetypes
- identity label tables
- effect metadata

Tech:
- typed JSON or TypeScript data modules

## 4. Core Rule

Keep `game logic` separate from `rendering`.

That means:

- event resolution should not live inside React components
- particle systems should not decide game outcomes
- animation code should only visualize state changes
- story cards should be data, not hardcoded JSX blocks

If we keep this rule, content can scale safely.

## 5. Proposed Project Structure

```text
src/
  app/
    App.tsx
    providers/
    routes/

  game/
    core/
      gameState.ts
      gameReducer.ts
      gameTypes.ts
      gameConstants.ts
    systems/
      eventSystem.ts
      rollSystem.ts
      metricSystem.ts
      selfTrustSystem.ts
      identitySystem.ts
      endingSystem.ts
      memoryTagSystem.ts
    content/
      archetypes.ts
      eventCards/
        comparison.ts
        family.ts
        money.ts
        burnout.ts
        friendship.ts
      endings.ts
      identityLabels.ts
    selectors/
      getDominantTendency.ts
      getCurrentLabel.ts
      getEndingResult.ts

  presentation/
    animation/
      animationController.ts
      presets.ts
      transitions.ts
      screenShake.ts
      dissolve.ts
      numberCollapse.ts
    particles/
      particleController.ts
      emitters/
        stressEmitter.ts
        crackEmitter.ts
        recoveryEmitter.ts
        dustEmitter.ts
  audio/
    audioManager.ts
    audioBus.ts
    soundMap.ts
    musicController.ts

  assets/
    manifest/
      images.ts
      sounds.ts
    sprites/
    backgrounds/
    ui/
    particles/
    audio/
      sfx/
      ambient/
      music/

  components/
    hud/
    setup/
    ending/
    common/

  hooks/
    useGameSession.ts
    useReducedMotion.ts
    useResponsiveLayout.ts

  utils/
    random.ts
    clamp.ts
    weightedPick.ts
    preload.ts
```

## 6. Story and Event Modularization

Your instinct is right: event/story modularization is critical.

Do not organize content as one giant array only.  
Group by `theme + phase + gameplay purpose`.

### Recommended Event Module Units

- `comparison.ts`
- `parents.ts`
- `jobSeeking.ts`
- `partTimeWork.ts`
- `health.ts`
- `rest.ts`
- `friendship.ts`
- `dreams.ts`

Each module exports typed event cards.

### Event Card Shape

```ts
export type EventCard = {
  id: string;
  phase: "early20s" | "mid20s" | "late20s";
  category:
    | "comparison"
    | "family"
    | "money"
    | "spec"
    | "mental"
    | "friendship"
    | "recovery";
  weight: number;
  requirements?: EventRequirement[];
  blocks?: string[];
  text: string;
  choices: [EventChoice, EventChoice];
  afterEffects?: string[];
};

export type EventChoice = {
  id: string;
  label: string;
  immediate: Partial<MetricDelta>;
  selfTrustDelta: number;
  roll:
    | {
        primaryStat: keyof VisibleMetrics;
        modifier: number;
        outcomes: RollOutcomeSet;
      }
    | null;
  memoryTags?: string[];
  tendencyTags?: string[];
  vfx?: VfxCue[];
  sfx?: SoundCue[];
};
```

### Why this matters

This lets us:

- add events without touching engine code
- localize writing work
- balance categories independently
- gate late events behind tags or state

## 7. State Design

Avoid scattering state across many React components.

Use one central game session model.

### Core State

```ts
type GameSession = {
  scene: SceneId;
  turn: number;
  maxTurns: number;
  profile: PlayerProfile;
  archetype: StartArchetype;
  metrics: VisibleMetrics;
  selfTrust: number;
  identityStage: number;
  currentEventId: string | null;
  memoryTags: string[];
  tendencyScores: TendencyScores;
  eventHistory: string[];
  settings: GameSettings;
};
```

### Recommended Pattern

For v1:
- `useReducer` or a tiny store is enough

Do not start with Redux unless the project grows far beyond current scope.

## 8. Scene Flow

Treat the game like a small state machine.

### Main Scene IDs

- `title`
- `setup`
- `archetypeIntro`
- `event`
- `choiceCommit`
- `roll`
- `result`
- `collapse`
- `ending`

### Why state-machine thinking helps

- prevents impossible UI states
- makes transition animation easier
- helps sound cues stay consistent
- reduces edge-case bugs during mid-animation input

## 9. Rendering Strategy

Use a hybrid layout.

### React DOM should render
- setup forms
- accessibility menus
- swipe card stack
- stat labels and numbers
- long narrative text
- ending summaries
- settings UI

### Optional future renderer should handle
- dense particles
- special collapse sequences
- sprite-heavy scenes
- expensive layered VFX

## 10. Animation Architecture

Do not hardcode animation logic in every scene object.

Create a central animation controller with reusable presets.

### Recommended Animation Categories

- `uiReveal`
- `choiceHover`
- `choiceCommit`
- `diceRoll`
- `metricPulse`
- `stressShake`
- `labelCorrupt`
- `collapseBreak`
- `recoveryGlow`

### Preset-Based Design

```ts
type AnimationPreset =
  | "fadeInSoft"
  | "cardSlideUp"
  | "shakeSmall"
  | "shakeHeavy"
  | "numberCrack"
  | "dustBurst"
  | "warmRecover";
```

Benefits:

- consistent feel
- easier tuning
- less copy-paste
- simpler reduced-motion support

## 11. Particle Architecture

Particles should be data-driven too.

### Suggested Particle Uses

- stress flicker
- dust from collapsing numbers
- cracked UI fragments
- warm recovery glow
- subtle ambient float
- choice confirmation burst

### Particle Controller Responsibilities

- spawn emitter by id
- manage lifetime
- pool particle objects
- stop effects on scene change
- downgrade particle count on low-performance devices

### Example Emitter IDs

- `stress-smoke`
- `metric-crack`
- `dice-spark`
- `memory-glow`
- `ending-dust`

### Important Rule

Particles must support quality scaling:

- `high`
- `medium`
- `low`
- `off`

This matters for mobile and accessibility.

## 12. Audio Architecture

Yes, sound is important here, but keep the system simple.

Use one `audioManager` that exposes semantic calls, not raw file names everywhere.

### Good

```ts
audio.play("choice.confirm");
audio.play("dice.roll");
audio.play("ui.collapse");
audio.playMusic("ambient.tension");
```

### Bad

```ts
play("final_v7_mix2.wav");
```

### Audio Categories

- UI
- choice
- dice
- metric feedback
- tension ambience
- recovery ambience
- ending stingers

### Recommended Audio Rules

- one looping ambience bus
- one music bus
- one sfx bus
- independent volume sliders
- mute option
- autoplay-safe startup after user interaction

## 13. Asset Pipeline

This project will likely collect many 2D assets, so naming discipline matters early.

### Asset Categories

- backgrounds
- character/token
- UI frames
- iconography
- dice sprites
- particle sprites
- crack fragments
- ending overlays
- audio

### Naming Convention

Use semantic names.

Examples:

- `bg_city_night_01.png`
- `ui_metric_spec_icon.png`
- `fx_crack_shard_02.png`
- `sfx_choice_confirm_01.wav`
- `amb_tension_loop_01.ogg`

### Asset Manifest

Keep a typed manifest file so content never references bare paths everywhere.

```ts
export const imageAssets = {
  bgIntro: "/assets/backgrounds/bg_intro_01.png",
  diceMain: "/assets/ui/dice_main.png",
  crackShard01: "/assets/particles/fx_crack_shard_01.png",
} as const;
```

This makes preloading and replacement much easier.

## 14. Accessibility Architecture

Accessibility should be built into the architecture, not patched later.

### Required Settings

- reduced motion
- particle intensity
- text speed
- screen shake on/off
- master/music/sfx volume
- high contrast mode

### Implementation Note

Every animation or effect call should accept settings-aware downgrade logic.

Example:

```ts
if (settings.reducedMotion) {
  playPreset("fadeInSoft");
} else {
  playPreset("cardSlideUp");
}
```

## 15. Performance Strategy

You are targeting web and mobile, so design for restraint.

### Rules

- preload only current-scene critical assets first
- lazy-load late scenes if needed
- pool particles instead of constantly creating objects
- avoid very large textures
- limit simultaneous blend-heavy effects
- keep React rerenders away from per-frame animation

### Most Important Performance Rule

React should not drive app-wide rerenders from every tiny drag frame.

Keep pointer-heavy interaction isolated inside the swipe card layer.

## 16. Suggested Tech Decisions for v1

### Recommended

- `Vite` for project bootstrapping and build
- `React + TypeScript` for app shell and typed content
- `Howler.js` for audio
- custom reducer/store for game session
- data-driven content modules for events

### Avoid for v1

- full backend
- over-engineered ECS
- multiplayer assumptions
- heavy physics engine
- large general-purpose state libraries unless needed later
- mixing game resolution logic directly into animation handlers

## 17. Suggested Milestone Order

### Milestone 1. Foundation
- scaffold app
- set folder structure
- build typed game state
- implement setup screen
- implement one event turn loop

### Milestone 2. Core Play
- connect event modules
- build roll resolution
- build HUD
- build identity label changes

### Milestone 3. Presentation
- add dice animation
- add particle controller
- add collapse effects
- add sound manager

### Milestone 4. Content
- add all 20 events
- add 3 endings
- add recovery/collapse sequences

### Milestone 5. Polish
- accessibility settings
- mobile layout tuning
- performance pass
- asset replacement and audio balancing

## 18. Final Answer

So the answer is:

- `Yes`, React + TypeScript is a good base.
- `Yes`, for v1 this can stay clean with React UI, CSS motion, and typed game logic.
- `Best fit right now`: React + TypeScript + Howler on top of Vite.

If we later need denser VFX or sprite-heavy scenes, we can add a renderer layer without rewriting the core game rules.
