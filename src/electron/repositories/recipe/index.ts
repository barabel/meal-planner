import type { RecipeModel } from '../../model/recipe';
import type { AddRecipeDto } from './dto/add-recipe';

export interface IRecipeRepository {
  add(dto: AddRecipeDto): RecipeModel;
  remove(id: string): undefined;
};
