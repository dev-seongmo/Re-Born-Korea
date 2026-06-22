import type { CardViewModel } from "../../game/viewModels/cardViewModel";
import { CardPortrait } from "./CardPortrait";

type Props = {
  card: CardViewModel;
};

export function CardBody({ card: _card }: Props) {
  return (
    <div className="swipe-card__body">
      <CardPortrait
        alt={_card.portraitAlt}
        key={_card.portraitSrc}
        src={_card.portraitSrc}
      />
    </div>
  );
}
