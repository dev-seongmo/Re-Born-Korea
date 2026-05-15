import { clampMetric } from "../systems/metricSystem";
import type { GameAction, GameSession } from "./gameTypes";

export function gameReducer(
  session: GameSession,
  action: GameAction,
): GameSession {
  switch (action.type) {
    case "profile/updated":
      return {
        ...session,
        profile: {
          ...session.profile,
          ...action.payload,
        },
      };

    case "game/started":
      return {
        ...session,
        scene: "event",
        archetype: action.payload.archetype,
        metrics: action.payload.archetype.metrics,
        currentEventId: action.payload.initialEventId,
        maxTurns: action.payload.maxTurns,
      };

    case "turn/resolved":
      return {
        ...session,
        scene: action.payload.nextScene,
        turn: session.turn + 1,
        currentEventId: action.payload.eventId,
        eventHistory: [...session.eventHistory, action.payload.eventId],
        latestResult: action.payload.result,
        metrics: {
          spec: clampMetric(action.payload.metrics.spec),
          money: clampMetric(action.payload.metrics.money),
          reputation: clampMetric(action.payload.metrics.reputation),
          mental: clampMetric(action.payload.metrics.mental),
        },
        selfTrust: clampMetric(action.payload.selfTrust),
        identityStage: action.payload.identityStage,
        memoryTags: action.payload.memoryTags,
        tendencyScores: action.payload.tendencyScores,
      };

    case "scene/set":
      return {
        ...session,
        scene: action.payload,
      };

    case "event/queued":
      return {
        ...session,
        currentEventId: action.payload.eventId,
      };

    default:
      return session;
  }
}
