import { getEventPortrait } from "../content/eventPortraits";
import type { EventCard } from "../core/gameTypes";
import type { ChoiceImpactPreview } from "../systems/balanceSystem";
import { buildChoiceImpactPreview } from "../systems/balanceSystem";
import type { CardViewModel } from "../viewModels/cardViewModel";

const noImpactPreview: ChoiceImpactPreview = {
  primary: [],
  possible: [],
  selfTrustDelta: 0,
};

function buildVisibleImpactPreview(event: EventCard, choiceIndex: 0 | 1) {
  if (event.category === "tutorial" || event.category === "interview") {
    return noImpactPreview;
  }

  return buildChoiceImpactPreview(event.choices[choiceIndex]);
}

export function mapEventToCardViewModel(event: EventCard): CardViewModel {
  const portrait = getEventPortrait(event);

  return {
    characterName: event.characterName ?? "청령차사",
    portraitAlt: portrait.alt,
    portraitSrc: portrait.src,
    leftPreviewText: event.choices[1].label,
    rightPreviewText: event.choices[0].label,
    leftImpactPreview: buildVisibleImpactPreview(event, 1),
    rightImpactPreview: buildVisibleImpactPreview(event, 0),
  };
}
