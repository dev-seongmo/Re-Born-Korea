import type { EventCard } from "../core/gameTypes";
import { buildChoiceImpactPreview } from "../systems/balanceSystem";
import type { CardViewModel } from "../viewModels/cardViewModel";

const categoryLabels: Record<EventCard["category"], string> = {
  tutorial: "Tutorial",
  interview: "Interview",
  comparison: "Comparison",
  family: "Family",
  money: "Money",
  spec: "Spec",
  mental: "Mental",
  friendship: "Friendship",
  recovery: "Recovery",
};

export function mapEventToCardViewModel(event: EventCard): CardViewModel {
  return {
    categoryLabel: categoryLabels[event.category],
    characterName: event.characterName ?? "청령차사",
    bodyText: event.text,
    leftPreviewText: event.choices[1].label,
    rightPreviewText: event.choices[0].label,
    leftImpactPreview: buildChoiceImpactPreview(event.choices[1]),
    rightImpactPreview: buildChoiceImpactPreview(event.choices[0]),
  };
}
