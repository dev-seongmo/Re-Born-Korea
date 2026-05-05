import type { EventCard } from "../../core/gameTypes";

export const familyEvents: EventCard[] = [
  {
    id: "parents-question",
    category: "family",
    phase: "early20s",
    text: "부모님이 묻는다. '언제까지 준비할 거니?'",
    choices: [
      {
        id: "speak-honestly",
        label: "솔직하게 지금 상태를 말한다.",
        immediate: { reputation: -2, mental: 2 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["honesty"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "대화는 서툴렀지만, 적어도 너는 숨지 않았다." },
          mixed: {
            text: "쉽지 않았지만 말한 뒤 숨이 조금은 쉬어졌다.",
            selfTrustDelta: 1,
          },
          good: {
            text: "완벽히 이해받진 못했어도, 너의 언어를 지켜냈다.",
            delta: { mental: 2 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "pretend-fine",
        label: "괜찮은 척하며 숨긴다.",
        immediate: { reputation: 2, mental: -3 },
        selfTrustDelta: -4,
        primaryStat: "reputation",
        modifier: 1,
        tendencyTags: ["reputation", "comparison"],
        results: {
          bad: {
            text: "대화는 지나갔지만 속은 더 조용히 무너졌다.",
            delta: { mental: -2 },
          },
          mixed: { text: "겉은 잠잠했지만 네 마음은 더 닫혔다." },
          good: {
            text: "당장은 체면을 지켰지만, 그 비용은 네 안에 남았다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
  {
    id: "relative-comparison-dinner",
    category: "family",
    phase: "early20s",
    text: "가족 모임에서 친척이 사촌의 취업 소식을 꺼내며 네 근황도 묻는다.",
    choices: [
      {
        id: "set-boundary-softly",
        label: "웃으며 넘기되, 비교 질문은 불편하다고 말한다.",
        immediate: { reputation: -1, mental: 2 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["honesty"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "공기가 잠깐 어색해졌지만, 네 자리는 조금 더 또렷해졌다." },
          mixed: {
            text: "모든 사람이 이해하진 않아도 너 자신은 덜 흐려졌다.",
          },
          good: {
            text: "작은 경계선 하나가 너를 꽤 많이 지켜줬다.",
            delta: { mental: 1, reputation: 1 },
          },
        },
      },
      {
        id: "laugh-it-off",
        label: "괜히 분위기 깰까 봐 같이 웃고 넘긴다.",
        immediate: { reputation: 2, mental: -2 },
        selfTrustDelta: -3,
        primaryStat: "reputation",
        modifier: 1,
        tendencyTags: ["reputation", "comparison"],
        results: {
          bad: {
            text: "집에 돌아와서야 그 웃음이 다 네 몫이었음을 알았다.",
            delta: { mental: -2 },
          },
          mixed: { text: "분위기는 지켰지만 네 안쪽은 조금 작아졌다." },
          good: {
            text: "당장은 무난했지만, 답은 오래 마음에 남았다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
  {
    id: "family-support-offer",
    category: "family",
    phase: "mid20s",
    text: "부모님이 학원비를 보태주겠다고 한다. 고맙지만 다시 기대에 묶일까 마음이 복잡하다.",
    choices: [
      {
        id: "accept-with-honesty",
        label: "도움을 받되, 압박도 같이 느낀다고 솔직히 말한다.",
        immediate: { money: 3, mental: 1 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["honesty"],
        tendencyTags: ["selfTrust", "money"],
        results: {
          bad: { text: "어색했지만 도움과 감정을 함께 다루려 한 건 의미 있었다." },
          mixed: {
            text: "부담은 남았지만 네 입장도 같이 놓였다.",
            delta: { money: 1 },
          },
          good: {
            text: "도움이 빚만은 아니라는 감각이 조금 생겼다.",
            delta: { money: 2, mental: 1 },
          },
        },
      },
      {
        id: "accept-silently",
        label: "그냥 받는다. 불편한 감정은 혼자 삼킨다.",
        immediate: { money: 4, mental: -2, reputation: 1 },
        selfTrustDelta: -2,
        primaryStat: "money",
        modifier: 1,
        tendencyTags: ["money", "reputation"],
        results: {
          bad: {
            text: "현실은 나아졌지만, 설명되지 않은 부담이 더 커졌다.",
            delta: { mental: -2 },
          },
          mixed: {
            text: "당장 필요한 건 해결됐지만 네 속마음은 더 말이 없어졌다.",
          },
          good: {
            text: "한숨은 돌렸지만 조건 없는 안도감은 아니었다.",
            delta: { money: 1 },
          },
        },
      },
    ],
  },
  {
    id: "move-back-home",
    category: "family",
    phase: "late20s",
    text: "월세를 감당하기 어려워 잠시 본가로 들어갈지 고민한다.",
    choices: [
      {
        id: "go-home-strategically",
        label: "잠깐 숨을 고르기 위한 선택이라고 받아들인다.",
        immediate: { money: 4, reputation: -1, mental: 1 },
        selfTrustDelta: 3,
        primaryStat: "money",
        modifier: 0,
        memoryTags: ["survival"],
        tendencyTags: ["money", "selfTrust"],
        results: {
          bad: {
            text: "마음은 복잡했지만, 버티기 위해 공간을 조정한 건 패배가 아니었다.",
          },
          mixed: {
            text: "자존심은 조금 다쳤지만 숨통은 조금 트였다.",
          },
          good: {
            text: "네가 살기 위한 결정이 네 기준을 더 분명하게 만들었다.",
            delta: { money: 2, mental: 1 },
          },
        },
      },
      {
        id: "hold-rented-room",
        label: "어떻게든 지금의 독립을 유지한다.",
        immediate: { money: -4, reputation: 1, mental: -1 },
        selfTrustDelta: 0,
        primaryStat: "money",
        modifier: -1,
        tendencyTags: ["money", "reputation"],
        results: {
          bad: {
            text: "독립은 지켰지만 생활은 더 가팔라졌다.",
            delta: { money: -2, mental: -1 },
          },
          mixed: { text: "버티고는 있지만, 계산기는 더 자주 켜진다." },
          good: {
            text: "간신히 버텨냈고, 그만큼 네 하루도 팽팽해졌다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
];
