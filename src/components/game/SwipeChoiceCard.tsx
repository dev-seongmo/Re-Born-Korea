import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import type { EventCard, EventChoice } from "../../game/core/gameTypes";
import { mapEventToCardViewModel } from "../../game/presenters/mapEventToCardViewModel";
import { CardAnswerBadge } from "./CardAnswerBadge";
import { CardBody } from "./CardBody";
import { CardImpactPreview } from "./CardImpactPreview";

type SwipeDirection = "left" | "right" | null;

type Props = {
  event: EventCard;
  disabled?: boolean;
  onResolve: (choice: EventChoice) => void;
};

const COMMIT_DISTANCE = 86;
const MAX_DRAG_DISTANCE = 66;
const FLYOUT_DISTANCE = 920;

function applyElasticDrag(value: number) {
  const direction = value < 0 ? -1 : 1;
  const distance = Math.abs(value);

  if (distance <= MAX_DRAG_DISTANCE) {
    return value;
  }

  const overshoot = distance - MAX_DRAG_DISTANCE;
  const resistedOvershoot = overshoot * 0.22;
  return direction * (MAX_DRAG_DISTANCE + resistedOvershoot);
}

export function SwipeChoiceCard({ event, disabled = false, onResolve }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const dragXRef = useRef(0);
  const draggingRef = useRef(false);
  const resolveLockRef = useRef(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlyingOut, setIsFlyingOut] = useState(false);

  const leftChoice = event.choices[0];
  const rightChoice = event.choices[1];
  const card = mapEventToCardViewModel(event);

  const direction: SwipeDirection =
    dragX > 18 ? "right" : dragX < -18 ? "left" : null;

  const intensity = Math.min(Math.abs(dragX) / COMMIT_DISTANCE, 1);
  const rotation = dragX * 0.045;
  const showLeftBadge = direction === "right";
  const showRightBadge = direction === "left";

  function setPointerCapture(pointerId: number) {
    if (cardRef.current && cardRef.current.hasPointerCapture(pointerId) === false) {
      cardRef.current.setPointerCapture(pointerId);
    }
  }

  function releasePointerCapture(pointerId: number) {
    if (cardRef.current?.hasPointerCapture(pointerId)) {
      cardRef.current.releasePointerCapture(pointerId);
    }
  }

  function resetCard() {
    draggingRef.current = false;
    pointerIdRef.current = null;
    dragXRef.current = 0;
    setIsDragging(false);
    setDragX(0);
  }

  function flyOutAndResolve(choice: EventChoice, targetDirection: "left" | "right") {
    if (resolveLockRef.current) {
      return;
    }

    resolveLockRef.current = true;
    setIsDragging(false);
    setIsFlyingOut(true);

    const targetX = targetDirection === "right" ? FLYOUT_DISTANCE : -FLYOUT_DISTANCE;
    dragXRef.current = targetX;
    setDragX(targetX);

    window.setTimeout(() => {
      onResolve(choice);
      resolveLockRef.current = false;
      setIsFlyingOut(false);
      setDragX(0);
    }, 260);
  }

  function handlePointerDown(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || resolveLockRef.current) {
      return;
    }

    pointerIdRef.current = eventObject.pointerId;
    startXRef.current = eventObject.clientX;
    draggingRef.current = true;
    setIsDragging(true);
    setPointerCapture(eventObject.pointerId);
  }

  function handlePointerMove(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (
      disabled ||
      resolveLockRef.current ||
      pointerIdRef.current !== eventObject.pointerId ||
      !draggingRef.current
    ) {
      return;
    }

    const nextX = applyElasticDrag(eventObject.clientX - startXRef.current);
    dragXRef.current = nextX;
    setDragX(nextX);
  }

  function handlePointerUp(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== eventObject.pointerId) {
      return;
    }

    releasePointerCapture(eventObject.pointerId);

    const finalX = dragXRef.current;

    if (finalX >= COMMIT_DISTANCE) {
      flyOutAndResolve(rightChoice, "right");
      return;
    }

    if (finalX <= -COMMIT_DISTANCE) {
      flyOutAndResolve(leftChoice, "left");
      return;
    }

    resetCard();
  }

  function handlePointerCancel(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== eventObject.pointerId) {
      return;
    }

    releasePointerCapture(eventObject.pointerId);
    resetCard();
  }

  return (
    <div className="swipe-stage">
      <div className="swipe-card__narrative">
        <p className="swipe-card__text">{card.bodyText}</p>
      </div>

      <div
        className={[
          "swipe-card",
          isDragging ? "swipe-card--dragging" : "",
          isFlyingOut ? "swipe-card--flying" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-direction={direction ?? "neutral"}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        ref={cardRef}
        style={
          {
            "--drag-x": `${dragX}px`,
            "--card-rotate": `${rotation}deg`,
            "--choice-intensity": intensity.toFixed(3),
          } as CSSProperties
        }
      >
        <CardAnswerBadge
          align="left"
          isVisible={showLeftBadge}
          text={card.leftPreviewText}
        />
        <CardImpactPreview
          align="left"
          isVisible={showLeftBadge}
          preview={card.leftImpactPreview}
        />
        <CardAnswerBadge
          align="right"
          isVisible={showRightBadge}
          text={card.rightPreviewText}
        />
        <CardImpactPreview
          align="right"
          isVisible={showRightBadge}
          preview={card.rightImpactPreview}
        />
        <CardBody card={card} />
      </div>
    </div>
  );
}
