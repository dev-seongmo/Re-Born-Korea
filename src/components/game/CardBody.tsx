import type { CardViewModel } from "../../game/viewModels/cardViewModel";
import { CardPortrait } from "./CardPortrait";

type Props = {
  card: CardViewModel;
};

export function CardBody({ card }: Props) {
  return (
    <div className="swipe-card__body">
      <div className="swipe-card__category">{card.categoryLabel}</div>
      <CardPortrait label={card.portraitLabel} assetId={card.portraitAssetId} />
    </div>
  );
}
