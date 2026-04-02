export type TSelectOption = {
  label: string;
  value: string;
};

export type TSelect = {
  name?: string;
  options?: TSelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
