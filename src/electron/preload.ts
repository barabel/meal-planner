import { contextBridge, ipcRenderer } from 'electron';
import { RECIPES } from './ipc-channels';

export const backend = {
  recipes: {
    getAll: () => ipcRenderer.invoke(RECIPES.GET_ALL),
    add: (title: string) => ipcRenderer.invoke(RECIPES.ADD, title),
    remove: (id: string) => ipcRenderer.invoke(RECIPES.REMOVE, id),
  },
};

contextBridge.exposeInMainWorld('backend', backend);
