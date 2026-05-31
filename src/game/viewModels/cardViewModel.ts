import type { ChoiceImpactPreview } from "../systems/balanceSystem";

export type CardViewModel = {
  characterName: string | null;
  portraitAlt: string;
  portraitSrc: string;
  leftPreviewText: string;
  rightPreviewText: string;
  leftImpactPreview: ChoiceImpactPreview;
  rightImpactPreview: ChoiceImpactPreview;
};
