type Props = {
  align: "left" | "right";
  isVisible: boolean;
  persistent?: boolean;
  text: string;
};

export function CardAnswerBadge({
  align,
  isVisible,
  persistent = false,
  text,
}: Props) {
  return (
    <div
      className={`swipe-card__answer swipe-card__answer--${align} ${
        isVisible ? "swipe-card__answer--visible" : ""
      } ${persistent ? "swipe-card__answer--persistent" : ""
      }`}
    >
      <span>{text}</span>
    </div>
  );
}
