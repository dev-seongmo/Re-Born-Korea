import { useEffect, useState } from "react";
import { SwipeChoiceCard } from "../game/SwipeChoiceCard";
import type { EventCard, EventChoice } from "../../game/core/gameTypes";
import type {
  TrueEndingStoryCard,
  TrueEndingStoryChoice,
} from "../../game/content/trueEnding";

type TrueEndingStoryScreenProps = {
  card: TrueEndingStoryCard;
  currentIndex: number;
  total: number;
  onNext: () => void;
};

function buildChoice(params: {
  id: string;
  label: string;
  resultText: string;
}): EventChoice {
  return {
    id: params.id,
    label: params.label,
    immediate: {},
    selfTrustDelta: 0,
    primaryStat: "mental",
    modifier: 0,
    results: {
      bad: { text: params.resultText },
      mixed: { text: params.resultText },
      good: { text: params.resultText },
    },
  };
}

function buildStoryEvent(params: {
  card: TrueEndingStoryCard;
  selectedChoice: TrueEndingStoryChoice | null;
}): EventCard {
  const { card, selectedChoice } = params;
  const text = selectedChoice?.resultText ?? card.text;

  return {
    id: card.id,
    characterName: card.characterName,
    category: "tutorial",
    phase: "late20s",
    text,
    imageSrc: card.imageSrc,
    choices: selectedChoice
      ? [
          buildChoice({
            id: `${card.id}-continue-right`,
            label: "다음으로",
            resultText: text,
          }),
          buildChoice({
            id: `${card.id}-continue-left`,
            label: "계속 본다",
            resultText: text,
          }),
        ]
      : [
          buildChoice({
            id: card.choices.right.id,
            label: card.choices.right.label,
            resultText: card.choices.right.resultText,
          }),
          buildChoice({
            id: card.choices.left.id,
            label: card.choices.left.label,
            resultText: card.choices.left.resultText,
          }),
        ],
  };
}

export function TrueEndingStoryScreen({
  card,
  currentIndex,
  total,
  onNext,
}: TrueEndingStoryScreenProps) {
  const [selectedChoice, setSelectedChoice] =
    useState<TrueEndingStoryChoice | null>(null);
  const storyEvent = buildStoryEvent({ card, selectedChoice });
  const text = selectedChoice?.resultText ?? card.text;

  useEffect(() => {
    setSelectedChoice(null);
  }, [card.id]);

  function handleResolve(choice: EventChoice) {
    if (selectedChoice) {
      onNext();
      return;
    }

    setSelectedChoice(
      choice.id === card.choices.left.id
        ? card.choices.left
        : card.choices.right,
    );
  }

  return (
    <section className="panel true-ending-story">
      <div className="true-ending-story__progress">
        <span>{card.characterName}</span>
        <span>
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="event-card true-ending-story__swipe-card">
        <SwipeChoiceCard
          continueLabel={card.characterName}
          event={storyEvent}
          narrativeText={text}
          onResolve={handleResolve}
        />
      </div>
    </section>
  );
}
