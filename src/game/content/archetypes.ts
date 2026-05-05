import type { StartArchetype } from "../core/gameTypes";

export const archetypes: StartArchetype[] = [
  {
    id: "stable",
    name: "안정형 출발",
    description: "경제적 여유는 있지만 기대도 함께 따라옵니다.",
    metrics: { spec: 52, money: 68, reputation: 62, mental: 48 },
  },
  {
    id: "average",
    name: "평균형 출발",
    description: "크게 유리하지도, 크게 불리하지도 않은 시작입니다.",
    metrics: { spec: 50, money: 50, reputation: 50, mental: 50 },
  },
  {
    id: "unstable",
    name: "불안정형 출발",
    description: "생활 압박은 크지만 버티는 힘도 함께 자랍니다.",
    metrics: { spec: 44, money: 32, reputation: 46, mental: 52 },
  },
  {
    id: "isolated",
    name: "고립형 출발",
    description: "기댈 곳은 적지만 자기 안쪽을 더 자주 보게 됩니다.",
    metrics: { spec: 46, money: 42, reputation: 30, mental: 44 },
  },
  {
    id: "overExpected",
    name: "기대과잉형 출발",
    description: "조건은 좋지만 남의 기대가 삶의 방향을 덮기 쉽습니다.",
    metrics: { spec: 58, money: 56, reputation: 72, mental: 40 },
  },
];
