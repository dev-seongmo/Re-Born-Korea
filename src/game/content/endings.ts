import type { EndingDefinition } from "../core/gameTypes";

export const endings: EndingDefinition[] = [
  {
    id: "proofOfWorth",
    title: "합격, 아직 무겁게 남은 이름",
    summary:
      "최종 합격했다. 결과는 통과였지만, 그 과정에서 잃지 않으려 붙잡은 것들이 아직 손에 남아 있다.",
    reveal:
      "청령차사는 조용히 말한다. \"문을 넘었다고 해서 모든 한이 풀리는 것은 아니다.\"",
    coda:
      "합격 통보는 도착했다. 하지만 이 삶이 정말 끝났는지는 아직 알 수 없다.",
  },
  {
    id: "barelySurvived",
    title: "불합격, 끝나지 않은 걸음",
    summary:
      "최종 전형을 통과하지 못했다. 어느 한 곳의 균열이 면접실 안에서 드러났다.",
    reveal:
      "청령차사는 결과를 접고 말한다. \"약점이 남은 영혼은 문 앞에서 다시 흔들린다.\"",
    coda:
      "이번 생은 여기서 멈췄다. 다시 걸을 수 있을지는 다음 선택에 달려 있다.",
  },
  {
    id: "nameReborn",
    title: "합격, 다시 불린 이름",
    summary:
      "최종 합격했다. 이번에는 결과뿐 아니라 스스로의 이름도 끝까지 놓치지 않았다.",
    reveal:
      "\"너는 네 이름으로 통과했다.\" 청령차사의 말이 마지막 문장처럼 남는다.",
    coda:
      "합격 통보보다 선명한 것은, 이번 생을 네가 직접 건넜다는 감각이다.",
  },
];
