import type { EventCard } from "../../core/gameTypes";
import { comparisonEvents } from "./comparison";
import { familyEvents } from "./family";
import { friendshipEvents } from "./friendship";
import { mentalEvents } from "./mental";
import { moneyEvents } from "./money";
import { recoveryEvents } from "./recovery";
import { specEvents } from "./spec";
import { tutorialEvents } from "./tutorial";

export const prototypeEvents: EventCard[] = [
  ...tutorialEvents,
  ...comparisonEvents,
  ...familyEvents,
  ...friendshipEvents,
  ...moneyEvents,
  ...specEvents,
  ...mentalEvents,
  ...recoveryEvents,
];

const eventRegistry = new Map(
  prototypeEvents.map((event) => [event.id, event] as const),
);

const tutorialEventIds = tutorialEvents.map((event) => event.id);

export function getNextPrototypeEvent(usedEventIds: string[]): EventCard {
  const nextTutorialEventId = tutorialEventIds.find(
    (eventId) => !usedEventIds.includes(eventId),
  );

  if (nextTutorialEventId) {
    return eventRegistry.get(nextTutorialEventId) as EventCard;
  }

  const unusedEvents = prototypeEvents.filter(
    (event) =>
      event.category !== "tutorial" && !usedEventIds.includes(event.id),
  );

  const nonTutorialEvents = prototypeEvents.filter(
    (event) => event.category !== "tutorial",
  );
  const pool = unusedEvents.length > 0 ? unusedEvents : nonTutorialEvents;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPrototypeEventById(eventId: string) {
  return eventRegistry.get(eventId) ?? null;
}

export function drawNextPrototypeEventId(usedEventIds: string[]) {
  return getNextPrototypeEvent(usedEventIds).id;
}
