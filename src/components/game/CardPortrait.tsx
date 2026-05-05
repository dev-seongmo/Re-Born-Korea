type Props = {
  label: string;
};

export function CardPortrait({ label }: Props) {
  return (
    <div className="swipe-card__portrait">
      <div className="swipe-card__portrait-frame">
        <span>{label}</span>
      </div>
    </div>
  );
}
