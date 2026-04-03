export type { IRecipe, ICreateRecipeDto, IRecipeIngredient } from '@shared/types/recipe';

import type { IRecipe, ICreateRecipeDto } from '@shared/types/recipe';

export interface IRecipeRepository {
  getAll(): IRecipe[];
  add(dto: ICreateRecipeDto): IRecipe;
  remove(id: string): void;
}
