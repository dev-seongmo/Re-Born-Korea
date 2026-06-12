type Props = {
  align: "left" | "right";
  isVisible: boolean;
  text: string;
};

export function CardAnswerBadge({
  align,
  isVisible,
  text,
}: Props) {
  return (
    <div
      className={`swipe-card__answer swipe-card__answer--${align} ${
        isVisible ? "swipe-card__answer--visible" : ""
      }`}
    >
      <span>{text}</span>
    </div>
  );
}
