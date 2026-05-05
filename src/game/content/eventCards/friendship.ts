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
        label: "오늘은 만난다.",
        immediate: { money: -2, mental: 4 },
        selfTrustDelta: 4,
        primaryStat: "mental",
        modifier: 0,
        memoryTags: ["friendship", "warm_meal"],
        tendencyTags: ["mental", "selfTrust"],
        results: {
          bad: {
            text: "길게 만나진 못했어도 네 하루는 조금 덜 차가워졌다.",
          },
          mixed: {
            text: "잠깐의 식사가 네 안의 시간을 되돌려 놓았다.",
            delta: { mental: 1 },
          },
          good: {
            text: "함께 웃은 저녁이 네가 아직 사람이라는 감각을 살렸다.",
            delta: { mental: 3 },
            selfTrustDelta: 2,
          },
        },
      },
      {
        id: "delay-again",
        label: "이번만 미룬다.",
        immediate: { spec: 1, mental: -2 },
        selfTrustDelta: -2,
        primaryStat: "spec",
        modifier: 0,
        tendencyTags: ["spec", "comparison"],
        results: {
          bad: {
            text: "일은 조금 남았고, 관계는 조금 멀어졌다.",
            delta: { mental: -2 },
          },
          mixed: {
            text: "오늘도 미뤘지만 네 불안은 줄지 않았다.",
          },
          good: {
            text: "짧게 집중은 됐지만 빈자리는 그대로였다.",
            delta: { spec: 1 },
          },
        },
      },
    ],
  },
];
