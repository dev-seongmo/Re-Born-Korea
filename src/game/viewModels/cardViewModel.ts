export type CardTheme = "neutral" | "warm" | "stress" | "comparison";

export type CardViewModel = {
  id: string;
  categoryLabel: string;
  bodyText: string;
  portraitLabel: string;
  portraitAssetId?: string;
  backgroundAssetId?: string;
  leftPreviewText: string;
  rightPreviewText: string;
  theme: CardTheme;
};
