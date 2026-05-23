import type {
  EventChoice,
  RollOutcomeBand,
  VisibleMetricKey,
  VisibleMetrics,
} from "../core/gameTypes";

function getStatBonus(metric: number) {
  if (metric <= 34) {
    return -1;
  }
  if (metric >= 68) {
    return 1;
  }
  return 0;
}

export function resolveRoll(
  choice: EventChoice,
  metrics: VisibleMetrics,
): {
  total: number;
  band: RollOutcomeBand;
  primaryStat: VisibleMetricKey;
} {
  const die = Math.floor(Math.random() * 6) + 1;
  const statBonus = getStatBonus(metrics[choice.primaryStat]);
  const total = die + statBonus + choice.modifier;

  let band: RollOutcomeBand = "mixed";

  if (total <= 3) {
    band = "bad";
  } else if (total >= 6) {
    band = "good";
  }

  return {
    total,
    band,
    primaryStat: choice.primaryStat,
  };
}
