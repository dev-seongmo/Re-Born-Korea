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

function buildVisibleImpactPreview(
  event: EventCard,
  choiceIndex: 0 | 1,
  completedRunCount: number,
) {
  if (event.category === "tutorial" || event.category === "interview") {
    return noImpactPreview;
  }

  return buildChoiceImpactPreview(event.choices[choiceIndex], completedRunCount);
}

export function mapEventToCardViewModel(
  event: EventCard,
  completedRunCount = 1,
): CardViewModel {
  const portrait = getEventPortrait(event);
  const portraitSrc = event.imageSrc ?? portrait.src;
  const portraitAlt = event.imageAlt ?? portrait.alt;

  return {
    characterName: event.characterName ?? "청령차사",
    portraitAlt,
    portraitSrc,
    leftPreviewText: event.choices[1].label,
    rightPreviewText: event.choices[0].label,
    leftImpactPreview: buildVisibleImpactPreview(event, 1, completedRunCount),
    rightImpactPreview: buildVisibleImpactPreview(event, 0, completedRunCount),
  };
}
