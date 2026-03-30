import type { IRecipeRepository } from '../../repositories/recipe';
import type { AddRecipeDto } from '../../repositories/recipe/dto/add-recipe';

export class RecipeService {
  recipeRepository: IRecipeRepository;

  constructor(
    recipeRepository: IRecipeRepository,
  ) {
    this.recipeRepository = recipeRepository;
  }

  async add(dto: AddRecipeDto) {
    this.recipeRepository.add(dto);
  }

  async remove(id: string) {
    this.recipeRepository.remove(id);
  }
};
