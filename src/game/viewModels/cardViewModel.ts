import type { ChoiceImpactPreview } from "../systems/balanceSystem";

export type CardViewModel = {
  categoryLabel: string;
  characterName: string | null;
  bodyText: string;
  portraitAlt: string;
  portraitSrc: string;
  leftPreviewText: string;
  rightPreviewText: string;
  leftImpactPreview: ChoiceImpactPreview;
  rightImpactPreview: ChoiceImpactPreview;
};
