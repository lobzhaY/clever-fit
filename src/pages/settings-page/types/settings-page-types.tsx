export type FieldData = {
  name: string[];
  value?: string | boolean;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
};

export type PeriodsType = {
  cost: number;
  days: number;
  text: string;
};
