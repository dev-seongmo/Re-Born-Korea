import type { EventCard } from "../../core/gameTypes";

function makeSecondLifeChoice(params: {
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

export const secondLifeTutorialEvents: EventCard[] = [
  {
    id: "second-life-wakeup",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "잘 다녀왔나?\n\n표정을 보니 첫 면접은 쉽지 않았던 모양이군.",
    choices: [
      makeSecondLifeChoice({
        id: "admit-employment-is-hard",
        label: "정말 어렵네",
        resultText:
          "이번 실패를 잘 봐라.\n\n스펙이 부족했는지, 멘탈이 무너졌는지, 혹은 무언가에 너무 집착했는지.",
      }),
      makeSecondLifeChoice({
        id: "ask-what-went-wrong",
        label: "뭘 잘못한 거지?",
        resultText:
          "이번 실패를 잘 봐라.\n\n스펙이 부족했는지, 멘탈이 무너졌는지, 혹은 무언가에 너무 집착했는지.",
      }),
    ],
  },
  {
    id: "second-life-failure-review",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "이번 실패를 잘 봐라.\n\n스펙이 부족했는지, 멘탈이 무너졌는지, 혹은 무언가에 너무 집착했는지.",
    choices: [
      makeSecondLifeChoice({
        id: "not-one-thing",
        label: "하나만 보면 안 되네",
        resultText:
          "바닥나도 안 되지만, 넘쳐도 안 된다.",
      }),
      makeSecondLifeChoice({
        id: "everything-connected",
        label: "전부 연결됐네",
        resultText:
          "바닥나도 안 되지만, 넘쳐도 안 된다.",
      }),
    ],
  },
  {
    id: "second-life-four-metrics",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "바닥나도 안 되지만, 넘쳐도 안 된다.",
    choices: [
      makeSecondLifeChoice({
        id: "ask-each-meaning",
        label: "아...",
        resultText:
          "각 수치는 네가 가진 양을 보여주는 게 아니다.\n\n네가 무엇에 얼마나 매달리고 있는지를 보여준다.",
      }),
      makeSecondLifeChoice({
        id: "watch-these-now",
        label: "아...",
        resultText:
          "각 수치는 네가 가진 양을 보여주는 게 아니다.\n\n네가 무엇에 얼마나 매달리고 있는지를 보여준다.",
      }),
    ],
  },
  {
    id: "second-life-metric-meanings",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "각 수치는 네가 가진 양을 보여주는 게 아니다.\n\n네가 무엇에 얼마나 매달리고 있는지를 보여준다.",
    choices: [
      makeSecondLifeChoice({
        id: "none-disposable",
        label: "아...",
        resultText:
          "취업을 하려면 여러 가지를 붙잡아야 한다.\n\n하지만 하나만 너무 세게 붙잡으면, 다른 것들이 손에서 빠져나간다.",
      }),
      makeSecondLifeChoice({
        id: "balance-important",
        label: "어렵네...",
        resultText:
          "취업을 하려면 여러 가지를 붙잡아야 한다.\n\n하지만 하나만 너무 세게 붙잡으면, 다른 것들이 손에서 빠져나간다.",
      }),
    ],
  },
  
  {
    id: "second-life-oath",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "취업을 하려면 여러 가지를 붙잡아야 한다.\n\n하지만 하나만 너무 세게 붙잡으면, 다른 것들이 손에서 빠져나간다.",
    choices: [
      makeSecondLifeChoice({
        id: "try-again",
        label: "다시 해볼게.",
        resultText: "좋다.\n\n완벽한 선택은 없다. 다만 지금 가장 필요한 선택은 있다.\n\n이번 생은 네가 무엇을 붙잡는지 보게 될 것이다.",
      }),
      makeSecondLifeChoice({
        id: "carry-to-end",
        label: "끝까지 가볼게",
        resultText: "좋다.\n\n완벽한 선택은 없다. 다만 지금 가장 필요한 선택은 있다.\n\n이번 생은 네가 무엇을 붙잡는지 보게 될 것이다.",
      }),
    ],
  },
];
