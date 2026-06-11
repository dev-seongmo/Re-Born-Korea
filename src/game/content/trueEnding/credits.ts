export type TrueEndingCreditsDefinition = {
  eyebrow: string;
  title: string;
  lines: string[];
  outro: string;
  confirmLabel: string;
};

export const trueEndingCredits: TrueEndingCreditsDefinition = {
  eyebrow: "Credits",
  title: "나를 구한 사람",
  lines: [
    "Re:Born Korea",
    "A person who asked to be held",
    "Cheongryeong Chasa, still watching",
  ],
  outro: "다시 일어날 때는 누군가의 손을 잡아도 된다.",
  confirmLabel: "엔딩 닫기",
};
