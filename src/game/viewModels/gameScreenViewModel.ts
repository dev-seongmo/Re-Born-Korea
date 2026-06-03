import type { EventCard, EventChoice } from "../core/gameTypes";

export type StatusItemViewModel = {
  key: string;
  label: string;
  value: number;
};

export type EndingPanelViewModel = {
  eyebrow: string;
  title: string;
  outcome: "employed" | "failed";
  sender: string;
  receivedAt: string;
  messageLines: string[];
  metricLines: string[];
  nextLabel: string;
  onContinue: () => void;
};

export type GameOverPanelViewModel = {
  eyebrow: string;
  title: string;
  summary: string;
  description: string[];
  metricLabel: string;
  metricValue: number;
  nextLabel: string;
  onContinue: () => void;
};

export type AtmosphereEffect = "tutorial-fog" | "fog-clearing";

export type EventPanelViewModel = {
  narrativeText: string;
  event: EventCard;
  disabled?: boolean;
  continueLabel?: string;
  onContinue?: () => void;
  onResolveChoice: (choice: EventChoice) => void;
};

export type GameScreenViewModel = {
  statusItems: StatusItemViewModel[];
  atmosphere?: AtmosphereEffect;
  endingPanel?: EndingPanelViewModel;
  gameOverPanel?: GameOverPanelViewModel;
  eventPanel?: EventPanelViewModel;
};
