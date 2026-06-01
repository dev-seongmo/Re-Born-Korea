import type {
  GameOverReason,
  VisibleMetricKey,
  VisibleMetrics,
} from "../core/gameTypes";

const boundaryChecks: Array<{
  metric: VisibleMetricKey;
  minReason: GameOverReason;
  maxReason: GameOverReason;
}> = [
  { metric: "mental", minReason: "mental_zero", maxReason: "mental_max" },
  { metric: "money", minReason: "money_zero", maxReason: "money_max" },
  {
    metric: "reputation",
    minReason: "reputation_zero",
    maxReason: "reputation_max",
  },
  { metric: "spec", minReason: "spec_zero", maxReason: "spec_max" },
];

export function getGameOverReason(
  metrics: VisibleMetrics,
): GameOverReason | null {
  const minBoundary = boundaryChecks.find(({ metric }) => metrics[metric] <= 0);

  if (minBoundary) {
    return minBoundary.minReason;
  }

  const maxBoundary = boundaryChecks.find(({ metric }) => metrics[metric] >= 100);

  return maxBoundary?.maxReason ?? null;
}
