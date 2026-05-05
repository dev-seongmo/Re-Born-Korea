import type { EventCard } from "../core/gameTypes";
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

export function mapEventToCardViewModel(event: EventCard): CardViewModel {
  return {
    id: event.id,
    categoryLabel: categoryLabels[event.category],
    bodyText: event.text,
    portraitLabel: "2D Character Asset",
    leftPreviewText: event.choices[1].label,
    rightPreviewText: event.choices[0].label,
    theme: categoryThemes[event.category],
  };
}
