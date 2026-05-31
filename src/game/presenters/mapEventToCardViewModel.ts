import { getEventPortrait } from "../content/eventPortraits";
import type { EventCard } from "../core/gameTypes";
import { buildChoiceImpactPreview } from "../systems/balanceSystem";
import type { CardViewModel } from "../viewModels/cardViewModel";

export function mapEventToCardViewModel(event: EventCard): CardViewModel {
  const portrait = getEventPortrait(event);

  return {
    characterName: event.characterName ?? "청령차사",
    portraitAlt: portrait.alt,
    portraitSrc: portrait.src,
    leftPreviewText: event.choices[1].label,
    rightPreviewText: event.choices[0].label,
    leftImpactPreview: buildChoiceImpactPreview(event.choices[1]),
    rightImpactPreview: buildChoiceImpactPreview(event.choices[0]),
  };
}
