import type { EventCard } from "../../core/gameTypes";

export const comparisonEvents: EventCard[] = [
  {
    id: "friend-major-company",
    category: "comparison",
    phase: "early20s",
    text: "친구가 대기업 합격 소식을 올렸다. 축하 문장을 쓰다가 손이 멈춘다.",
    choices: [
      {
        id: "stay-grounded",
        label: "진심으로 축하하고 내 페이스를 지킨다.",
        immediate: { mental: 3 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["friendship", "self_pace"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "마음 한쪽은 흔들렸지만, 오늘 하루를 잃지는 않았다." },
          mixed: {
            text: "불안은 남았지만 너는 너의 리듬을 지켰다.",
            selfTrustDelta: 1,
          },
          good: {
            text: "축하의 말은 비교 대신 연결을 남겼다.",
            delta: { mental: 2 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "rewrite-plan",
        label: "불안해져서 계획을 전면 수정한다.",
        immediate: { spec: 2, mental: -4 },
        selfTrustDelta: -4,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "새 계획은 거창했지만, 너는 더 초조해졌다.",
            delta: { mental: -3 },
          },
          mixed: {
            text: "조금 더 공부했지만 마음은 더 멀어졌다.",
            delta: { spec: 1 },
          },
          good: {
            text: "단기적으로는 성과가 있었지만 불안의 언어가 짙어졌다.",
            delta: { spec: 3, mental: -1 },
          },
        },
      },
    ],
  },
  {
    id: "linkedin-scroll-midnight",
    category: "comparison",
    phase: "mid20s",
    text: "잠들기 전 잠깐만 보려던 SNS가 링크드인 자랑글 타임라인으로 이어졌다.",
    choices: [
      {
        id: "close-app",
        label: "앱을 끄고 내일 할 일만 적는다.",
        immediate: { mental: 2 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["self_pace"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "불안이 바로 사라지진 않았지만 밤을 망치지는 않았다." },
          mixed: {
            text: "내일 해야 할 것이 선명해지자 비교의 소음이 조금 줄었다.",
            delta: { mental: 1 },
          },
          good: {
            text: "타인의 속도 대신 네 리듬이 다시 손에 잡혔다.",
            delta: { mental: 2 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "doom-scroll",
        label: "끝까지 다 보면서 나도 계획표를 다시 짠다.",
        immediate: { spec: 1, mental: -3 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["comparison", "spec"],
        results: {
          bad: {
            text: "새벽이 되었고, 바뀐 것은 일정표보다 심박수였다.",
            delta: { mental: -3 },
          },
          mixed: {
            text: "계획은 촘촘해졌지만 마음은 더 궁지에 몰렸다.",
            delta: { spec: 1 },
          },
          good: {
            text: "단기적 자극은 됐지만 비교의 불은 더 오래 탔다.",
            delta: { spec: 2, mental: -1 },
          },
        },
      },
    ],
  },
  {
    id: "classmate-certification",
    category: "comparison",
    phase: "mid20s",
    text: "동기가 자격증 두 개를 한 번에 붙었다는 소식을 단톡에 올렸다.",
    choices: [
      {
        id: "acknowledge-pressure",
        label: "부럽다는 마음을 인정하고, 내 루틴만 유지한다.",
        immediate: { mental: 2 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["self_pace"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "마음은 쓰렸지만 너는 그 감정을 외면하지 않았다." },
          mixed: {
            text: "비교를 부정하지 않자 오히려 휘둘림이 줄었다.",
            selfTrustDelta: 1,
          },
          good: {
            text: "남의 속도는 남의 것이고, 네 하루는 네 것으로 남았다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "panic-register",
        label: "불안한 마음으로 강의와 시험 접수를 한꺼번에 늘린다.",
        immediate: { spec: 3, money: -2, mental: -3 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "일정은 늘었고, 네가 견딜 공간은 줄었다.",
            delta: { mental: -2 },
          },
          mixed: {
            text: "무언가는 하고 있다는 안도와 무리하고 있다는 불안이 함께 왔다.",
          },
          good: {
            text: "단기적으로는 추진력이 붙었지만, 그 출발점은 여전히 초조함이었다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "wedding-invitation-season",
    category: "comparison",
    phase: "late20s",
    text: "청첩장이 한 달에 세 장 도착했다. 축하와 막막함이 동시에 밀려온다.",
    choices: [
      {
        id: "honor-my-timing",
        label: "축하는 축하대로 하고, 내 삶의 속도를 분리해서 생각한다.",
        immediate: { mental: 2, reputation: 1 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["self_pace"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "쉽지 않았지만 너는 남의 계절을 네 기준으로 삼지 않았다." },
          mixed: {
            text: "조금 흔들렸지만, 인생의 시간표를 빌려오지는 않았다.",
          },
          good: {
            text: "축하도 진심이었고, 너의 시간도 끝내 지켜졌다.",
            delta: { mental: 2 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "measure-myself",
        label: "나도 뒤처진 건 아닌지 조건들을 하나씩 비교해본다.",
        immediate: { reputation: 1, mental: -3 },
        selfTrustDelta: -4,
        primaryStat: "reputation",
        modifier: 0,
        tendencyTags: ["comparison", "reputation"],
        results: {
          bad: {
            text: "남의 인생 표를 들여다볼수록 네 이름은 흐려졌다.",
            delta: { mental: -2 },
          },
          mixed: {
            text: "겉으로는 차분했지만 속에서는 숫자들이 떠다녔다.",
          },
          good: {
            text: "당장은 자극이 됐어도 그 방식은 오래 버티기 어려웠다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
];
