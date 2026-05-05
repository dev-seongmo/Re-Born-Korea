import type { EndingId, GameSession } from "../core/gameTypes";

export function evaluateEnding(session: GameSession): EndingId {
  if (
    session.selfTrust >= 60 &&
    (session.memoryTags.includes("friendship") ||
      session.memoryTags.includes("warm_meal"))
  ) {
    return "nameReborn";
  }

  if (session.metrics.money <= 35 || session.metrics.mental <= 30) {
    return "barelySurvived";
  }

  return "proofOfWorth";
}
