export type TrueEndingStoryCard = {
  id: string;
  speaker: string;
  text: string;
  eyebrow: string;
  leftLabel: string;
  rightLabel: string;
};

export const trueEndingStoryCards: TrueEndingStoryCard[] = [
  {
    id: "true-ending-chasa-truth",
    speaker: "청령차사",
    eyebrow: "진실",
    text: "너가 여기 오게 된 이유를 알려주지.",
    leftLabel: "기억을 본다",
    rightLabel: "계속 듣는다",
  },
  {
    id: "true-ending-prelude-prep",
    speaker: "기억",
    eyebrow: "회상",
    text: "취업 준비는 오래 이어졌다. 서류를 고치고 또 고치며, 오늘만 버티자고 스스로를 달랬다.",
    leftLabel: "되짚어 본다",
    rightLabel: "다음 기억",
  },
  {
    id: "true-ending-comparison-scroll",
    speaker: "기억",
    eyebrow: "비교",
    text: "휴대폰 화면 속 타인의 합격 소식은 점점 더 선명해졌고, 네 안의 자기 신뢰는 그만큼 흐려졌다.",
    leftLabel: "외면하지 않는다",
    rightLabel: "계속 본다",
  },
  {
    id: "true-ending-self-trust-collapse",
    speaker: "기억",
    eyebrow: "붕괴",
    text: "탈락이 반복될수록 실패는 사건이 아니라 네 정체성처럼 느껴졌다. 끝내 너는 자신을 믿는 힘을 잃었다.",
    leftLabel: "무너지던 밤",
    rightLabel: "더 깊이 본다",
  },
  {
    id: "true-ending-edge-of-death",
    speaker: "청령차사",
    eyebrow: "경계",
    text: "네가 죽고 싶었던 건 아니야. 더는 무엇을 선택해야 할지 모르겠어서, 모든 선택을 멈추려 했을 뿐이지.",
    leftLabel: "그날을 마주한다",
    rightLabel: "끝까지 듣는다",
  },
  {
    id: "true-ending-chasa-farewell",
    speaker: "청령차사",
    eyebrow: "작별",
    text: "앞으로도 너에게 필요한 선택을 해가기를. 이번엔 네 삶을 네 손으로 붙잡아라.",
    leftLabel: "크레딧으로",
    rightLabel: "마지막까지",
  },
];
