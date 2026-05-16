import { endings } from "../content/endings";
import type { GameSession } from "../core/gameTypes";
import { evaluateEnding } from "../systems/endingSystem";
import { evaluateInterviewOutcome } from "../systems/interviewSystem";

export function getEndingResult(session: GameSession) {
  const endingId = evaluateEnding(session);
  const ending = endings.find((entry) => entry.id === endingId) ?? endings[0];
  const interview = evaluateInterviewOutcome(session);

  return {
    ...ending,
    summary: `${ending.summary} 면접 평가 점수 ${interview.score}.`,
  };
}
