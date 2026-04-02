import { Conf } from 'electron-conf/main';
import type { ICreateRecipeDto, IRecipe, IRecipeRepository } from '@-electron/domain/recipe';
import crypto from 'node:crypto';
import type { StoreSchema } from './types';

export class RecipeStoreRepository implements IRecipeRepository {
  private readonly store: Conf<StoreSchema>;

  constructor(store: Conf<StoreSchema>) {
    this.store = store;
  }

  getAll = (): IRecipe[] => {
    return this.store.get('recipes');
  };

  add = (dto: ICreateRecipeDto): IRecipe => {
    const recipe = {
      id: crypto.randomUUID(),
      ...dto,
    };

    const recipes = this.getAll();

    this.store.set('recipes', [...recipes, recipe]);

    return recipe;
  };

  remove = (id: string): void => {
    const recipes = this.getAll();

    this.store.set('recipes', recipes.filter(recipe => recipe.id !== id));
  };
}
