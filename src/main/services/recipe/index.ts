import type { ICreateRecipeDto, IRecipe, IRecipeRepository } from '@-electron/domain/recipe';

export class RecipeService {
  private readonly repository: IRecipeRepository;

  constructor(repository: IRecipeRepository) {
    this.repository = repository;
  }

  getAll = (): IRecipe[] => {
    return this.repository.getAll();
  };

  add = (dto: ICreateRecipeDto): IRecipe => {
    return this.repository.add(dto);
  };

  remove = (id: string): void => {
    this.repository.remove(id);
  };
}
