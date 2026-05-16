import type { EndingId, GameSession } from "../core/gameTypes";
import { evaluateInterviewOutcome } from "./interviewSystem";

export function evaluateEnding(session: GameSession): EndingId {
  const interview = evaluateInterviewOutcome(session);

  if (interview.passed && session.selfTrust >= 54) {
    return "nameReborn";
  }

  if (!interview.passed) {
    return "barelySurvived";
  }

  return "proofOfWorth";
}
