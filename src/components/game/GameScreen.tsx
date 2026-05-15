import { SwipeChoiceCard } from "./SwipeChoiceCard";
import type {
  GameScreenViewModel,
  StatusItemViewModel,
} from "../../game/viewModels/gameScreenViewModel";

type Props = {
  viewModel: GameScreenViewModel;
};

export function GameScreen({ viewModel }: Props) {
  return (
    <div className="game-grid">
      <section className="panel panel--hud">
        <div className="status-bar" aria-label="game status">
          {viewModel.statusItems.map((item) => (
            <StatusItem item={item} key={item.label} />
          ))}
        </div>
      </section>

      <section className="panel panel--event">
        <div className="panel__header panel__header--compact">
          <div>
            <p className="eyebrow">{viewModel.turnLabel}</p>
            <h2>{viewModel.currentLabel}</h2>
          </div>
        </div>

        {viewModel.endingPanel ? (
          <div className="ending-card">
            <p className="eyebrow">Ending</p>
            <h3>{viewModel.endingPanel.title}</h3>
            <p>{viewModel.endingPanel.summary}</p>
            <p>{viewModel.endingPanel.reveal}</p>
            <p>{viewModel.endingPanel.coda}</p>
          </div>
        ) : viewModel.resultPanel ? (
          <div className="result-card">
            <p className="eyebrow">Last Result</p>
            <p>{viewModel.resultPanel.text}</p>
            <button
              className="primary-button"
              onClick={viewModel.resultPanel.onContinue}
            >
              {viewModel.resultPanel.nextLabel}
            </button>
          </div>
        ) : viewModel.eventPanel ? (
          <div className="event-card">
            <p className="eyebrow">{viewModel.eventPanel.categoryLabel}</p>
            <h3>{viewModel.eventPanel.title}</h3>
            <SwipeChoiceCard
              event={viewModel.eventPanel.event}
              onResolve={viewModel.eventPanel.onResolveChoice}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}

type StatusItemProps = {
  item: StatusItemViewModel;
};

function StatusItem({ item }: StatusItemProps) {
  return (
    <div className="status-item" aria-label={`${item.label}: ${item.value}`}>
      <div className="status-item__meta">
        <span className="status-item__icon" aria-hidden="true">
          {item.icon}
        </span>
        <span className="status-item__label">{item.label}</span>
      </div>
      <div className="status-item__bar" aria-hidden="true">
        <div
          className="status-item__fill"
          style={{ width: `${Math.max(0, Math.min(100, item.value))}%` }}
        />
      </div>
    </div>
  );
}
