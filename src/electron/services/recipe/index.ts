import type { IRecipe, IRecipeRepository } from '@-electron/domain/recipe';

export class RecipeService {
  private readonly repository: IRecipeRepository;

  constructor(repository: IRecipeRepository) {
    this.repository = repository;
  }

  getAll = (): IRecipe[] => {
    return this.repository.getAll();
  };

  add = (title: string): IRecipe => {
    return this.repository.add({ title });
  };

  remove = (id: string): void => {
    this.repository.remove(id);
  };
}
