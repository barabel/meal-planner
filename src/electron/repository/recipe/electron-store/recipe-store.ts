import Store from 'electron-store';
import type { IRecipe, IRecipeRepository } from '@-electron/domain/recipe';
import type { StoreSchema } from './types';

export class RecipeStoreRepository implements IRecipeRepository {
  private readonly store: Store<StoreSchema>;

  constructor(store: Store<StoreSchema>) {
    this.store = store;
  }

  getAll = (): IRecipe[] => {
    return this.store.get('recipes');
  };

  add = (recipe: IRecipe): undefined => {
    const recipes = this.getAll();

    this.store.set('recipes', [...recipes, recipe]);
  };

  remove = (id: string): undefined => {
    const recipes = this.getAll();

    this.store.set('recipes', recipes.filter(recipe => recipe.id !== id));
  };
}
