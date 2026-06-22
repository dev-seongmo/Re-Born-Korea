import type { EventCard } from "../../core/gameTypes";

export const specEvents: EventCard[] = [
  {
    id: "night-course-ad",
    category: "spec",
    phase: "early20s",
    text: "수강 광고가 뜬다. '지금 시작하면 남들보다 앞설 수 있습니다.'",
    choices: [
      {
        id: "wait-and-check",
        label: "먼저 따져본다",
        immediate: {},
        selfTrustDelta: 3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["selfTrust"],
        results: {
          bad: { text: "당장 시작하진 않았지만 그 멈춤은 도망만은 아니었다." },
          mixed: { text: "필요한 것과 불안한 것을 구분하려는 시도가 생겼다." },
          good: {
            text: "모든 기회가 네 것이어야 하는 건 아니라는 걸 배웠다.",
          },
        },
      },
      {
        id: "join-course",
        label: "일단 등록한다",
        immediate: { money: -3, spec: 2 },
        selfTrustDelta: -1,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "강의는 시작했지만 네 체력은 이미 뒤처지고 있었다.",
          },
          mixed: { text: "뭔가 하고 있다는 안도는 있었지만 여유는 더 사라졌다." },
          good: {
            text: "배우는 건 분명 도움이 됐지만 출발점은 여전히 조급했다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "portfolio-weekend",
    category: "spec",
    phase: "mid20s",
    text: "주말 내내 포트폴리오를 다듬으면 완성도는 올라갈 것 같다.",
    choices: [
      {
        id: "split-work-rest",
        label: "반나절만 한다",
        immediate: { spec: 1 },
        selfTrustDelta: 3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "selfTrust"],
        results: {
          bad: { text: "엄청난 진전은 없었지만 너는 다음 주를 남겨뒀다." },
          mixed: { text: "속도는 느렸지만 균형은 조금 더 나아졌다." },
          good: {
            text: "덜 무너지는 방식이 결국 더 오래 가는 방식이 되었다.",
            delta: { spec: 1 },
          },
        },
      },
      {
        id: "grind-weekend",
        label: "주말을 갈아넣는다",
        immediate: { spec: 3, mental: -1 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "분량은 늘었지만 너는 점점 작업물 밖에서 사라졌다.",
          },
          mixed: { text: "성과는 있었고, 회복은 미뤄졌다." },
          good: {
            text: "완성도는 높아졌지만 다음 주의 체력까지 끌어다 썼다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "ai-cover-letter",
    category: "spec",
    phase: "mid20s",
    text: "AI가 자소서를 매끈하게 다듬어줬다. 그런데 너무 그럴듯해서 내 말 같지가 않다.",
    choices: [
      {
        id: "rewrite-in-my-voice",
        label: "내 말로 고친다",
        immediate: { spec: 1 },
        selfTrustDelta: 4,
        primaryStat: "spec",
        modifier: 0,
        memoryTags: ["honesty"],
        tendencyTags: ["selfTrust", "spec"],
        results: {
          bad: { text: "더 오래 걸렸지만, 적어도 문장 속 화자는 너였다." },
          mixed: {
            text: "조금 덜 번듯해도 훨씬 덜 비어 있었다.",
            selfTrustDelta: 1,
          },
          good: {
            text: "네 언어로 쓴 문장이 오히려 더 오래 남을 무게를 얻었다.",
            delta: { spec: 1 },
          },
        },
      },
      {
        id: "submit-fast",
        label: "그대로 낸다",
        immediate: { spec: 2 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec"],
        results: {
          bad: {
            text: "문장은 좋아졌지만 네 목소리는 더 멀어졌다.",
          },
          mixed: { text: "효율은 챙겼지만, 제출 버튼이 조금 낯설었다." },
          good: {
            text: "분명 도움이 됐지만 결과보다도 찜찜함이 함께 남았다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "study-group-comparison",
    category: "spec",
    phase: "late20s",
    text: "스터디에서 다들 진도가 빠르다. 뒤처지는 것 같아 초조해진다.",
    choices: [
      {
        id: "ask-questions-openly",
        label: "솔직히 묻는다",
        immediate: { spec: 1, reputation: 1 },
        selfTrustDelta: 4,
        primaryStat: "spec",
        modifier: 0,
        memoryTags: ["asked_rule"],
        tendencyTags: ["selfTrust", "spec"],
        results: {
          bad: { text: "민망했지만 배우는 속도는 오히려 빨라졌다." },
          mixed: { text: "부끄러움보다 이해가 남는 시간이 되었다." },
          good: {
            text: "질문할 수 있는 용기가 성장보다 먼저 너를 살렸다.",
            delta: { spec: 2 },
          },
        },
      },
      {
        id: "fake-confidence",
        label: "아는 척한다",
        immediate: { reputation: 1 },
        selfTrustDelta: -3,
        primaryStat: "reputation",
        modifier: 0,
        tendencyTags: ["comparison", "reputation"],
        results: {
          bad: {
            text: "체면은 남았지만 이해는 더 뒤로 밀렸다.",
            delta: { spec: -1 },
          },
          mixed: { text: "혼자 따라잡으려 했지만 마음은 점점 더 쫓겼다." },
          good: {
            text: "어찌어찌 넘겼지만, 그 하루는 너를 더 긴장하게 만들었다.",
          },
        },
      },
    ],
  },
];
