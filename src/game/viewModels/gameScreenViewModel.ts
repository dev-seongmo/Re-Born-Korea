import type { EventCard, EventChoice } from "../core/gameTypes";

export type StatusItemViewModel = {
  key: string;
  label: string;
  value: number;
};

export type EndingPanelViewModel = {
  eyebrow: string;
  title: string;
  summary: string;
  reveal: string;
  coda: string;
  nextLabel: string;
  onContinue: () => void;
};

export type EventPanelViewModel = {
  narrativeText: string;
  event: EventCard;
  disabled?: boolean;
  continueLabel?: string;
  onContinue?: () => void;
  onResolveChoice: (choice: EventChoice) => void;
};

export type GameScreenViewModel = {
  turnLabel: string;
  currentLabel: string;
  statusItems: StatusItemViewModel[];
  endingPanel?: EndingPanelViewModel;
  eventPanel?: EventPanelViewModel;
};
