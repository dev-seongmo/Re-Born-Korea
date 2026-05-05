import { identityLabels } from "../content/identityLabels";
import type { GameSession } from "../core/gameTypes";

export function getCurrentLabel(session: GameSession) {
  const resolver =
    identityLabels[session.identityStage] ??
    identityLabels[identityLabels.length - 1];

  return resolver({ name: session.profile.name });
}
