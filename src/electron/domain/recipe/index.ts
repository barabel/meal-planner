export interface IRecipe {
  id: string;
  title: string;
}

export interface ICreateRecipeDto {
  title: string;
}

export interface IRecipeRepository {
  getAll(): IRecipe[];
  add(dto: ICreateRecipeDto): IRecipe;
  remove(id: string): void;
}
