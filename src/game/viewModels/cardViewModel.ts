import type { ChoiceImpactPreview } from "../systems/balanceSystem";

export type CardViewModel = {
  categoryLabel: string;
  bodyText: string;
  leftPreviewText: string;
  rightPreviewText: string;
  leftImpactPreview: ChoiceImpactPreview;
  rightImpactPreview: ChoiceImpactPreview;
};
