import { ElectronAPI } from '@electron-toolkit/preload';
import { ICreateRecipeDto, IRecipe } from 'src/main/domain/recipe/index';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      recipes: {
        getAll: () => IRecipe[];
        add: (dto: ICreateRecipeDto) => IRecipe;
        remove: (id: string) => void;
      };
    };
  }
}
