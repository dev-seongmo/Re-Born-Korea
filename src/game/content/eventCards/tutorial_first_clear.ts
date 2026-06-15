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
      "축하한다. 기억의 조각 하나가 네 손에 돌아왔구나.\n\n첫 면접을 넘은 대가로 겨우 한 조각이 모습을 드러낸 거다. 헛되이 버틴 시간은 아니었다는 뜻이지.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-what-memory-shard-is",
        label: "기억의 조각?",
        resultText:
          "네가 잃어버린 삶의 파편이다. 감정도, 관계도, 네가 왜 여기까지 끌려왔는지도 그 안에 잠들어 있다.",
      }),
      makeFirstClearTutorialChoice({
        id: "say-it-is-real",
        label: "돌아온 거군",
        resultText:
          "그래. 아직 미약하지만 분명한 되찾음이다. 네 영혼이 완전히 잠들지는 않았다는 증거이기도 하고.",
      }),
    ],
  },
  {
    id: "first-clear-memory-shard-system",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "이제 기억조각 시스템이 해금되었다.\n\n앞으로 반복되는 삶들 속에서 조건이 맞을 때마다 이런 파편이 모습을 드러낼 거다.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-where-they-appear",
        label: "어디서 나타나지?",
        resultText:
          "평범한 하루의 틈에서다. 다음 영혼들을 붙들고 버티다 보면, 익숙한 장면이 어긋나며 조각이 떠오를 거다.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-if-random",
        label: "아무 때나 나와?",
        resultText:
          "아무렇게나 튀어나오진 않는다. 네가 버텨낸 삶과 선택의 결이 맞아떨어질 때만 문이 열린다.",
      }),
    ],
  },
  {
    id: "first-clear-memory-shard-meaning",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "기억조각은 단순한 수집품이 아니다.\n\n그 안에는 네가 잃은 관계, 숨겨둔 진심, 그리고 아직 끝나지 않은 이유가 눌어붙어 있다.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-why-collect-them",
        label: "왜 모아야 해?",
        resultText:
          "조각이 흩어진 채로는 너도 흩어진 채다. 이어 붙여야만 네 삶의 모양도, 이 반복의 이유도 제대로 드러난다.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-whose-memories",
        label: "내 기억만 있는 건가?",
        resultText:
          "결국은 네 기억이다. 하지만 네 삶에 얽힌 타인의 그림자까지 함께 묻어 있을 테니, 달갑지만은 않을 수도 있지.",
      }),
    ],
  },
  {
    id: "first-clear-hidden-self-trust",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "그리고 하나 더.\n\n네가 화면에서 보는 수치 말고도, 드러나지 않는 자기신뢰가 있다. 그건 네 영혼이 스스로를 얼마나 붙들고 있는가를 뜻한다.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "ask-about-self-trust",
        label: "자기신뢰가 중요해?",
        resultText:
          "중요하지. 흔들려도 다시 일어서는 힘, 무너진 선택 앞에서도 스스로를 놓지 않는 힘이니까. 보이지 않아도 분명히 다음 삶들을 바꾼다.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-how-it-changes",
        label: "어떻게 달라져?",
        resultText:
          "남과 너를 함부로 비교하고 스스로를 깎아내리면 무너진다. 반대로 네 선택을 네 힘으로 받아내면 조금씩 단단해지지.",
      }),
    ],
  },
  {
    id: "first-clear-true-freedom",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "취업은 끝이 아니다. 문턱 하나를 넘었을 뿐이지.\n\n영혼의 진정한 해방을 원한다면, 다음 삶들 속에 숨은 기억조각을 모아라. 그때야 비로소 네가 왜 여기 있는지 끝까지 알게 될 거다.",
    choices: [
      makeFirstClearTutorialChoice({
        id: "accept-new-purpose",
        label: "기억을 모으겠다",
        resultText:
          "좋다. 그럼 다시 걸어라. 이번부터는 버티기만 하는 삶이 아니라, 되찾으러 가는 삶이 될 테니.",
      }),
      makeFirstClearTutorialChoice({
        id: "ask-to-begin-again",
        label: "다시 시작하자",
        resultText:
          "그래. 다음 삶으로 가라. 하지만 이번엔 눈앞의 합격만 쫓지 말고, 네가 흘린 조각들이 어디서 울고 있는지도 함께 살펴라.",
      }),
    ],
  },
];
