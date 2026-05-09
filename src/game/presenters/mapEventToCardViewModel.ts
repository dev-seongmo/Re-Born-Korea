import type { EventCard } from "../core/gameTypes";
import { buildChoiceImpactPreview } from "../systems/balanceSystem";
import type { CardTheme, CardViewModel } from "../viewModels/cardViewModel";

const categoryLabels: Record<EventCard["category"], string> = {
  comparison: "Comparison",
  family: "Family",
  money: "Money",
  spec: "Spec",
  mental: "Mental",
  friendship: "Friendship",
  recovery: "Recovery",
};

const categoryThemes: Record<EventCard["category"], CardTheme> = {
  comparison: "comparison",
  family: "stress",
  money: "stress",
  spec: "neutral",
  mental: "stress",
  friendship: "warm",
  recovery: "warm",
};

const portraitAssets: Partial<Record<string, string>> = {
  "friend-major-company": "friend-major-company",
};

export function mapEventToCardViewModel(event: EventCard): CardViewModel {
  return {
    id: event.id,
    categoryLabel: categoryLabels[event.category],
    bodyText: event.text,
    portraitLabel: "2D Character Asset",
    portraitAssetId: portraitAssets[event.id],
    leftPreviewText: event.choices[1].label,
    rightPreviewText: event.choices[0].label,
    leftImpactPreview: buildChoiceImpactPreview(event.choices[1]),
    rightImpactPreview: buildChoiceImpactPreview(event.choices[0]),
    theme: categoryThemes[event.category],
  };
}
