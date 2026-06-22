import type {
  AnimationEvent as ReactAnimationEvent,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  TransitionEvent as ReactTransitionEvent,
} from "react";
import { useEffect, useRef, useState } from "react";
import type { EventCard, EventChoice } from "../../game/core/gameTypes";
import { mapEventToCardViewModel } from "../../game/presenters/mapEventToCardViewModel";
import { CardAnswerBadge } from "./CardAnswerBadge";
import { CardBody } from "./CardBody";
import { CardImpactPreview } from "./CardImpactPreview";

type SwipeDirection = "left" | "right" | null;
type CardVisualPhase = "idle" | "exiting" | "hidden" | "entering";

type Props = {
  event: EventCard;
  narrativeText: string;
  continueLabel?: string;
  disabled?: boolean;
  onContinue?: () => void;
  onResolve: (choice: EventChoice) => void;
};

const COMMIT_DISTANCE = 86;
const MAX_DRAG_DISTANCE = 66;
const FLYOUT_DISTANCE = 920;
const FIRST_TUTORIAL_EVENT_ID = "tutorial-fog-awakening";
const AUTO_DEMO_INITIAL_DELAY = 620;
const AUTO_DEMO_STEP_DELAY = 760;
const CARD_HIDDEN_DELAY = 300;
const KEY_PREVIEW_DISTANCE = 58;

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

