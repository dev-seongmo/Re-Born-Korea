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

      <button
        className="swipe-card swipe-card--result"
        onClick={onContinue}
        type="button"
      >
        <div className="swipe-card__body">
          <div className="swipe-card__category">Result</div>
          <CardPortrait />
          <span className="swipe-card__hint">카드를 눌러 계속</span>
          <span className="primary-button swipe-card__continue">
            {nextLabel}
          </span>
        </div>
      </button>
    </div>
  );
}
