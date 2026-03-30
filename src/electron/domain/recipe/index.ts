export interface IRecipe {
  id: string;
  title: string;
}

export interface IRecipeRepository {
  add(recipe: IRecipe): undefined;
  remove(id: string): undefined;
}
