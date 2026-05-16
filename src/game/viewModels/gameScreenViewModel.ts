import type { EventCard, EventChoice } from "../core/gameTypes";

export type StatusItemViewModel = {
  key: string;
  label: string;
  value: number;
};

export type EndingPanelViewModel = {
  title: string;
  summary: string;
  reveal: string;
  coda: string;
};

export type ResultPanelViewModel = {
  text: string;
  nextLabel: string;
  onContinue: () => void;
};

export type EventPanelViewModel = {
  categoryLabel: string;
  title: string;
  event: EventCard;
  onResolveChoice: (choice: EventChoice) => void;
};

export type GameScreenViewModel = {
  turnLabel: string;
  currentLabel: string;
  statusItems: StatusItemViewModel[];
  endingPanel?: EndingPanelViewModel;
  resultPanel?: ResultPanelViewModel;
  eventPanel?: EventPanelViewModel;
};
