import type { EventCard } from "../../core/gameTypes";

function makeFirstClearTutorialChoice(params: {
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

export const firstClearTutorialEvents: EventCard[] = [
  {
    id: "first-clear-memory-shard-congrats",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "축하한다.\n\n첫 면접을 넘어서며 기억의 조각 하나가 돌아왔다.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-what-memory-shard-is",
        label: "기억의 조각?",
        resultText:
          "네가 잃어버린 삶의 파편이다.\n\n이 반복의 이유도 그 안에 잠들어 있다.",
      }),
      makeFirstClearTutorialChoice({
        id: "say-it-is-real",
        label: "되찾은 거구나",
        resultText:
          "그래.\n\n아직 작지만, 분명히 네 것이다.",
      }),
    ],
  },
  {
    id: "first-clear-memory-shard-system",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "이제부터 삶의 틈에서 기억조각이 나타난다.\n\n평범한 하루가 낯설게 흔들리면, 그곳을 잘 봐라.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-where-they-appear",
        label: "어디서 찾아?",
        resultText:
          "정해진 장소만 있는 건 아니다.\n\n다음 삶을 버티다 보면, 어떤 장면이 너를 부를 거다.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-if-random",
        label: "아무 때나 나와?",
        resultText:
          "아무렇게나 나오진 않는다.\n\n네가 지나온 선택과 맞닿을 때 문이 열린다.",
      }),
    ],
  },
  {
    id: "first-clear-memory-shard-meaning",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "기억조각은 단순한 수집품이 아니다.\n\n네가 잃은 관계와 진심이 담겨 있다.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-why-collect-them",
        label: "왜 모아야 해?",
        resultText:
          "조각을 이어 붙이면 네 삶의 모양이 보인다.\n\n그리고 마지막 문도 열린다.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-whose-memories",
        label: "내 기억이야?",
        resultText:
          "그래.\n\n다만 네 삶에 얽힌 사람들의 흔적도 함께 남아 있다.",
      }),
    ],
  },
  {
    id: "first-clear-true-freedom",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "취업은 끝이 아니다.\n\n다음 삶에서는 합격뿐 아니라 기억조각도 찾아라.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "accept-new-purpose",
        label: "기억을 찾겠다",
        resultText:
          "좋다.\n\n이번부터는 버티는 삶이 아니라, 되찾는 삶이다.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-to-begin-again",
        label: "다시 가자",
        resultText:
          "그래.\n\n다음 삶에서 네가 흘린 조각을 찾아라.",
      }),
    ],
  },
];
