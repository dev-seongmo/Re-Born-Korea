import type {
  GameOverReason,
  VisibleMetricKey,
} from "../core/gameTypes";

export type GameOverContent = {
  id: GameOverReason;
  metric: VisibleMetricKey;
  boundary: "zero" | "max";
  title: string;
  summary: string;
  description: string[];
  restartLabel: string;
};

export const gameOverResults: Record<GameOverReason, GameOverContent> = {
  spec_zero: {
    id: "spec_zero",
    metric: "spec",
    boundary: "zero",
    title: "아무것도 증명하지 못했다",
    summary: "스펙이 바닥나며 지원할 수 있는 길이 닫혔다.",
    description: [
      "이력서의 빈칸은 더 이상 가능성처럼 보이지 않았다.",
      "면접장은 멀어졌고, 공고는 하나씩 지나갔다.",
      "이번 생은 준비 부족이라는 이름으로 조용히 종료됐다.",
    ],
    restartLabel: "다시 태어나기",
  },
  spec_max: {
    id: "spec_max",
    metric: "spec",
    boundary: "max",
    title: "완벽한 이력서의 감옥",
    summary: "스펙이 과잉되며 삶이 증명 강박에 잠식됐다.",
    description: [
      "모든 칸은 채워졌지만, 정작 너는 어디에도 없었다.",
      "다음 자격증, 다음 시험, 다음 증명만 남았다.",
      "완벽해지려는 시도 끝에 이번 생은 멈춰 섰다.",
    ],
    restartLabel: "처음으로 돌아가기",
  },
  money_zero: {
    id: "money_zero",
    metric: "money",
    boundary: "zero",
    title: "잔고 부족",
    summary: "생활을 유지할 돈이 사라져 더 이상 버틸 수 없게 됐다.",
    description: [
      "교통비, 식비, 월세가 차례로 현실이 되었다.",
      "내일을 준비하기 전에 오늘을 넘길 수 없었다.",
      "이번 생은 잔고 0원 앞에서 종료됐다.",
    ],
    restartLabel: "다시 시작하기",
  },
  money_max: {
    id: "money_max",
    metric: "money",
    boundary: "max",
    title: "돈이 전부가 된 생",
    summary: "돈은 충분해졌지만 모든 선택이 돈으로만 계산됐다.",
    description: [
      "잃지 않기 위해 아무것도 하지 않게 되었다.",
      "관계도, 시간도, 마음도 손익표 위에 놓였다.",
      "통장은 가득 찼지만 이번 생은 텅 비어버렸다.",
    ],
    restartLabel: "처음으로 돌아가기",
  },
  reputation_zero: {
    id: "reputation_zero",
    metric: "reputation",
    boundary: "zero",
    title: "아무도 부르지 않았다",
    summary: "평판이 무너져 기회와 관계가 끊겼다.",
    description: [
      "메시지는 읽히지 않았고, 추천은 돌아오지 않았다.",
      "한 번 닫힌 문들은 쉽게 다시 열리지 않았다.",
      "이번 생은 신뢰를 잃은 자리에서 끝났다.",
    ],
    restartLabel: "다시 태어나기",
  },
  reputation_max: {
    id: "reputation_max",
    metric: "reputation",
    boundary: "max",
    title: "모두의 기대가 된 사람",
    summary: "평판이 너무 높아져 스스로의 선택권을 잃었다.",
    description: [
      "모두가 너를 믿었고, 그래서 누구도 너의 피로를 보지 못했다.",
      "실망시키지 않기 위해 계속 웃어야 했다.",
      "기대는 박수가 아니라 무게가 되었고, 이번 생을 짓눌렀다.",
    ],
    restartLabel: "처음으로 돌아가기",
  },
  mental_zero: {
    id: "mental_zero",
    metric: "mental",
    boundary: "zero",
    title: "마음이 꺼졌다",
    summary: "정신력이 바닥나 더 이상 선택을 이어갈 수 없게 됐다.",
    description: [
      "알람은 울렸지만 몸은 일어나지 못했다.",
      "해야 할 일들은 그대로였고, 너만 멈춰 있었다.",
      "이번 생은 버티는 힘을 모두 소진한 채 종료됐다.",
    ],
    restartLabel: "다시 태어나기",
  },
  mental_max: {
    id: "mental_max",
    metric: "mental",
    boundary: "max",
    title: "무너지지 않는 척",
    summary: "지나친 정신력으로 고통을 무시하다 한계가 터졌다.",
    description: [
      "괜찮다는 말이 너무 익숙해졌다.",
      "힘들다는 신호를 전부 이겨내야 할 문제로만 여겼다.",
      "끝까지 버티려던 마음은 결국 스스로를 놓쳐버렸다.",
    ],
    restartLabel: "처음으로 돌아가기",
  },
};

export function getGameOverContent(reason: GameOverReason) {
  return gameOverResults[reason];
}
