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
          bad: {
            text: "마음 한쪽은 흔들렸지만, 오늘 하루를 잃지는 않았다.",
          },
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
];
