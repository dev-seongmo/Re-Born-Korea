import type { EventCard } from "../../core/gameTypes";
import { comparisonEvents } from "./comparison";
import { familyEvents } from "./family";
import { friendshipEvents } from "./friendship";
import {
  girlfriendEventSchedule,
  girlfriendEvents,
} from "./girlfriend";
import { interviewEvents } from "./interview";
import { mentalEvents } from "./mental";
import { moneyEvents } from "./money";
import { recoveryEvents } from "./recovery";
import { specEvents } from "./spec";
import { firstClearTutorialEvents } from "./tutorial_first_clear";
import { defaultLoopTutorialEvents } from "./tutorial_default";
import { secondLifeTutorialEvents } from "./tutorial_second";
import { tutorialEvents } from "./tutorial";
import type { GirlfriendStatus } from "../../core/gameTypes";

export const prototypeEvents: EventCard[] = [
  ...tutorialEvents,
  ...secondLifeTutorialEvents,
  ...firstClearTutorialEvents,
  ...defaultLoopTutorialEvents,
  ...girlfriendEvents,
  ...interviewEvents,
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

export const tutorialEventIds = tutorialEvents.map((event) => event.id);
export const secondLifeTutorialEventIds = secondLifeTutorialEvents.map(
  (event) => event.id,
);
export const firstClearTutorialEventIds = firstClearTutorialEvents.map(
  (event) => event.id,
);
export const defaultLoopTutorialEventIds = defaultLoopTutorialEvents.map(
  (event) => event.id,
);
export const girlfriendEventIds = girlfriendEvents.map((event) => event.id);
export { finalInterviewEventId } from "./interview";

export function getTutorialEventIdsForRun(
  completedRunCount: number,
  pendingFirstClearTutorial: boolean,
) {
  if (pendingFirstClearTutorial) {
    return firstClearTutorialEventIds;
  }

  if (completedRunCount === 0) {
    return tutorialEventIds;
  }

  if (completedRunCount === 1) {
    return secondLifeTutorialEventIds;
  }

  return defaultLoopTutorialEventIds;
}

export function isTutorialEventId(eventId: string) {
  return (
    tutorialEventIds.includes(eventId) ||
    secondLifeTutorialEventIds.includes(eventId) ||
    firstClearTutorialEventIds.includes(eventId) ||
    defaultLoopTutorialEventIds.includes(eventId)
  );
}

export function isFirstClearTutorialEventId(eventId: string) {
  return firstClearTutorialEventIds.includes(eventId);
}

function getScheduledGirlfriendEventId(params: {
  nextTurn: number;
  usedEventIds: string[];
  girlfriendStatus: GirlfriendStatus;
}) {
  const scheduledEvent = girlfriendEventSchedule.find(
    (event) =>
      event.turn === params.nextTurn &&
      !params.usedEventIds.includes(event.eventId) &&
      event.allowedStatuses.includes(params.girlfriendStatus),
  );

  return scheduledEvent?.eventId ?? null;
}

export function hasRemainingTutorialEvents(
  usedEventIds: string[],
  completedRunCount: number,
  pendingFirstClearTutorial: boolean,
) {
  return getTutorialEventIdsForRun(
    completedRunCount,
    pendingFirstClearTutorial,
  ).some(
    (eventId) => !usedEventIds.includes(eventId),
  );
}

export function getNextPrototypeEvent(
  usedEventIds: string[],
  completedRunCount: number,
  pendingFirstClearTutorial: boolean,
  options: {
    nextTurn?: number;
    girlfriendStatus?: GirlfriendStatus;
    phase2Unlocked?: boolean;
  } = {},
): EventCard {
  const hasConsumedFirstClearTutorial = firstClearTutorialEventIds.some((eventId) =>
    usedEventIds.includes(eventId),
  );
  const shouldSkipFurtherTutorials =
    hasConsumedFirstClearTutorial && !pendingFirstClearTutorial;
  const activeTutorialEventIds = shouldSkipFurtherTutorials
    ? []
    : getTutorialEventIdsForRun(completedRunCount, pendingFirstClearTutorial);
  const nextTutorialEventId = activeTutorialEventIds.find(
    (eventId) => !usedEventIds.includes(eventId),
  );

  if (nextTutorialEventId) {
    return eventRegistry.get(nextTutorialEventId) as EventCard;
  }

  const scheduledGirlfriendEventId =
    options.phase2Unlocked &&
    options.nextTurn !== undefined &&
    options.girlfriendStatus
      ? getScheduledGirlfriendEventId({
          nextTurn: options.nextTurn,
          usedEventIds,
          girlfriendStatus: options.girlfriendStatus,
        })
      : null;

  if (scheduledGirlfriendEventId) {
    return eventRegistry.get(scheduledGirlfriendEventId) as EventCard;
  }

  const unusedEvents = prototypeEvents.filter(
    (event) =>
      event.category !== "tutorial" &&
      event.category !== "interview" &&
      event.category !== "girlfriend" &&
      !usedEventIds.includes(event.id),
  );

  const nonTutorialEvents = prototypeEvents.filter(
    (event) =>
      event.category !== "tutorial" &&
      event.category !== "interview" &&
      event.category !== "girlfriend",
  );
  const pool = unusedEvents.length > 0 ? unusedEvents : nonTutorialEvents;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPrototypeEventById(eventId: string) {
  return eventRegistry.get(eventId) ?? null;
}

export function drawNextPrototypeEventId(
  usedEventIds: string[],
  completedRunCount: number,
  pendingFirstClearTutorial: boolean,
  options?: {
    nextTurn?: number;
    girlfriendStatus?: GirlfriendStatus;
    phase2Unlocked?: boolean;
  },
) {
  return getNextPrototypeEvent(
    usedEventIds,
    completedRunCount,
    pendingFirstClearTutorial,
    options,
  ).id;
}
