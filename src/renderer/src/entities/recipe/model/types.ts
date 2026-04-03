import type { ICreateRecipeDto, IRecipe } from '@shared/types/recipe';

export type TRecipesStore = {
  recipes: IRecipe[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
  addRecipe: (dto: ICreateRecipeDto) => Promise<void>;
  removeRecipe: (id: string) => Promise<void>;
};
