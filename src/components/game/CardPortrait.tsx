import { PORTRAIT_REGISTRY } from "./portraits";

type Props = {
  label: string;
  assetId?: string;
};

export function CardPortrait({ label, assetId }: Props) {
  const PortraitComponent = assetId ? PORTRAIT_REGISTRY[assetId] : undefined;

  return (
    <div className="swipe-card__portrait">
      <div
        className={[
          "swipe-card__portrait-frame",
          PortraitComponent ? "swipe-card__portrait-frame--filled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {PortraitComponent ? <PortraitComponent /> : <span>{label}</span>}
      </div>
    </div>
  );
}
