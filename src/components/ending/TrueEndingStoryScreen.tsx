import { SwipeChoiceCard } from "../game/SwipeChoiceCard";
import type { EventCard } from "../../game/core/gameTypes";
import type { TrueEndingStoryCard } from "../../game/content/trueEnding";

type TrueEndingStoryScreenProps = {
  card: TrueEndingStoryCard;
  currentIndex: number;
  total: number;
  onNext: () => void;
};

function buildStoryEvent(card: TrueEndingStoryCard): EventCard {
  return {
    id: card.id,
    characterName: card.speaker,
    category: "tutorial",
    phase: "late20s",
    text: card.text,
    choices: [
      {
        id: `${card.id}-right`,
        label: card.rightLabel,
        immediate: {},
        selfTrustDelta: 0,
        primaryStat: "mental",
        modifier: 0,
        results: {
          bad: { text: card.text },
          mixed: { text: card.text },
          good: { text: card.text },
        },
      },
      {
        id: `${card.id}-left`,
        label: card.leftLabel,
        immediate: {},
        selfTrustDelta: 0,
        primaryStat: "mental",
        modifier: 0,
        results: {
          bad: { text: card.text },
          mixed: { text: card.text },
          good: { text: card.text },
        },
      },
    ],
  };
}

export function TrueEndingStoryScreen({
  card,
  currentIndex,
  total,
  onNext,
}: TrueEndingStoryScreenProps) {
  const storyEvent = buildStoryEvent(card);

  return (
    <section className="panel true-ending-story">
      <div className="true-ending-story__progress">
        <span>{card.eyebrow}</span>
        <span>
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="event-card true-ending-story__swipe-card">
        <SwipeChoiceCard
          continueLabel={card.speaker}
          disabled
          event={storyEvent}
          narrativeText={card.text}
          onContinue={onNext}
          onResolve={() => undefined}
        />
      </div>
    </section>
  );
}
