type Props = {
  align: "left" | "right";
  opacity: number;
  text: string;
};

export function CardAnswerBadge({
  align,
  opacity,
  text,
}: Props) {
  return (
    <div
      className={`swipe-card__answer swipe-card__answer--${align}`}
      style={{ opacity }}
    >
      <span>{text}</span>
    </div>
  );
}
