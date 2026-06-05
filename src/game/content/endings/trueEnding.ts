export type StoryEndingDefinition = {
  id: "true-ending";
  eyebrow: string;
  title: string;
  paragraphs: string[];
  confirmLabel: string;
};

export const trueEndingDefinition: StoryEndingDefinition = {
  id: "true-ending",
  eyebrow: "True Ending",
  title: "온전한 영혼",
  paragraphs: ["기억의 조각이 한곳으로 모여 온전한 영혼이 되었다."],
  confirmLabel: "엔딩 마무리",
};
