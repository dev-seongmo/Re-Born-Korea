import { useEffect, useRef, useState } from "react";

type DdayCalendarProps = {
  daysLeft: number;
};

function getUrgencyClass(daysLeft: number) {
  if (daysLeft <= 3) {
    return "dday-calendar--urgent";
  }

  if (daysLeft <= 7) {
    return "dday-calendar--warning";
  }

  return "dday-calendar--steady";
}

export function DdayCalendar({ daysLeft }: DdayCalendarProps) {
  const previousDaysLeftRef = useRef(daysLeft);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (previousDaysLeftRef.current === daysLeft) {
      return undefined;
    }

    previousDaysLeftRef.current = daysLeft;
    setIsFlipping(true);

    const timeoutId = window.setTimeout(() => {
      setIsFlipping(false);
    }, 620);

    return () => window.clearTimeout(timeoutId);
  }, [daysLeft]);

  return (
    <div
      aria-label={`면접까지 D-${daysLeft}`}
      className={[
        "dday-calendar",
        getUrgencyClass(daysLeft),
        isFlipping ? "dday-calendar--flipping" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dday-calendar__rings" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="dday-calendar__header">D-DAY</div>
      <div className="dday-calendar__page">
        <span className="dday-calendar__label">면접까지</span>
        <strong>D-{daysLeft}</strong>
      </div>
    </div>
  );
}
