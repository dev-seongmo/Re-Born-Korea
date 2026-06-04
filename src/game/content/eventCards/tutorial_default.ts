import type { EventCard } from "../../core/gameTypes";

function makeDefaultTutorialChoice(params: {
  id: string;
  label: string;
  resultText: string;
}): EventCard["choices"][number] {
  return {
    id: params.id,
    label: params.label,
    immediate: {},
    selfTrustDelta: 0,
    primaryStat: "mental",
    modifier: 0,
    results: {
      bad: { text: params.resultText },
      mixed: { text: params.resultText },
      good: { text: params.resultText },
    },
  };
}

export const defaultLoopTutorialEvents: EventCard[] = [
  {
    id: "default-loop-next-soul",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "청령차사가 없다.\n\n다음 영혼으로 가자.",
    choices: [
      makeDefaultTutorialChoice({
        id: "move-to-next-soul",
        label: "다음 영혼으로 간다.",
        resultText: "이번 삶도 다시 시작된다.",
      }),
      makeDefaultTutorialChoice({
        id: "start-without-hesitation",
        label: "주저하지 않고 시작한다.",
        resultText: "이번 삶도 다시 시작된다.",
      }),
    ],
  },
];
