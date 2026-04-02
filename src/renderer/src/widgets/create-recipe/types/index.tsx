export type TCreateRecipeIngredient = {
  title: string;
  amount: string;
  unit: string;
};

export type TCreateRecipeIngredientComp = TCreateRecipeIngredient & {
  onChange?: (newValues: Partial<TCreateRecipeIngredient>) => void;
  onDelete?: () => void;
};
