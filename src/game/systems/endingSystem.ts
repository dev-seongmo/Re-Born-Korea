import type { EndingId, GameSession } from "../core/gameTypes";

export function evaluateEnding(session: GameSession): EndingId {
  if (session.selfTrust >= 54) {
    return "nameReborn";
  }

  return "proofOfWorth";
}
