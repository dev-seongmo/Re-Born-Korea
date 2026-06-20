import type { CSSProperties } from "react";
import { AtmosphereLayer } from "./AtmosphereLayer";
import { SwipeChoiceCard } from "./SwipeChoiceCard";
import type {
  GameScreenViewModel,
  StatusItemViewModel,
} from "../../game/viewModels/gameScreenViewModel";

type Props = {
  viewModel: GameScreenViewModel;
  highlightHud?: boolean;
};

export function GameScreen({ highlightHud = false, viewModel }: Props) {
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
            <StatusItem item={item} key={item.key} />
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
};

function StatusItem({ item }: StatusItemProps) {
  const value = Math.max(0, Math.min(100, item.value));

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
        <span className="status-item__value">{value}</span>
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
          <path d="M6 4h12v16H6z" fill="currentColor" opacity="0.2" />
          <path d="M9 2h6v4H9z" fill="currentColor" />
          <path d="M8 9h8M8 13h8M8 17h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
          <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5L4.8 8.2l5-.7z" fill="currentColor" />
        </svg>
      );
    case "mental":
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
          <path d="M13 3c-2.8 1.6-5 4.5-5 7.5 0 2 1.1 3.7 2.9 4.4-.2-1.5.4-2.8 1.7-4 1.1-1 1.8-2 2-3.3 1.8 1.4 2.9 3.2 2.9 5.3 0 3.1-2.5 5.6-5.6 5.6S6.3 16 6.3 12.9C6.3 8.7 8.9 5 13 3z" fill="currentColor" />
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
