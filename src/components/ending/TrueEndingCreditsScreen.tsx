import { useEffect, useRef, useState } from "react";
import type {
  TrueEndingCreditItem,
  TrueEndingCreditsDefinition,
} from "../../game/content/trueEnding";
import { audioManager } from "../../audio/audioManager";
import chasaImage from "../../assets/images/characters/npc/saja1.png";

type TrueEndingCreditsScreenProps = {
  credits: TrueEndingCreditsDefinition;
  onComplete: () => void;
};

const ENDING_RETURN_DELAY_MS = 4200;
const BASE_SCROLL_SPEED_PX_PER_MS = 0.052;
const FAST_SCROLL_MULTIPLIER = 3;

export function TrueEndingCreditsScreen({
  credits,
  onComplete,
}: TrueEndingCreditsScreenProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const completeTimerRef = useRef<number | null>(null);
  const speedMultiplierRef = useRef(1);
  const [isSpeedingUp, setIsSpeedingUp] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    audioManager.stop("music.afterlife");
    audioManager.play("ending.credits", 0.62, { restart: true, seek: 35 });

    return () => audioManager.stop("ending.credits");
  }, []);

  useEffect(() => {
    let lastTime = window.performance.now();

    function tick(now: number) {
      const viewport = viewportRef.current;

      if (!viewport) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const delta = Math.min(now - lastTime, 48);
      lastTime = now;
      viewport.scrollTop +=
        BASE_SCROLL_SPEED_PX_PER_MS * speedMultiplierRef.current * delta;

      const hasScrolledToEnd =
        viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 2;

      if (hasScrolledToEnd) {
        setHasReachedEnd(true);
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    }

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasReachedEnd) {
      return undefined;
    }

    completeTimerRef.current = window.setTimeout(() => {
      completeTimerRef.current = null;
      onComplete();
    }, ENDING_RETURN_DELAY_MS);

    return () => {
      if (completeTimerRef.current !== null) {
        window.clearTimeout(completeTimerRef.current);
        completeTimerRef.current = null;
      }
    };
  }, [hasReachedEnd, onComplete]);

  useEffect(() => {
    return () => {
      if (completeTimerRef.current !== null) {
        window.clearTimeout(completeTimerRef.current);
      }
    };
  }, []);

  function stopSpeedUp() {
    speedMultiplierRef.current = 1;
    setIsSpeedingUp(false);
  }

  function startSpeedUp() {
    speedMultiplierRef.current = FAST_SCROLL_MULTIPLIER;
    setIsSpeedingUp(true);
  }

  return (
    <section
      className={`true-ending-credits-scene ${
        isSpeedingUp ? "true-ending-credits-scene--speeding" : ""
      } ${
        hasReachedEnd ? "true-ending-credits-scene--ended" : ""
      }`}
      onPointerCancel={stopSpeedUp}
      onPointerDown={startSpeedUp}
      onPointerLeave={stopSpeedUp}
      onPointerUp={stopSpeedUp}
    >
      <div className="true-ending-credits-scene__fade true-ending-credits-scene__fade--top" />
      <div className="true-ending-credits-scene__fade true-ending-credits-scene__fade--bottom" />

      <div className="true-ending-credits-scene__viewport" ref={viewportRef}>
        <div className="true-ending-credits-scene__track">
          {credits.items.map((item, index) => (
            <CreditItem index={index} item={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className="true-ending-credits-scene__skip">
        <span>{credits.speedHint}</span>
        <div className="true-ending-credits-scene__skip-bar">
          <span />
        </div>
      </div>

      {hasReachedEnd ? (
        <div className="true-ending-credits-scene__final" aria-live="polite">
          <img
            alt="청령차사"
            className="true-ending-credits-scene__final-portrait"
            src={chasaImage}
          />
          <p>{credits.title}</p>
        </div>
      ) : null}
    </section>
  );
}

function CreditItem({
  index,
  item,
}: {
  index: number;
  item: TrueEndingCreditItem;
}) {
  if (item.type === "message") {
    return (
      <section className="true-ending-credits-scene__dedication">
        {item.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>
    );
  }

  return (
    <article
      className={[
        "true-ending-credits-scene__memory",
        `true-ending-credits-scene__memory--${index % 2 === 0 ? "left" : "right"}`,
        `true-ending-credits-scene__memory--tone-${index % 4}`,
        item.type === "article" ? "true-ending-credits-scene__memory--article" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="true-ending-credits-scene__image-wrap">
        <img
          alt={item.imageAlt}
          className="true-ending-credits-scene__image"
          src={item.imageSrc}
        />
      </div>
    </article>
  );
}
