import type { TendencyScores, VisibleMetrics } from "../core/gameTypes";

export function calculateIdentityStage(input: {
  selfTrust: number;
  metrics: VisibleMetrics;
  tendencies: TendencyScores;
}) {
  const { selfTrust, metrics, tendencies } = input;

  let stage = 0;

  if (selfTrust <= 45) {
    stage += 1;
  }
  if (selfTrust <= 30) {
    stage += 1;
  }
  if (metrics.mental <= 35) {
    stage += 1;
  }
  if (metrics.mental <= 20) {
    stage += 1;
  }
  if (tendencies.comparison >= 4) {
    stage += 1;
  }
  if (tendencies.reputation >= 4) {
    stage += 1;
  }

  return Math.max(0, Math.min(7, stage));
}
