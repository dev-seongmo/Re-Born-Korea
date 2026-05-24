import type { GameSession } from "../core/gameTypes";

export type InterviewOutcome = {
  passed: boolean;
  score: number;
  weakMetricKeys: Array<keyof GameSession["metrics"]>;
};

export function calculateInterviewScore(session: GameSession) {
  const score =
    (session.metrics.spec +
      session.metrics.money +
      session.metrics.reputation +
      session.metrics.mental) /
    4;

  return Math.round(score);
}

export function evaluateInterviewOutcome(session: GameSession): InterviewOutcome {
  const score = calculateInterviewScore(session);
  const weakMetricKeys = (
    Object.keys(session.metrics) as Array<keyof GameSession["metrics"]>
  ).filter((key) => session.metrics[key] < 50);

  return {
    passed: weakMetricKeys.length === 0,
    score,
    weakMetricKeys,
  };
}
