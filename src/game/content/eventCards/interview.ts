import type { EventCard } from "../../core/gameTypes";

export const interviewEvent: EventCard = {
  id: "final-interview",
  characterName: "면접관",
  category: "interview",
  phase: "late20s",
  text:
    "면접실 문이 닫히자 바깥 소음이 끊겼다.\n\n세 명의 면접관이 서류를 넘긴다. 가운데 앉은 사람이 고개를 들었다.\n\n\"마지막으로 묻겠습니다. 이 일을 왜 당신에게 맡겨야 합니까?\"",
  choices: [
    {
      id: "answer-with-proof",
      label: "준비한 근거로 차분히 답한다",
      immediate: { spec: 1, reputation: 1 },
      selfTrustDelta: 2,
      primaryStat: "spec",
      modifier: 0,
      memoryTags: ["interview_day", "steady_answer"],
      tendencyTags: ["spec", "selfTrust"],
      results: {
        bad: {
          text:
            "말끝이 조금 흔들렸지만, 답은 무너지지 않았다.\n\n당신은 경험과 준비한 내용을 하나씩 꺼내 놓았다. 면접관의 펜이 멈추지 않는다.",
        },
        mixed: {
          text:
            "완벽한 답은 아니었다. 그래도 빈칸은 없었다.\n\n당신은 할 수 있는 말과 해온 일을 구분해서 설명했다.",
          delta: { reputation: 1 },
        },
        good: {
          text:
            "답변의 순서가 또렷하게 맞물렸다.\n\n준비한 시간, 버틴 마음, 사람들 앞에서의 태도가 한 문장 안에 들어왔다.",
          delta: { spec: 1, reputation: 1 },
          selfTrustDelta: 1,
        },
      },
    },
    {
      id: "answer-with-desperation",
      label: "절박함을 숨기지 않고 말한다",
      immediate: { mental: 1, reputation: -1 },
      selfTrustDelta: 1,
      primaryStat: "mental",
      modifier: -1,
      memoryTags: ["interview_day"],
      tendencyTags: ["mental"],
      results: {
        bad: {
          text:
            "목소리에 절박함이 먼저 새어 나왔다.\n\n면접관은 잠시 침묵했다. 진심은 닿았지만, 그들이 찾는 확신까지는 조금 모자랐다.",
          delta: { reputation: -1 },
        },
        mixed: {
          text:
            "당신은 솔직했다. 그리고 겨우 중심을 되찾았다.\n\n\"그래도 이 일을 해내고 싶습니다.\" 마지막 문장은 작지만 분명했다.",
        },
        good: {
          text:
            "절박함은 변명이 아니라 이유가 되었다.\n\n면접관 한 명이 처음으로 서류에서 눈을 떼고 당신을 바라보았다.",
          delta: { mental: 1, reputation: 1 },
          selfTrustDelta: 1,
        },
      },
    },
  ],
};
