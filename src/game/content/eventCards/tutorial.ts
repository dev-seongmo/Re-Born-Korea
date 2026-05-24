import type { EventCard } from "../../core/gameTypes";

function makeTutorialChoice(params: {
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

export const tutorialEvents: EventCard[] = [
  {
    id: "tutorial-afterlife-question",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "지금 바로 저승으로 가고 싶으냐?",
    choices: [
      makeTutorialChoice({
        id: "ask-what",
        label: "뭐라고?",
        resultText: "농담이다. 아직 네 차례는 아니다.\n\n대신, 나를 좀 도와야겠다.",
      }),
      makeTutorialChoice({
        id: "say-no",
        label: "아니?",
        resultText: "농담이다. 아직 네 차례는 아니다.\n\n대신, 나를 좀 도와야겠다.",
      }),
    ],
  },
  {
    id: "tutorial-chasa-request",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "농담이다. 아직 네 차례는 아니다.\n\n대신, 나를 좀 도와야겠다.",
    choices: [
      makeTutorialChoice({
        id: "ask-what-help",
        label: "뭘요?",
        resultText:
          "어린 영혼들의 한을 풀어주는 일이다.\n\n그들이 지원한 회사에 합격하도록 이끌어라.",
      }),
      makeTutorialChoice({
        id: "ask-if-refuse",
        label: "싫다면요?",
        resultText:
          "어린 영혼들의 한을 풀어주는 일이다.\n\n그들이 지원한 회사에 합격하도록 이끌어라.",
      }),
    ],
  },
  {
    id: "tutorial-employment-grudge",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "어린 영혼들의 한을 풀어주는 일이다.\n\n그들이 지원한 회사에 합격하도록 이끌어라.",
    choices: [
      makeTutorialChoice({
        id: "question-employment-grudge",
        label: "취업이 한이라고?",
        resultText:
          "현실에서 맺힌 한은 쉽게 사라지지 않는다.\n\n선택은 영혼의 상태를 바꾼다.",
      }),
      makeTutorialChoice({
        id: "call-it-realistic",
        label: "현실적이네",
        resultText:
          "현실에서 맺힌 한은 쉽게 사라지지 않는다.\n\n선택은 영혼의 상태를 바꾼다.",
      }),
    ],
  },
  {
    id: "tutorial-choice-state",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "현실에서 맺힌 한은 쉽게 사라지지 않는다.\n\n선택은 영혼의 상태를 바꾼다.",
    choices: [
      makeTutorialChoice({
        id: "ask-about-state",
        label: "상태?",
        resultText:
          "자신감, 체력, 관계, 준비도.\n\n네 수치가 절반 이상이면 면접을 버틸 수 있다.",
      }),
      makeTutorialChoice({
        id: "say-understood",
        label: "알겠어",
        resultText:
          "자신감, 체력, 관계, 준비도.\n\n네 수치가 절반 이상이면 면접을 버틸 수 있다.",
      }),
    ],
  },
  {
    id: "tutorial-stat-threshold",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text:
      "자신감, 체력, 관계, 준비도.\n\n네 수치가 절반 이상이면 면접을 버틸 수 있다.",
    choices: [
      makeTutorialChoice({
        id: "ask-endure",
        label: "버틴다고?",
        resultText:
          "기한은 30일.\n\n무너뜨리지 말고, 무사히 면접장까지 데려가라.",
      }),
      makeTutorialChoice({
        id: "promise-pass",
        label: "합격시켜볼게",
        resultText:
          "기한은 30일.\n\n무너뜨리지 말고, 무사히 면접장까지 데려가라.",
      }),
    ],
  },
  {
    id: "tutorial-thirty-days",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "기한은 30일.\n\n무너뜨리지 말고, 무사히 면접장까지 데려가라.",
    choices: [
      makeTutorialChoice({
        id: "ask-who-are-you",
        label: "넌 누군데?",
        resultText: "청령차사.\n\n한을 품은 영혼을 건너편으로 보내는 자다.",
      }),
      makeTutorialChoice({
        id: "leave-it-to-me",
        label: "맡겨만 둬",
        resultText: "청령차사.\n\n한을 품은 영혼을 건너편으로 보내는 자다.",
      }),
    ],
  },
  {
    id: "tutorial-chasa-name",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "청령차사.\n\n한을 품은 영혼을 건너편으로 보내는 자다.",
    choices: [
      makeTutorialChoice({
        id: "ask-beyond",
        label: "건너편?",
        resultText: "설명은 끝났다.\n\n첫 번째 영혼이 왔다.",
      }),
      makeTutorialChoice({
        id: "say-cool",
        label: "멋있네",
        resultText: "설명은 끝났다.\n\n첫 번째 영혼이 왔다.",
      }),
    ],
  },
  {
    id: "tutorial-first-soul-arrives",
    characterName: "청령차사",
    category: "tutorial",
    phase: "early20s",
    text: "설명은 끝났다.\n\n첫 번째 영혼이 왔다.",
    choices: [
      makeTutorialChoice({
        id: "already",
        label: "벌써?",
        resultText:
          "푸른 안개가 걷히자, 불안한 얼굴의 영혼 하나가 눈앞에 섰다.",
      }),
      makeTutorialChoice({
        id: "ready",
        label: "좋아",
        resultText:
          "푸른 안개가 걷히자, 불안한 얼굴의 영혼 하나가 눈앞에 섰다.",
      }),
    ],
  },
  {
    id: "tutorial-fog-clears",
    characterName: "첫 번째 영혼",
    category: "tutorial",
    phase: "early20s",
    text: "푸른 안개가 걷히자, 불안한 얼굴의 영혼 하나가 눈앞에 섰다.",
    choices: [
      makeTutorialChoice({
        id: "approach-first-soul",
        label: "다가간다",
        resultText: "첫 번째 선택이 시작된다.",
      }),
      makeTutorialChoice({
        id: "steady-first-soul",
        label: "시작하자",
        resultText: "첫 번째 선택이 시작된다.",
      }),
    ],
  },
];
