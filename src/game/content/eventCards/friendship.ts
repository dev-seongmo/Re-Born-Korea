import type { EventCard } from "../../core/gameTypes";

export const friendshipEvents: EventCard[] = [
  {
    id: "old-friend-call",
    category: "friendship",
    phase: "mid20s",
    text: "오랜 친구가 밥 먹자고 연락했다. 오늘 저녁은 비어 있지 않다.",
    choices: [
      {
        id: "meet-tonight",
        label: "오늘은 만난다",
        immediate: { money: -2, mental: 2 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["friendship", "warm_meal"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "길게 만나진 못했어도 네 하루는 조금 덜 차가워졌다." },
          mixed: {
            text: "잠깐의 식사가 네 안의 시간을 되돌려 놓았다.",
            delta: { mental: 1 },
          },
          good: {
            text: "함께 웃은 저녁이 네가 아직 사람이라는 감각을 살렸다.",
            delta: { mental: 1 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "delay-again",
        label: "이번만 미룬다",
        immediate: { spec: 1, mental: -1 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "일은 조금 남았고, 관계는 조금 멀어졌다.",
          },
          mixed: { text: "오늘도 미뤘지만 네 불안은 줄지 않았다." },
          good: {
            text: "짧게 집중은 됐지만 빈자리는 그대로였다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "friend-asks-for-help",
    category: "friendship",
    phase: "mid20s",
    text: "친구가 힘들다며 밤늦게 전화를 걸어왔다. 내일 아침 일정도 빡빡하다.",
    choices: [
      {
        id: "stay-on-call",
        label: "전화를 받는다",
        immediate: { reputation: 1 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["friendship"],
        tendencyTags: ["selfTrust", "mental"],
        results: {
          bad: {
            text: "피곤은 남았지만 네가 소중히 여기는 것이 무엇인지 분명해졌다.",
          },
          mixed: {
            text: "내일은 조금 힘들겠지만 오늘의 연결은 오래 남을 것이다.",
          },
          good: {
            text: "누군가를 붙잡아준 밤이 오히려 너도 덜 혼자이게 했다.",
            delta: { mental: 1 },
          },
        },
      },
      {
        id: "text-tomorrow",
        label: "내일로 미룬다",
        immediate: { spec: 1 },
        selfTrustDelta: -1,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec"],
        results: {
          bad: {
            text: "일정은 지켰지만 마음 한켠이 계속 걸렸다.",
          },
          mixed: {
            text: "현실적인 선택이었지만 너는 그 현실이 조금 서늘했다.",
          },
          good: {
            text: "오늘은 지나갔지만, 내일 먼저 연락할 용기는 남았다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
  {
    id: "birthday-message-late",
    category: "friendship",
    phase: "late20s",
    text: "친구 생일을 하루 늦게 알아차렸다. 바쁘다는 말이 변명처럼 느껴진다.",
    choices: [
      {
        id: "send-long-message",
        label: "진심을 보낸다",
        immediate: { reputation: 1 },
        selfTrustDelta: 3,
        primaryStat: "reputation",
        modifier: 0,
        memoryTags: ["friendship"],
        tendencyTags: ["selfTrust"],
        results: {
          bad: { text: "민망했지만 네 진심은 늦게라도 도착했다." },
          mixed: {
            text: "타이밍은 놓쳤어도 관계는 완전히 놓치지 않았다.",
          },
          good: {
            text: "짧은 사과와 긴 마음이 관계를 다시 따뜻하게 했다.",
          },
        },
      },
      {
        id: "pretend-notice-later",
        label: "그냥 넘긴다",
        immediate: { spec: 1 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec"],
        results: {
          bad: {
            text: "바쁨은 지나갔지만 미안함은 오래 남았다.",
          },
          mixed: { text: "일은 계속됐지만 관계의 온도는 조금 낮아졌다." },
          good: {
            text: "큰 문제는 없었지만 스스로에게는 찜찜했다.",
          },
        },
      },
    ],
  },
  {
    id: "trip-invitation",
    category: "friendship",
    phase: "late20s",
    text: "친구들이 1박 2일 여행을 가자고 한다. 돈도 시간도 넉넉하지 않다.",
    choices: [
      {
        id: "go-anyway",
        label: "함께 간다",
        immediate: { money: -3, mental: 1 },
        selfTrustDelta: 3,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["friendship", "warm_meal"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: { text: "살짝 무리였지만 너는 오래 기억할 장면을 얻었다." },
          mixed: { text: "잔고는 줄었지만 표정은 조금 돌아왔다." },
          good: {
            text: "짧은 여행이 삶이 전부 효율은 아니라는 걸 다시 보여줬다.",
          },
        },
      },
      {
        id: "decline-gently",
        label: "이번엔 거절한다",
        immediate: { money: 1 },
        selfTrustDelta: 2,
        primaryStat: "money",
        modifier: 0,
        tendencyTags: ["money", "selfTrust"],
        results: {
          bad: { text: "아쉽지만 너는 현실을 외면하지 않았다." },
          mixed: { text: "이번은 어렵지만 관계를 끊는 방식은 아니었다." },
          good: {
            text: "무리하지 않는 솔직함이 오히려 관계를 편하게 했다.",
          },
        },
      },
    ],
  },
];
