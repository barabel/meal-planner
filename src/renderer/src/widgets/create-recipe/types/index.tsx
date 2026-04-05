export type TCreateRecipeIngredient = {
  title: string;
  amount: string;
  unit: string;
};

export type TCreateRecipeIngredientComp = {
  index: number;
  placeholderTitle?: string;
  onDelete?: () => void;
};

export type TCreateRecipeForm = {
  title: string;
  ingredients: TCreateRecipeIngredient[];
};
