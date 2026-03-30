import type { IRecipeRepository } from '@-electron/domain/recipe';

export class RecipeService {
  private readonly repository: IRecipeRepository;

  constructor(repository: IRecipeRepository) {
    this.repository = repository;
  }
}
