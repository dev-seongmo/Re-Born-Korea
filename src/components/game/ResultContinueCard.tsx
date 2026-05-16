import { CardPortrait } from "./CardPortrait";

type Props = {
  text: string;
  nextLabel: string;
  onContinue: () => void;
};

export function ResultContinueCard({ text, nextLabel, onContinue }: Props) {
  return (
    <div className="swipe-stage">
      <div className="swipe-card__narrative">
        <p className="swipe-card__text">{text}</p>
      </div>

      <div className="swipe-card swipe-card--result">
        <div className="swipe-card__body">
          <div className="swipe-card__category">Result</div>
          <CardPortrait />
          <button className="primary-button swipe-card__continue" onClick={onContinue}>
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
