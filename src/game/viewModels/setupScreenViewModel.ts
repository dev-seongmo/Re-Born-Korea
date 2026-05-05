export type SetupFieldKey =
  | "name"
  | "friendName"
  | "favoriteFood"
  | "favoritePlace"
  | "cherishedThing"
  | "comfortingWords";

export type SetupFieldViewModel = {
  key: SetupFieldKey;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export type SetupScreenViewModel = {
  title: string;
  description: string;
  startLabel: string;
  canStart: boolean;
  fields: SetupFieldViewModel[];
  onStart: () => void;
};
