import type { EventCard } from "../../core/gameTypes";

export const mentalEvents: EventCard[] = [
  {
    id: "alarm-cannot-rise",
    category: "mental",
    phase: "early20s",
    text: "알람이 여러 번 울렸는데 몸이 유난히 무겁다. 오늘 할 일은 이미 많다.",
    choices: [
      {
        id: "rest-one-morning",
        label: "조금 더 쉰다",
        immediate: { mental: 3, reputation: -1 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["rest"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "죄책감은 있었지만 너는 오늘의 몸을 무시하지 않았다." },
          mixed: { text: "조금 늦었지만 하루 전체가 무너지진 않았다." },
          good: {
            text: "짧은 회복이 번아웃 직전의 선을 넘지 않게 했다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "force-myself-up",
        label: "억지로 일어난다",
        immediate: { spec: 1, mental: -3 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec"],
        results: {
          bad: {
            text: "하루는 굴러갔지만 너 자신을 다루는 방식은 더 거칠어졌다.",
            delta: { mental: -2 },
          },
          mixed: { text: "할 일은 했지만 몸은 계속 신호를 보냈다." },
          good: { text: "오늘은 버텼다. 그렇다고 괜찮았던 건 아니었다." },
        },
      },
    ],
  },
  {
    id: "sunday-emptiness",
    category: "mental",
    phase: "mid20s",
    text: "일요일 저녁, 해야 할 일도 아직 남았고 쉬지도 못한 기분이다.",
    choices: [
      {
        id: "write-one-small-plan",
        label: "하나만 정리한다",
        immediate: { mental: 2 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "완전한 안정은 아니어도 불안을 전부 내일로 끌고 가지는 않았다.",
          },
          mixed: { text: "하나만 정하자 마음도 조금 작아졌다." },
          good: {
            text: "내일의 너를 믿어보기로 하자 오늘의 밤이 조금 가벼워졌다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "keep-pushing",
        label: "더 밀어붙인다",
        immediate: { spec: 2, mental: -2 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: { text: "해야 할 일은 줄지 않았고, 피로만 더 늘었다.", delta: { mental: -2 } },
          mixed: { text: "조금 진도는 나갔지만 일요일은 더 짧아졌다." },
          good: {
            text: "오늘을 조금 더 썼지만, 내일의 회복력을 가져다 쓴 셈이었다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "burnout-sign",
    category: "mental",
    phase: "late20s",
    text: "좋아하던 일인데도 아무 감정이 안 든다. 번아웃 같다는 생각이 스친다.",
    choices: [
      {
        id: "name-it-burnout",
        label: "번아웃을 인정한다",
        immediate: { mental: 4, spec: -1 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["rest"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "진도가 늦어져도 너는 처음으로 상태를 제대로 불렀다." },
          mixed: { text: "이름 붙여진 고통은 조금 덜 무서워졌다." },
          good: {
            text: "늦추는 선택이 무너짐을 막는 선택이 되었다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "ignore-it",
        label: "그냥 버틴다",
        immediate: { spec: 2, mental: -4 },
        selfTrustDelta: -4,
        primaryStat: "spec",
        modifier: 1,
        tendencyTags: ["comparison", "spec"],
        results: {
          bad: {
            text: "성과보다 먼저 꺼져가는 감각이 분명해졌다.",
            delta: { mental: -3 },
          },
          mixed: { text: "겉으론 버텼지만 안쪽은 점점 무감각해졌다." },
          good: {
            text: "당장은 넘어갔지만 오래 버틸 수 있는 방식은 아니었다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "therapy-tab-open",
    category: "mental",
    phase: "late20s",
    text: "심리상담 예약 페이지를 열어두고 한참 망설인다.",
    choices: [
      {
        id: "book-session",
        label: "예약해본다",
        immediate: { money: -2, mental: 2 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["honesty", "rest"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: { text: "쉽지 않은 결제였지만 너는 네 고통을 무시하지 않았다." },
          mixed: { text: "해결은 아직 멀어도 도움을 향해 몸을 돌렸다." },
          good: {
            text: "처음으로 '나도 도움을 받아도 된다'는 문장이 조금 믿어졌다.",
            delta: { mental: 2 },
          },
        },
      },
      {
        id: "close-tab",
        label: "창을 닫는다",
        immediate: { money: 1, mental: -1 },
        selfTrustDelta: -2,
        primaryStat: "money",
        modifier: 0,
        tendencyTags: ["money"],
        results: {
          bad: {
            text: "돈은 아꼈지만 네 상태도 다시 뒤로 미뤄졌다.",
            delta: { mental: -2 },
          },
          mixed: { text: "오늘은 닫았지만 고민은 계속 남았다." },
          good: { text: "아직 준비되지 않았다는 사실만큼은 솔직했다." },
        },
      },
    ],
  },
];
