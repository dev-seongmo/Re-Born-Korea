export type TrueEndingCreditsDefinition = {
  eyebrow: string;
  title: string;
  lines: string[];
  outro: string;
  confirmLabel: string;
};

export const trueEndingCredits: TrueEndingCreditsDefinition = {
  eyebrow: "Credits",
  title: "끝내 살아남은 영혼",
  lines: [
    "Re:Born Korea",
    "A soul who chose to live again",
    "Cheongryeong Chasa, still watching",
  ],
  outro: "이제 다시, 너의 삶으로 돌아가자.",
  confirmLabel: "엔딩 닫기",
};
