import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { AtmosphereLayer } from "./AtmosphereLayer";
import { SwipeChoiceCard } from "./SwipeChoiceCard";
import type { EventChoice } from "../../game/core/gameTypes";
import type { MetricPreviewIntensity } from "../../game/systems/balanceSystem";
import { buildMetricPreviewMap } from "../../game/systems/balanceSystem";
import type {
  GameScreenViewModel,
  StatusItemViewModel,
} from "../../game/viewModels/gameScreenViewModel";

type Props = {
  viewModel: GameScreenViewModel;
  highlightHud?: boolean;
};

export function GameScreen({ highlightHud = false, viewModel }: Props) {
  const [previewedChoice, setPreviewedChoice] = useState<EventChoice | null>(null);
  const eventId = viewModel.eventPanel?.event.id ?? null;
  const shouldShowMetricPreview =
    viewModel.eventPanel &&
    !viewModel.eventPanel.disabled &&
    viewModel.eventPanel.event.category !== "tutorial" &&
    viewModel.eventPanel.event.category !== "interview";
  const metricPreviewMap = useMemo(
    () =>
      shouldShowMetricPreview && previewedChoice
        ? buildMetricPreviewMap(previewedChoice)
        : {},
    [previewedChoice, shouldShowMetricPreview],
  );

  useEffect(() => {
    setPreviewedChoice(null);
  }, [eventId]);

  return (
    <div className="game-grid">
      <section
        className={[
          "panel",
          "panel--hud",
          highlightHud ? "panel--hud-highlight" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="status-bar" aria-label="game status">
          {viewModel.statusItems.map((item) => (
            <StatusItem
              item={item}
              key={item.key}
              previewIntensity={metricPreviewMap[item.key]}
            />
          ))}
        </div>
      </section>

      <section className="panel panel--event">
        {viewModel.gameOverPanel ? (
          <div className="ending-card message-result message-result--game-over">
            <div className="message-result__header">
              <p className="eyebrow">{viewModel.gameOverPanel.eyebrow}</p>
              <h3>{viewModel.gameOverPanel.title}</h3>
              <p>{viewModel.gameOverPanel.summary}</p>
            </div>
            <div className="message-result__description">
              {viewModel.gameOverPanel.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <button
              className="primary-button"
              onClick={viewModel.gameOverPanel.onContinue}
              type="button"
            >
              {viewModel.gameOverPanel.nextLabel}
            </button>
          </div>
        ) : viewModel.endingPanel ? (
          <div
            className={[
              "ending-card",
              "message-result",
              `message-result--${viewModel.endingPanel.outcome}`,
            ].join(" ")}
          >
            <div className="message-result__phone-bar">
              <span>18:07</span>
              <span>LTE</span>
            </div>
            <div className="message-result__header">
              <p className="eyebrow">{viewModel.endingPanel.eyebrow}</p>
              <h3>{viewModel.endingPanel.title}</h3>
              <p>{viewModel.endingPanel.sender}</p>
              <span>{viewModel.endingPanel.receivedAt}</span>
            </div>
            <div className="message-result__bubble">
              {viewModel.endingPanel.messageLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="message-result__metrics" aria-label="final metrics">
              {viewModel.endingPanel.metricLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <button
              className="primary-button"
              onClick={viewModel.endingPanel.onContinue}
              type="button"
            >
              {viewModel.endingPanel.nextLabel}
            </button>
          </div>
        ) : viewModel.eventPanel ? (
          <div className="event-card">
            <SwipeChoiceCard
              continueLabel={viewModel.eventPanel.continueLabel}
              disabled={viewModel.eventPanel.disabled}
              event={viewModel.eventPanel.event}
              narrativeText={viewModel.eventPanel.narrativeText}
              onContinue={viewModel.eventPanel.onContinue}
              onPreviewChoiceChange={setPreviewedChoice}
              onResolve={viewModel.eventPanel.onResolveChoice}
            />
          </div>
        ) : null}
      </section>

      <AtmosphereLayer effect={viewModel.atmosphere} />
    </div>
  );
}

type StatusItemProps = {
  item: StatusItemViewModel;
  previewIntensity?: MetricPreviewIntensity;
};

function StatusItem({ item, previewIntensity }: StatusItemProps) {
  const value = Math.max(0, Math.min(100, item.value));
  const isPreviewed = previewIntensity !== undefined;
  const valueClassName = [
    "status-item__value",
    !isPreviewed ? "status-item__value--hidden" : "",
    isPreviewed ? "status-item__value--preview" : "",
    previewIntensity === "large" ? "status-item__value--preview-large" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="status-item status-item--icon"
      aria-label={`${item.label}: ${item.value}`}
    >
      <div className="status-item__meter">
        <div
          className="status-item__meter-fill"
          style={{ "--fill-level": `${value}%` } as CSSProperties}
        >
          <MetricIcon metricKey={item.key} filled />
        </div>
        <div className="status-item__meter-base">
          <MetricIcon metricKey={item.key} />
        </div>
      </div>
      <div className="status-item__legend">
        <span className="status-item__label">{item.label}</span>
        <span className={valueClassName}>?</span>
      </div>
    </div>
  );
}

type MetricIconProps = {
  metricKey: string;
  filled?: boolean;
};

function MetricIcon({ metricKey, filled = false }: MetricIconProps) {
  const className = filled
    ? "status-icon status-icon--filled"
    : "status-icon status-icon--base";

  switch (metricKey) {
    case "spec":
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
          <path
            d="M7 3.5h7.6L18 6.9v13.6H7z"
            fill="currentColor"
            opacity={filled ? 1 : 0.24}
          />
          <path d="M14.6 3.5v3.4H18z" fill="currentColor" />
          <path
            d="M9 9h6M9 12.5h6M9 16h4.5"
            fill="none"
            stroke={filled ? "rgba(17, 25, 38, 0.72)" : "currentColor"}
            strokeLinecap="round"
            strokeWidth="1.9"
          />
        </svg>
      );
    case "money":
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7v10M15 9.2c-.7-.8-1.7-1.2-3-1.2-1.8 0-3 .9-3 2.2 0 3.4 6 1.5 6 4.6 0 1.4-1.3 2.2-3.2 2.2-1.3 0-2.5-.4-3.3-1.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "reputation":
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
          <path
            d="M12 1.9l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 8.5l6.2-.9z"
            fill="currentColor"
          />
        </svg>
      );
    case "mental":
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
          <path
            d="M13.2 2C9.4 4.4 6.4 8.3 6.4 12.8c0 5.1 3.1 9.2 7.1 9.2 3.2 0 5.8-2.7 5.8-6 0-3.6-1.9-6.1-4.5-8.1-.3 1.9-1.1 3.2-2.3 4.4-1.2 1.2-1.9 2.4-1.7 4-1.4-.8-2.2-2.2-2.2-3.8 0-3.3 2.1-7.5 4.6-10.5z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="currentColor" />
        </svg>
      );
  }
}
