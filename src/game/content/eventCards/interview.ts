import type { EventCard } from "../../core/gameTypes";

export const interviewEvent: EventCard = {
  id: "final-interview",
  category: "interview",
  phase: "late20s",
  text:
    "문이 열리고 면접관들의 시선이 한 번에 꽂힌다. 차사의 목소리가 아주 낮게 스친다. \"여기서부터는 네가 걷는다.\"",
  choices: [
    {
      id: "answer-steadily",
      label: "숨을 고르고 차분하게 답한다",
      immediate: { mental: 1, reputation: 1 },
      selfTrustDelta: 2,
      primaryStat: "mental",
      modifier: 0,
      memoryTags: ["interview_day", "steady_answer"],
      tendencyTags: ["mental", "selfTrust"],
      results: {
        bad: {
          text: "목소리가 조금 떨렸지만 끝내 무너지지는 않았다. 오늘의 결과는, 네가 쌓아 온 것들이 대신 말해 줄 것이다.",
        },
        mixed: {
          text: "완벽하진 않았지만, 너는 질문을 피하지 않았다. 마지막 대답 뒤에 짧은 정적이 남는다.",
          delta: { reputation: 1 },
        },
        good: {
          text: "시선이 흔들리지 않는다. 준비한 것과 버텨 온 시간이 한 문장씩 제자리를 찾는다.",
          delta: { reputation: 1, mental: 1 },
        },
      },
    },
    {
      id: "push-aggressively",
      label: "강하게 밀어붙이며 자신감을 과시한다",
      immediate: { reputation: 2, mental: -1 },
      selfTrustDelta: -1,
      primaryStat: "reputation",
      modifier: 1,
      memoryTags: ["interview_day"],
      tendencyTags: ["reputation", "comparison"],
      results: {
        bad: {
          text: "힘으로 버티려던 문장이 중간에서 갈라진다. 남은 평가는 이제 수치와 인상 사이에서 갈릴 것이다.",
          delta: { mental: -1 },
        },
        mixed: {
          text: "강한 인상은 남겼지만, 모든 답이 네 것이었는지는 애매하다. 면접관들은 조용히 메모를 남긴다.",
        },
        good: {
          text: "짧고 날카롭게 치고 나간다. 다만 마지막 결과는, 결국 지금까지의 축적이 정할 것이다.",
          delta: { reputation: 1 },
        },
      },
    },
  ],
};
