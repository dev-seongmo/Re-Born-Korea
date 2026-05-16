import type { GameSession } from "../core/gameTypes";

export type InterviewOutcome = {
  passed: boolean;
  score: number;
};

export function calculateInterviewScore(session: GameSession) {
  const score =
    session.metrics.spec * 0.42 +
    session.metrics.mental * 0.24 +
    session.metrics.reputation * 0.22 +
    session.metrics.money * 0.12;

  return Math.round(score);
}

export function evaluateInterviewOutcome(session: GameSession): InterviewOutcome {
  const score = calculateInterviewScore(session);
  const passed =
    score >= 56 && session.metrics.spec >= 45 && session.metrics.mental >= 35;

  return {
    passed,
    score,
  };
}