export function SwipeChoiceCard({
  event,
  narrativeText,
  continueLabel,
  disabled = false,
  onContinue,
  onResolve,
}: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const dragXRef = useRef(0);
  const draggingRef = useRef(false);
  const resolveLockRef = useRef(false);
  const autoDemoStoppedRef = useRef(false);
  const hiddenDelayRef = useRef<number | null>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);
  const [dragX, setDragX] = useState(0);
  const [demoDragX, setDemoDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [phase, setPhase] = useState<CardVisualPhase>("idle");
  const [keyboardPreviewDirection, setKeyboardPreviewDirection] =
    useState<SwipeDirection>(null);

  const shouldAutoDemo =
    phase === "idle" &&
    event.id === FIRST_TUTORIAL_EVENT_ID &&
    !disabled &&
    !isDragging &&
    !autoDemoStoppedRef.current;
  const visualDragX = shouldAutoDemo ? demoDragX : dragX;
  const rightChoice = event.choices[0];
  const leftChoice = event.choices[1];
  const card = mapEventToCardViewModel(event);

  const direction: SwipeDirection =
    visualDragX > 18 ? "right" : visualDragX < -18 ? "left" : null;

  const intensity = Math.min(Math.abs(visualDragX) / COMMIT_DISTANCE, 1);
  const rightChoiceOpacity = Math.min(
    Math.max(visualDragX, 0) / COMMIT_DISTANCE * 1.35,
    1,
  );
  const leftChoiceOpacity = Math.min(
    Math.max(-visualDragX, 0) / COMMIT_DISTANCE * 1.35,
    1,
  );
  const rotation = visualDragX * 0.045;
  const rightSwipeChoiceOpacity = disabled ? 0 : rightChoiceOpacity;
  const leftSwipeChoiceOpacity = disabled ? 0 : leftChoiceOpacity;

  useEffect(() => {
    return () => {
      if (hiddenDelayRef.current !== null) {
        window.clearTimeout(hiddenDelayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleWindowKeyDown(eventObject: KeyboardEvent) {
      handleKeyboardChoice(eventObject);
    }

    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  });

  useEffect(() => {
    autoDemoStoppedRef.current = false;
    setDemoDragX(0);

    if (event.id !== FIRST_TUTORIAL_EVENT_ID || disabled) {
      return;
    }

    const steps = [0, 46, 0, -46, 0, 38, 0, -38, 0];
    const timeouts = steps.map((value, index) =>
      window.setTimeout(() => {
        if (!autoDemoStoppedRef.current) {
          setDemoDragX(value);
        }
      }, AUTO_DEMO_INITIAL_DELAY + index * AUTO_DEMO_STEP_DELAY),
    );

    const stopTimeout = window.setTimeout(() => {
      autoDemoStoppedRef.current = true;
      setDemoDragX(0);
    }, AUTO_DEMO_INITIAL_DELAY + steps.length * AUTO_DEMO_STEP_DELAY);

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.clearTimeout(stopTimeout);
    };
  }, [disabled, event.id]);

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
    setKeyboardPreviewDirection(null);
  }

  function beginFlyOut(targetDirection: "left" | "right", afterExit: () => void) {
    if (resolveLockRef.current || phase !== "idle") {
      return;
    }

    if (hiddenDelayRef.current !== null) {
      window.clearTimeout(hiddenDelayRef.current);
      hiddenDelayRef.current = null;
    }

    resolveLockRef.current = true;
    pendingActionRef.current = afterExit;
    autoDemoStoppedRef.current = true;
    setIsDragging(false);
    setDemoDragX(0);
    setPhase("exiting");

    const targetX = targetDirection === "right" ? FLYOUT_DISTANCE : -FLYOUT_DISTANCE;
    dragXRef.current = targetX;
    setDragX(targetX);
  }

  function completeFlyOut() {
    const pendingAction = pendingActionRef.current;
    pendingActionRef.current = null;

    setPhase("hidden");
    resetCard();
    pendingAction?.();

    hiddenDelayRef.current = window.setTimeout(() => {
      hiddenDelayRef.current = null;
      setPhase("entering");
    }, CARD_HIDDEN_DELAY);
  }

  function flyOutAndResolve(choice: EventChoice, targetDirection: "left" | "right") {
    beginFlyOut(targetDirection, () => onResolve(choice));
  }

  function flyOutAndContinue(targetDirection: "left" | "right") {
    if (!onContinue) {
      return;
    }

    beginFlyOut(targetDirection, onContinue);
  }

  function handlePointerDown(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (resolveLockRef.current || phase !== "idle") {
      return;
    }

    eventObject.preventDefault();
    autoDemoStoppedRef.current = true;
    setDemoDragX(0);
    setKeyboardPreviewDirection(null);
    pointerIdRef.current = eventObject.pointerId;
    startXRef.current = eventObject.clientX;
    draggingRef.current = true;
    setIsDragging(true);
    setPointerCapture(eventObject.pointerId);
  }

  function handlePointerMove(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (
      resolveLockRef.current ||
      phase !== "idle" ||
      pointerIdRef.current !== eventObject.pointerId ||
      !draggingRef.current
    ) {
      return;
    }

    eventObject.preventDefault();
    const nextX = applyElasticDrag(eventObject.clientX - startXRef.current);
    dragXRef.current = nextX;
    setDragX(nextX);
  }

  function handlePointerUp(eventObject: ReactPointerEvent<HTMLDivElement>) {
    if (phase !== "idle") {
      return;
    }

    if (pointerIdRef.current !== eventObject.pointerId) {
      return;
    }

    eventObject.preventDefault();
    releasePointerCapture(eventObject.pointerId);

    const finalX = dragXRef.current;

    if (disabled) {
      if (finalX >= COMMIT_DISTANCE) {
        flyOutAndContinue("right");
        return;
      }

      if (finalX <= -COMMIT_DISTANCE) {
        flyOutAndContinue("left");
        return;
      }

      resetCard();
      return;
    }

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
    if (phase !== "idle") {
      return;
    }

    if (pointerIdRef.current !== eventObject.pointerId) {
      return;
    }

    eventObject.preventDefault();
    releasePointerCapture(eventObject.pointerId);
    resetCard();
  }

  function commitKeyboardChoice(direction: Exclude<SwipeDirection, null>) {
    if (disabled) {
      flyOutAndContinue(direction);
      return;
    }

    if (direction === "right") {
      flyOutAndResolve(rightChoice, "right");
      return;
    }

    flyOutAndResolve(leftChoice, "left");
  }

  function handleKeyboardChoice(eventObject: KeyboardEvent) {
    if (
      phase !== "idle" ||
      isDragging ||
      resolveLockRef.current ||
      (eventObject.key !== "ArrowLeft" && eventObject.key !== "ArrowRight")
    ) {
      return;
    }

    eventObject.preventDefault();

    const nextDirection = eventObject.key === "ArrowRight" ? "right" : "left";

    autoDemoStoppedRef.current = true;
    setDemoDragX(0);

    if (keyboardPreviewDirection === nextDirection) {
      commitKeyboardChoice(nextDirection);
      return;
    }

    setKeyboardPreviewDirection(nextDirection);
    const nextDragX =
      nextDirection === "right" ? KEY_PREVIEW_DISTANCE : -KEY_PREVIEW_DISTANCE;
    dragXRef.current = nextDragX;
    setDragX(nextDragX);
  }

  function handleTransitionEnd(eventObject: ReactTransitionEvent<HTMLDivElement>) {
    if (
      phase !== "exiting" ||
      eventObject.target !== eventObject.currentTarget ||
      eventObject.propertyName !== "transform"
    ) {
      return;
    }

    completeFlyOut();
  }

  function handleAnimationEnd(eventObject: ReactAnimationEvent<HTMLDivElement>) {
    if (
      phase !== "entering" ||
      eventObject.target !== eventObject.currentTarget ||
      eventObject.animationName !== "swipe-card-enter"
    ) {
      return;
    }

    resolveLockRef.current = false;
    setPhase("idle");
  }

  return (
    <div className="swipe-stage">
      <div className="swipe-card__narrative">
        <p className="swipe-card__text">{narrativeText}</p>
      </div>

      <div
        className={[
          "swipe-card",
          shouldAutoDemo ? "swipe-card--auto-demo" : "",
          isDragging ? "swipe-card--dragging" : "",
          phase === "exiting" ? "swipe-card--exiting" : "",
          phase === "hidden" ? "swipe-card--hidden" : "",
          phase === "entering" ? "swipe-card--entering" : "",
          disabled ? "swipe-card--disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-direction={direction ?? "neutral"}
        aria-label="왼쪽 또는 오른쪽 방향키로 선택"
        onAnimationEnd={handleAnimationEnd}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTransitionEnd={handleTransitionEnd}
        ref={cardRef}
        role="button"
        style={
          {
            "--drag-x": `${visualDragX}px`,
            "--card-rotate": `${rotation}deg`,
            "--choice-intensity": intensity.toFixed(3),
          } as CSSProperties
        }
        tabIndex={0}
      >
        <CardAnswerBadge
          align="left"
          opacity={rightSwipeChoiceOpacity}
          text={card.rightPreviewText}
        />
        <CardImpactPreview
          align="left"
          opacity={rightSwipeChoiceOpacity}
          preview={card.rightImpactPreview}
        />
        <CardAnswerBadge
          align="right"
          opacity={leftSwipeChoiceOpacity}
          text={card.leftPreviewText}
        />
        <CardImpactPreview
          align="right"
          opacity={leftSwipeChoiceOpacity}
          preview={card.leftImpactPreview}
        />
        <CardBody card={card} />
      </div>

      <div className="swipe-card__name-slot" aria-live="polite">
        {continueLabel ? (
          <p className="swipe-card__name swipe-card__name--muted">{continueLabel}</p>
        ) : card.characterName ? (
          <p className="swipe-card__name">{card.characterName}</p>
        ) : null}
      </div>
    </div>
  );
}
