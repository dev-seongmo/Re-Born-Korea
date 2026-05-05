import type { EventCard } from "../../core/gameTypes";
import { comparisonEvents } from "./comparison";
import { familyEvents } from "./family";
import { friendshipEvents } from "./friendship";
import { mentalEvents } from "./mental";
import { moneyEvents } from "./money";
import { recoveryEvents } from "./recovery";
import { specEvents } from "./spec";

export const prototypeEvents: EventCard[] = [
  ...comparisonEvents,
  ...familyEvents,
  ...friendshipEvents,
  ...moneyEvents,
  ...specEvents,
  ...mentalEvents,
  ...recoveryEvents,
];

export function getNextPrototypeEvent(usedEventIds: string[]): EventCard {
  const unusedEvents = prototypeEvents.filter(
    (event) => !usedEventIds.includes(event.id),
  );

  const pool = unusedEvents.length > 0 ? unusedEvents : prototypeEvents;
  return pool[Math.floor(Math.random() * pool.length)];
}
