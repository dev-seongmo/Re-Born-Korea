import type {
  EventCard,
  EventChoice,
  GameSession,
  MetricDelta,
  SceneId,
  TendencyScores,
  VisibleMetrics,
} from "../core/gameTypes";
import { calculateIdentityStage } from "./identitySystem";
import { clampMetric } from "./metricSystem";
import { resolveRoll } from "./rollSystem";
import { applySelfTrust } from "./selfTrustSystem";

function applyMetricDelta(
  metrics: VisibleMetrics,
  delta: MetricDelta,
): VisibleMetrics {
  return {
    spec: clampMetric(metrics.spec + (delta.spec ?? 0)),
    money: clampMetric(metrics.money + (delta.money ?? 0)),
    reputation: clampMetric(metrics.reputation + (delta.reputation ?? 0)),
    mental: clampMetric(metrics.mental + (delta.mental ?? 0)),
  };
}

function bumpTendencies(
  base: TendencyScores,
  choice: EventChoice,
  rollSelfTrustDelta: number,
): TendencyScores {
  const next = { ...base };

  choice.tendencyTags?.forEach((tag) => {
    next[tag] += 1;
  });

  if (choice.selfTrustDelta + rollSelfTrustDelta < 0) {
    next.comparison += 1;
  }

  return next;
}

function getNextScene(session: GameSession): SceneId {
  return session.turn + 1 >= session.maxTurns ? "ending" : "result";
}

export function resolveTurn(params: {
  session: GameSession;
  event: EventCard;
  choice: EventChoice;
}) {
  const { session, event, choice } = params;

  const afterImmediate = applyMetricDelta(session.metrics, choice.immediate);
  const roll = resolveRoll(choice, afterImmediate);
  const rolledOutcome = choice.results[roll.band];
  const nextMetrics = applyMetricDelta(afterImmediate, rolledOutcome.delta ?? {});
  const nextSelfTrust = applySelfTrust(
    applySelfTrust(session.selfTrust, choice.selfTrustDelta),
    rolledOutcome.selfTrustDelta ?? 0,
  );
  const nextTendencies = bumpTendencies(
    session.tendencyScores,
    choice,
    rolledOutcome.selfTrustDelta ?? 0,
  );
  const nextMemoryTags = Array.from(
    new Set([...session.memoryTags, ...(choice.memoryTags ?? [])]),
  );
  const nextIdentityStage = calculateIdentityStage({
    selfTrust: nextSelfTrust,
    metrics: nextMetrics,
    tendencies: nextTendencies,
  });

  return {
    eventId: event.id,
    choiceId: choice.id,
    result: {
      eventId: event.id,
      choiceId: choice.id,
      band: roll.band,
      text: rolledOutcome.text,
    },
    metrics: nextMetrics,
    selfTrust: nextSelfTrust,
    identityStage: nextIdentityStage,
    memoryTags: nextMemoryTags,
    tendencyScores: nextTendencies,
    nextScene: getNextScene(session),
  };
}
