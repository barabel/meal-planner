interface IRecipeIngredient {
  title: string;
  amount: string;
  unit: string;
}

export interface IRecipe {
  id: string;
  title: string;
  ingredients: IRecipeIngredient[];
}

export interface ICreateRecipeDto {
  title: string;
  ingredients: IRecipeIngredient[];
}

export interface IRecipeRepository {
  getAll(): IRecipe[];
  add(dto: ICreateRecipeDto): IRecipe;
  remove(id: string): void;
}
