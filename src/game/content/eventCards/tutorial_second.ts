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
          "이번 실패를 잘 봐라.\n\n스펙만 부족했는지, 멘탈이 무너졌는지, 돈 때문에 기회를 놓쳤는지.",
      }),
      makeSecondLifeChoice({
        id: "ask-what-went-wrong",
        label: "뭘 잘못한 거지?",
        resultText:
          "이번 실패를 잘 봐라.\n\n스펙만 부족했는지, 멘탈이 무너졌는지, 돈 때문에 기회를 놓쳤는지.",
      }),
    ],
  },
  {
    id: "second-life-failure-review",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "이번 실패를 잘 봐라.\n\n스펙만 부족했는지, 멘탈이 무너졌는지, 돈 때문에 기회를 놓쳤는지.",
    choices: [
      makeSecondLifeChoice({
        id: "not-one-thing",
        label: "하나만 보면 안 되네",
        resultText:
          "앞으로 네가 관리할 것은 네 가지다.\n\n스펙, 멘탈, 관계, 돈.",
      }),
      makeSecondLifeChoice({
        id: "everything-connected",
        label: "전부 연결됐네",
        resultText:
          "앞으로 네가 관리할 것은 네 가지다.\n\n스펙, 멘탈, 관계, 돈.",
      }),
    ],
  },
  {
    id: "second-life-four-metrics",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "앞으로 네가 관리할 것은 네 가지다.\n\n스펙, 멘탈, 관계, 돈.",
    choices: [
      makeSecondLifeChoice({
        id: "ask-each-meaning",
        label: "각각 뭐야?",
        resultText:
          "스펙은 합격 가능성,\n멘탈은 불합격과 압박을 버티는 힘,\n관계는 기회를 이어주는 신뢰,\n돈은 준비를 계속할 수 있는 기반이다.",
      }),
      makeSecondLifeChoice({
        id: "watch-these-now",
        label: "이걸 보면 돼?",
        resultText:
          "스펙은 합격 가능성,\n멘탈은 불합격과 압박을 버티는 힘,\n관계는 기회를 이어주는 신뢰,\n돈은 준비를 계속할 수 있는 기반이다.",
      }),
    ],
  },
  {
    id: "second-life-metric-meanings",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "스펙은 합격 가능성,\n멘탈은 불합격과 압박을 버티는 힘,\n관계는 기회를 이어주는 신뢰,\n돈은 준비를 계속할 수 있는 기반이다.",
    choices: [
      makeSecondLifeChoice({
        id: "none-disposable",
        label: "다 중요하네",
        resultText:
          "하지만 수치가 높다고 늘 좋은 것은 아니다.\n\n수치는 네가 무엇을 얼마나 중요하게 여기고 있는지를 보여준다. 한쪽이 지나치게 커지면, 삶은 그쪽으로 끌려간다.",
      }),
      makeSecondLifeChoice({
        id: "balance-important",
        label: "균형이 중요하네",
        resultText:
          "하지만 수치가 높다고 늘 좋은 것은 아니다.\n\n수치는 네가 무엇을 얼마나 중요하게 여기고 있는지를 보여준다. 한쪽이 지나치게 커지면, 삶은 그쪽으로 끌려간다.",
      }),
    ],
  },
  {
    id: "second-life-too-high",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "하지만 수치가 높다고 늘 좋은 것은 아니다.\n\n수치는 네가 무엇을 얼마나 중요하게 여기고 있는지를 보여준다. 한쪽이 지나치게 커지면, 삶은 그쪽으로 끌려간다.",
    choices: [
      makeSecondLifeChoice({
        id: "too-much-money-too",
        label: "많아도 위험해?",
        resultText:
          "그래. 선택은 늘 무언가를 올리고, 무언가를 깎는다.\n\n완벽한 선택은 없다. 다만 지금 가장 필요한 선택은 있다.",
      }),
      makeSecondLifeChoice({
        id: "numbers-are-values",
        label: "수치는 우선순위네",
        resultText:
          "그래. 선택은 늘 무언가를 올리고, 무언가를 깎는다.\n\n완벽한 선택은 없다. 다만 지금 가장 필요한 선택은 있다.",
      }),
    ],
  },
  {
    id: "second-life-oath",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "그래. 선택은 늘 무언가를 올리고, 무언가를 깎는다.\n\n완벽한 선택은 없다. 다만 지금 가장 필요한 선택은 있다.",
    choices: [
      makeSecondLifeChoice({
        id: "try-again",
        label: "다시 해볼게.",
        resultText: "좋다.\n\n이번 생은 네가 무엇을 붙잡는지 보게 될 것이다.",
      }),
      makeSecondLifeChoice({
        id: "carry-to-end",
        label: "끝까지 가볼게",
        resultText: "좋다.\n\n이번 생은 네가 무엇을 붙잡는지 보게 될 것이다.",
      }),
    ],
  },
];
