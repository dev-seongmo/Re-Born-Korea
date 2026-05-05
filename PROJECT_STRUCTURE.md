# Re:Born Korea - Project Structure Guide

## 1. Abstract Structure

```text
Re-Born-Korea/
├─ src/
│  ├─ app/                    App entry point
│  ├─ components/             Views
│  ├─ game/
│  │  ├─ core/                State and types
│  │  ├─ content/             Game data
│  │  ├─ systems/             Game rules and calculations
│  │  ├─ selectors/           Derived display values
│  │  ├─ presenters/          Data-to-view mapping
│  │  └─ viewModels/          MVVM-style screen models
│  ├─ audio/                  Audio helpers
│  ├─ assets/                 Asset structure and manifests
│  └─ styles/                 Global styling
├─ index.html
├─ package.json
├─ GDD.md
├─ TECH_ARCHITECTURE.md
└─ PROJECT_STRUCTURE.md
```

## 2. Detailed Structure

```text
src/
├─ app/
│  └─ App.tsx
│     App entry point
│
├─ components/
│  ├─ setup/
│  │  └─ SetupScreen.tsx
│  │     Setup input screen
│  │
│  └─ game/
│     ├─ GameScreen.tsx
│     │  Main game screen
│     ├─ SwipeChoiceCard.tsx
│     │  Reigns-style swipe card
│     ├─ CardBody.tsx
│     │  Card body layout
│     ├─ CardPortrait.tsx
│     │  Portrait area inside the card
│     └─ CardAnswerBadge.tsx
│        Left/right answer badge
│
├─ game/
│  ├─ core/
│  │  ├─ gameTypes.ts
│  │  │  Core game types
│  │  ├─ gameState.ts
│  │  │  Initial game session
│  │  └─ gameReducer.ts
│  │     State updates
│  │
│  ├─ content/
│  │  ├─ archetypes.ts
│  │  │  Start archetype data
│  │  ├─ endings.ts
│  │  │  Ending text data
│  │  ├─ identityLabels.ts
│  │  │  Identity label stages
│  │  └─ eventCards/
│  │     ├─ comparison.ts
│  │     ├─ family.ts
│  │     ├─ friendship.ts
│  │     └─ index.ts
│  │        Event card data registry
│  │
│  ├─ systems/
│  │  ├─ metricSystem.ts
│  │  │  Stat clamping
│  │  ├─ selfTrustSystem.ts
│  │  │  Self-trust calculation
│  │  ├─ rollSystem.ts
│  │  │  Dice roll calculation
│  │  ├─ identitySystem.ts
│  │  │  Identity stage calculation
│  │  ├─ endingSystem.ts
│  │  │  Ending evaluation
│  │  └─ turnSystem.ts
│  │     Full turn resolution
│  │
│  ├─ selectors/
│  │  ├─ getCurrentLabel.ts
│  │  └─ getEndingResult.ts
│  │
│  ├─ presenters/
│  │  └─ mapEventToCardViewModel.ts
│  │     Converts event data into card display data
│  │
│  └─ viewModels/
│     ├─ appViewModel.ts
│     ├─ gameScreenViewModel.ts
│     ├─ setupScreenViewModel.ts
│     ├─ cardViewModel.ts
│     ├─ buildAppViewModel.ts
│     ├─ buildGameScreenViewModel.ts
│     └─ buildSetupScreenViewModel.ts
│        MVVM-style screen/view model builders
│
├─ audio/
│  ├─ audioManager.ts
│  └─ soundMap.ts
│
├─ assets/
│  ├─ manifest/
│  │  ├─ images.ts
│  │  └─ audio.ts
│  ├─ images/
│  ├─ audio/
│  ├─ fonts/
│  ├─ data/
│  ├─ raw/
│  ├─ exports/
│  └─ README.md
│
└─ styles/
   └─ global.css
```

## 3. MVVM Mapping

```text
Model
├─ src/game/core
├─ src/game/content
└─ src/game/systems

ViewModel
├─ src/game/viewModels
├─ src/game/selectors
└─ src/game/presenters

View
├─ src/app/App.tsx
├─ src/components/setup/*
├─ src/components/game/*
└─ src/styles/global.css
```

## 4. Where To Edit What

### Add or edit event cards

Open:

- `src/game/content/eventCards/comparison.ts`
- `src/game/content/eventCards/family.ts`
- `src/game/content/eventCards/friendship.ts`
- `src/game/content/eventCards/index.ts`

### Change game rule calculations

Open:

- `src/game/systems/turnSystem.ts`
- `src/game/systems/rollSystem.ts`
- `src/game/systems/selfTrustSystem.ts`
- `src/game/systems/identitySystem.ts`
- `src/game/systems/endingSystem.ts`

### Change what appears inside the card

Open:

- `src/game/presenters/mapEventToCardViewModel.ts`
- `src/components/game/CardBody.tsx`
- `src/components/game/CardPortrait.tsx`
- `src/components/game/CardAnswerBadge.tsx`

### Change swipe behavior

Open:

- `src/components/game/SwipeChoiceCard.tsx`

### Change main game layout

Open:

- `src/components/game/GameScreen.tsx`
- `src/styles/global.css`

### Change setup screen

Open:

- `src/components/setup/SetupScreen.tsx`
- `src/game/viewModels/buildSetupScreenViewModel.ts`

### Change app-level screen routing

Open:

- `src/app/App.tsx`
- `src/game/viewModels/buildAppViewModel.ts`

## 5. Quick Mental Model

```text
content = what exists in the game
systems = how the game calculates
viewModels = what the screen needs
components = what the player sees
styles = how it looks
```
