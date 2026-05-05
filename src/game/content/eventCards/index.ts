import type { EventCard } from "../../core/gameTypes";
import { comparisonEvents } from "./comparison";
import { familyEvents } from "./family";
import { friendshipEvents } from "./friendship";

export const prototypeEvents: EventCard[] = [
  ...comparisonEvents,
  ...familyEvents,
  ...friendshipEvents,
];

export function getNextPrototypeEvent(usedEventIds: string[]): EventCard {
  const unusedEvents = prototypeEvents.filter(
    (event) => !usedEventIds.includes(event.id),
  );

  const pool = unusedEvents.length > 0 ? unusedEvents : prototypeEvents;
  return pool[Math.floor(Math.random() * pool.length)];
}
