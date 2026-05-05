import type { ChoiceImpactPreview } from "../../game/systems/balanceSystem";

type Props = {
  align: "left" | "right";
  isVisible: boolean;
  preview: ChoiceImpactPreview;
};

function formatDelta(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}

function metricLabel(key: ChoiceImpactPreview["primary"][number]["key"]) {
  switch (key) {
    case "spec":
      return "Spec";
    case "money":
      return "Money";
    case "reputation":
      return "Rep";
    case "mental":
      return "Mental";
    default:
      return key;
  }
}

export function CardImpactPreview({ align, isVisible, preview }: Props) {
  return (
    <div
      className={`swipe-card__impact swipe-card__impact--${align} ${
        isVisible ? "swipe-card__impact--visible" : ""
      }`}
    >
      <div className="swipe-card__impact-primary">
        {preview.primary.map((item) => (
          <div className="impact-chip" key={`${item.key}-${item.delta}`}>
            <span className="impact-chip__label">{metricLabel(item.key)}</span>
            <strong
              className={`impact-chip__value ${
                item.delta > 0 ? "impact-chip__value--up" : "impact-chip__value--down"
              }`}
            >
              {formatDelta(item.delta)}
            </strong>
          </div>
        ))}

        {preview.selfTrustDelta !== 0 ? (
          <div className="impact-chip impact-chip--trust">
            <span className="impact-chip__label">Trust</span>
            <strong
              className={`impact-chip__value ${
                preview.selfTrustDelta > 0
                  ? "impact-chip__value--up"
                  : "impact-chip__value--down"
              }`}
            >
              {formatDelta(preview.selfTrustDelta)}
            </strong>
          </div>
        ) : null}
      </div>

      {preview.possible.length > 0 ? (
        <div className="swipe-card__impact-possible">
          {preview.possible.map((item) => (
            <span className="impact-possible" key={`${item.key}-${item.delta}`}>
              {metricLabel(item.key)} {item.delta > 0 ? "up" : "down"}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
