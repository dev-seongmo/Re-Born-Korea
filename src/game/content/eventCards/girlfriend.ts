import type { EventCard, GirlfriendStatus } from "../../core/gameTypes";

export type GirlfriendScheduledEvent = {
  turn: number;
  eventId: string;
  allowedStatuses: GirlfriendStatus[];
};

export const girlfriendEventSchedule: GirlfriendScheduledEvent[] = [
  {
    turn: 6,
    eventId: "girlfriend-first-meet",
    allowedStatuses: ["none"],
  },
  {
    turn: 9,
    eventId: "girlfriend-confession",
    allowedStatuses: ["met"],
  },
  {
    turn: 12,
    eventId: "girlfriend-first-date",
    allowedStatuses: ["dating"],
  },
  {
    turn: 18,
    eventId: "girlfriend-conflict",
    allowedStatuses: ["dating"],
  },
  {
    turn: 24,
    eventId: "girlfriend-support",
    allowedStatuses: ["dating"],
  },
];

export const girlfriendEvents: EventCard[] = [
  {
    id: "girlfriend-first-meet",
    characterName: "지윤",
    category: "girlfriend",
    phase: "mid20s",
    text: "스터디 카페에서 자주 마주치던 사람이 커피를 건네며 말을 걸었다. 오늘따라 대화가 어색하지 않다.",
    choices: [
      {
        id: "accept-small-talk",
        label: "대화를 이어간다",
        immediate: { mental: 2, reputation: 1 },
        selfTrustDelta: 2,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["girlfriend_first_meet"],
        tendencyTags: ["mental", "selfTrust"],
        relationshipEffect: { girlfriendStatus: "met" },
        results: {
          bad: { text: "말은 조금 꼬였지만, 이상하게 도망치고 싶지는 않았다." },
          mixed: {
            text: "짧은 대화였지만 이름을 알게 됐다. 지윤. 다음에도 마주칠 것 같다.",
            delta: { mental: 1 },
          },
          good: {
            text: "서로의 취업 준비 이야기가 자연스럽게 이어졌다. 연락처까지 교환했다.",
            delta: { mental: 2, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "leave-politely",
        label: "인사만 한다",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec"],
        results: {
          bad: {
            text: "집중하려 했지만 방금의 대화가 계속 떠올랐다.",
            delta: { mental: -1 },
          },
          mixed: { text: "공부는 이어갔지만, 조금은 아쉬운 하루가 됐다." },
          good: {
            text: "지금은 준비가 먼저라고 생각했다. 그래도 인상은 나쁘지 않았다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "girlfriend-confession",
    characterName: "지윤",
    category: "girlfriend",
    phase: "mid20s",
    text: "며칠째 이어진 연락 끝에 지윤이 주말에 보자고 했다. 오늘은 관계를 분명히 할 수 있을 것 같다.",
    choices: [
      {
        id: "confess-honestly",
        label: "호감을 표현한다",
        immediate: { mental: -1, reputation: 1 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 1,
        memoryTags: ["girlfriend_confession"],
        tendencyTags: ["selfTrust", "mental"],
        relationshipEffect: { girlfriendStatus: "dating" },
        results: {
          bad: {
            text: "목소리는 떨렸지만 마음은 전해졌다. 지윤은 천천히 웃으며 고개를 끄덕였다.",
            selfTrustDelta: 1,
          },
          mixed: {
            text: "둘 다 서툴렀지만, 그래서 더 솔직했다. 오늘부터 함께 걸어보기로 했다.",
            delta: { mental: 2 },
          },
          good: {
            text: "지윤은 기다렸다는 듯 손을 잡았다. 오랜만에 미래가 혼자만의 일이 아니었다.",
            delta: { mental: 3, reputation: 1 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "avoid-defining",
        label: "관계를 흐린다",
        immediate: { spec: 1, mental: -2 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "comparison"],
        relationshipEffect: { girlfriendStatus: "failed" },
        results: {
          bad: {
            text: "지윤은 괜찮다고 했지만, 돌아서는 표정은 이미 멀어져 있었다.",
            delta: { mental: -2 },
          },
          mixed: { text: "애매한 말이 남았다. 관계도 애매하게 식어가기 시작했다." },
          good: {
            text: "당장은 부담을 피했지만, 놓친 것이 있다는 감각은 사라지지 않았다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "girlfriend-first-date",
    characterName: "지윤",
    category: "girlfriend",
    phase: "mid20s",
    text: "첫 데이트 날이다. 돈도 시간도 빠듯하지만, 지윤은 비싼 곳보다 편한 곳이면 된다고 했다.",
    choices: [
      {
        id: "simple-date",
        label: "소박하게 만난다",
        immediate: { money: -2, mental: 4 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["girlfriend_date"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "조금 초라한가 싶었지만, 지윤은 오늘이 편해서 좋다고 말했다." },
          mixed: {
            text: "큰 이벤트는 없었다. 대신 오래 기억날 만큼 조용히 웃었다.",
            delta: { mental: 1 },
          },
          good: {
            text: "지윤과 걷는 길에서, 버티기만 하던 하루가 처음으로 쉬어갔다.",
            delta: { mental: 3 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "overpay-date",
        label: "무리해서 예약한다",
        immediate: { money: -5, reputation: 1, mental: 1 },
        selfTrustDelta: -2,
        primaryStat: "money",
        modifier: 0,
        tendencyTags: ["money", "comparison"],
        results: {
          bad: {
            text: "계산서를 보는 순간 마음이 얼었다. 지윤도 네 불안을 눈치챈 듯했다.",
            delta: { money: -2, mental: -1 },
          },
          mixed: { text: "분위기는 좋았지만, 집에 오는 길에는 잔고가 먼저 떠올랐다." },
          good: {
            text: "오늘은 잘 넘겼다. 하지만 계속 이런 방식일 필요는 없다는 생각이 들었다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
  {
    id: "girlfriend-conflict",
    characterName: "지윤",
    category: "girlfriend",
    phase: "late20s",
    text: "면접 준비에 쫓겨 며칠째 답장이 늦었다. 지윤은 서운함을 숨기지 않고 이야기했다.",
    choices: [
      {
        id: "listen-and-apologize",
        label: "먼저 사과한다",
        immediate: { mental: -1, reputation: 2 },
        selfTrustDelta: 4,
        primaryStat: "reputation",
        modifier: 0,
        memoryTags: ["girlfriend_conflict"],
        tendencyTags: ["selfTrust", "reputation"],
        results: {
          bad: { text: "대화는 쉽지 않았지만, 끊어지지는 않았다." },
          mixed: {
            text: "지윤은 네 상황을 이해하려 했다. 너도 관계를 방치하지 않기로 했다.",
            delta: { mental: 1 },
          },
          good: {
            text: "불안한 말을 꺼냈는데도 관계는 무너지지 않았다. 오히려 조금 더 단단해졌다.",
            delta: { mental: 2, reputation: 1 },
            selfTrustDelta: 1,
          },
        },
      },
      {
        id: "defend-schedule",
        label: "선을 긋는다",
        immediate: { spec: 2, mental: -3 },
        selfTrustDelta: -3,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "틀린 말은 아니었지만, 지윤은 더 말하지 않았다.",
            delta: { mental: -2, reputation: -1 },
          },
          mixed: { text: "대화는 끝났지만 해결되지는 않았다. 마음 한쪽이 계속 무거웠다." },
          good: {
            text: "일정은 지켰다. 대신 관계는 조금 뒤로 밀려났다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "girlfriend-support",
    characterName: "지윤",
    category: "girlfriend",
    phase: "late20s",
    text: "최종 면접 전날, 지윤이 작은 응원 쪽지와 간식을 건넸다. 갑자기 긴장이 풀리며 눈가가 뜨거워졌다.",
    choices: [
      {
        id: "accept-support",
        label: "고맙다고 말한다",
        immediate: { mental: 5, reputation: 1 },
        selfTrustDelta: 5,
        primaryStat: "mental",
        modifier: 1,
        memoryTags: ["girlfriend_support", "small_comfort"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "말은 짧았지만, 지윤은 네가 버티고 있었다는 걸 알아줬다." },
          mixed: {
            text: "혼자 견디는 것만이 강한 건 아니라는 사실이 조금 믿어졌다.",
            delta: { mental: 2 },
          },
          good: {
            text: "내일의 결과와 상관없이, 지금의 너를 지지하는 사람이 곁에 있었다.",
            delta: { mental: 3, reputation: 1 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "hide-pressure",
        label: "괜찮은 척한다",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -1,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec"],
        results: {
          bad: {
            text: "괜찮다는 말이 너무 빨리 나왔다. 지윤은 잠시 네 얼굴을 바라봤다.",
            delta: { mental: -1 },
          },
          mixed: { text: "응원은 받았지만, 마음까지 받지는 못했다." },
          good: {
            text: "긴장은 숨겼다. 하지만 쪽지는 주머니 안에서 계속 따뜻했다.",
            delta: { mental: 1 },
          },
        },
      },
    ],
  },
];
