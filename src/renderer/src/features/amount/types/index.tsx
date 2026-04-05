export type TAmount = {
  amount: string;
  unit: string;
  onChange: (params: { amount: string; unit: string }) => void;
  errors?: { amount?: string; unit?: string };
};
