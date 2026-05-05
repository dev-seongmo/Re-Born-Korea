import { clampMetric } from "./metricSystem";

export function applySelfTrust(current: number, delta: number) {
  return clampMetric(current + delta);
}
