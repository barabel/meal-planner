import { ElectronAPI } from '@electron-toolkit/preload';
import { ICreateRecipeDto, IRecipe } from '@shared/types/recipe';

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
