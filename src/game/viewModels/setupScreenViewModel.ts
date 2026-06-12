export type SetupFieldKey = "name" | "targetCompany";

export type SetupFieldViewModel = {
  key: SetupFieldKey;
  label: string;
  placeholder: string;
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
