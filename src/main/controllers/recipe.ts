import { ICreateRecipeDto } from '@-electron/domain/recipe';
import { RECIPES } from '@-electron/ipc-channels';
import { RecipeService } from '@-electron/services/recipe';
import { ipcMain, type IpcMainInvokeEvent } from 'electron';

export class RecipeController {
  service: RecipeService;

  constructor(service: RecipeService) {
    this.service = service;

    this.register();
  }

  register = () => {
    ipcMain.handle(RECIPES.GET_ALL, this.getAll);
    ipcMain.handle(RECIPES.ADD, this.add);
    ipcMain.handle(RECIPES.REMOVE, this.remove);
  };

  getAll = () => {
    return this.service.getAll();
  };

  add = (_: IpcMainInvokeEvent, dto: ICreateRecipeDto) => {
    return this.service.add(dto);
  };

  remove = (_: IpcMainInvokeEvent, id: string) => {
    this.service.remove(id);
  };
}
