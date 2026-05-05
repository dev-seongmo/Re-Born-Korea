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
          bad: {
            text: "대화는 서툴렀지만, 적어도 너는 숨지 않았다.",
          },
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
          mixed: {
            text: "겉은 잠잠했지만 네 마음은 더 닫혔다.",
          },
          good: {
            text: "당장은 체면을 지켰지만, 그 비용은 네 안에 남았다.",
            delta: { reputation: 1 },
          },
        },
      },
    ],
  },
];
