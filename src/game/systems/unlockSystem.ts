import type { UnlockCardId } from "../core/gameTypes";

type ResolveUnlockCardsInput = {
  eventId: string;
  choiceId: string;
  unlockedCardIds: UnlockCardId[];
};

export function resolveUnlockCardsFromChoice(
  _input: ResolveUnlockCardsInput,
): UnlockCardId[] {
  // Choice-to-card wiring is intentionally deferred.
  // This placeholder keeps the unlock flow isolated from the reducer.
  return [];
}
