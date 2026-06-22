import type {
  EventChoice,
  MetricDelta,
  RollOutcomeSet,
  VisibleMetricKey,
} from "../core/gameTypes";
import { LARGE_METRIC_PREVIEW_DELTA_THRESHOLD } from "../config/previewConfig";

const METRIC_DELTA_MULTIPLIER = 3;
const SELF_TRUST_MULTIPLIER = 2.5;

function scaleNumber(value: number, multiplier: number) {
  if (value === 0) {
    return 0;
  }

  const scaled = Math.round(value * multiplier);
  return scaled === 0 ? Math.sign(value) : scaled;
}

export function amplifyMetricDelta(delta: MetricDelta): MetricDelta {
  return {
    spec:
      delta.spec !== undefined
        ? scaleNumber(delta.spec, METRIC_DELTA_MULTIPLIER)
        : undefined,
    money:
      delta.money !== undefined
        ? scaleNumber(delta.money, METRIC_DELTA_MULTIPLIER)
        : undefined,
    reputation:
      delta.reputation !== undefined
        ? scaleNumber(delta.reputation, METRIC_DELTA_MULTIPLIER)
        : undefined,
    mental:
      delta.mental !== undefined
        ? scaleNumber(delta.mental, METRIC_DELTA_MULTIPLIER)
        : undefined,
  };
}

export function amplifySelfTrustDelta(delta: number) {
  return scaleNumber(delta, SELF_TRUST_MULTIPLIER);
}

export type MetricImpactPreviewItem = {
  key: VisibleMetricKey;
  delta: number;
};

export type ChoiceImpactPreview = {
  primary: MetricImpactPreviewItem[];
  possible: MetricImpactPreviewItem[];
  selfTrustDelta: number;
};

export type MetricPreviewIntensity = "normal" | "large";

export type MetricPreviewMap = Partial<Record<VisibleMetricKey, MetricPreviewIntensity>>;

const visibleMetricKeys: VisibleMetricKey[] = [
  "spec",
  "money",
  "reputation",
  "mental",
];

function collectPossibleOutcomeDelta(results: RollOutcomeSet): MetricDelta {
  const aggregate: Record<VisibleMetricKey, number> = {
    spec: 0,
    money: 0,
    reputation: 0,
    mental: 0,
  };

  Object.values(results).forEach((outcome) => {
    aggregate.spec += outcome.delta?.spec ?? 0;
    aggregate.money += outcome.delta?.money ?? 0;
    aggregate.reputation += outcome.delta?.reputation ?? 0;
    aggregate.mental += outcome.delta?.mental ?? 0;
  });

  return {
    spec: aggregate.spec === 0 ? undefined : Math.sign(aggregate.spec),
    money: aggregate.money === 0 ? undefined : Math.sign(aggregate.money),
    reputation: aggregate.reputation === 0 ? undefined : Math.sign(aggregate.reputation),
    mental: aggregate.mental === 0 ? undefined : Math.sign(aggregate.mental),
  };
}

function toPreviewItems(delta: MetricDelta): MetricImpactPreviewItem[] {
  const entries: MetricImpactPreviewItem[] = [];

  if (delta.spec) {
    entries.push({ key: "spec", delta: delta.spec });
  }
  if (delta.money) {
    entries.push({ key: "money", delta: delta.money });
  }
  if (delta.reputation) {
    entries.push({ key: "reputation", delta: delta.reputation });
  }
  if (delta.mental) {
    entries.push({ key: "mental", delta: delta.mental });
  }

  return entries;
}

export function buildChoiceImpactPreview(choice: EventChoice): ChoiceImpactPreview {
  return {
    primary: toPreviewItems(amplifyMetricDelta(choice.immediate)),
    possible: toPreviewItems(collectPossibleOutcomeDelta(choice.results)),
    selfTrustDelta: amplifySelfTrustDelta(choice.selfTrustDelta),
  };
}

export function buildMetricPreviewMap(choice: EventChoice): MetricPreviewMap {
  const immediate = amplifyMetricDelta(choice.immediate);
  const outcomes = Object.values(choice.results);
  const previewMap: MetricPreviewMap = {};

  visibleMetricKeys.forEach((key) => {
    const possibleTotals = outcomes.map((outcome) => {
      const outcomeDelta = amplifyMetricDelta(outcome.delta ?? {});
      return (immediate[key] ?? 0) + (outcomeDelta[key] ?? 0);
    });
    const hasImpact = possibleTotals.some((delta) => delta !== 0);

    if (!hasImpact) {
      return;
    }

    const maxAbsoluteDelta = Math.max(
      ...possibleTotals.map((delta) => Math.abs(delta)),
    );

    previewMap[key] =
      maxAbsoluteDelta >= LARGE_METRIC_PREVIEW_DELTA_THRESHOLD
        ? "large"
        : "normal";
  });

  return previewMap;
}
