import type {
  EventCard,
  EventChoice,
  GameSession,
  MetricDelta,
  RunScene,
  TendencyScores,
  VisibleMetrics,
} from "../core/gameTypes";
import {
  amplifyMetricDelta,
  amplifySelfTrustDelta,
} from "./balanceSystem";
import { calculateIdentityStage } from "./identitySystem";
import { clampMetric } from "./metricSystem";
import { resolveRoll } from "./rollSystem";
import { applySelfTrust } from "./selfTrustSystem";
import { getGameOverReason } from "./gameOverSystem";

function applyMetricDelta(
  metrics: VisibleMetrics,
  delta: MetricDelta,
): VisibleMetrics {
  const amplified = amplifyMetricDelta(delta);

  return {
    spec: clampMetric(metrics.spec + (amplified.spec ?? 0)),
    money: clampMetric(metrics.money + (amplified.money ?? 0)),
    reputation: clampMetric(metrics.reputation + (amplified.reputation ?? 0)),
    mental: clampMetric(metrics.mental + (amplified.mental ?? 0)),
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

  if (
    amplifySelfTrustDelta(choice.selfTrustDelta) +
      amplifySelfTrustDelta(rollSelfTrustDelta) <
    0
  ) {
    next.comparison += 1;
  }

  return next;
}

function getNextScene(session: GameSession): RunScene {
  if (!Number.isFinite(session.maxTurns)) {
    return "result";
  }

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
    applySelfTrust(session.selfTrust, amplifySelfTrustDelta(choice.selfTrustDelta)),
    amplifySelfTrustDelta(rolledOutcome.selfTrustDelta ?? 0),
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
  const gameOverReason = getGameOverReason(nextMetrics);

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
    nextScene: gameOverReason ? "game-over" : getNextScene(session),
    gameOverReason,
  };
}
