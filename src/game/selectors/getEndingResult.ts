import { endings } from "../content/endings";
import type { GameSession } from "../core/gameTypes";
import { evaluateEnding } from "../systems/endingSystem";

export function getEndingResult(session: GameSession) {
  const endingId = evaluateEnding(session);
  return endings.find((ending) => ending.id === endingId) ?? endings[0];
}
