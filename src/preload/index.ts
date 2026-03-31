import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { RECIPES } from '../main/ipc-channels';

// Кастомное API для рендерера
const api = {
  recipes: {
    getAll: () => ipcRenderer.invoke(RECIPES.GET_ALL),
    add: (title: string) => ipcRenderer.invoke(RECIPES.ADD, title),
    remove: (id: string) => ipcRenderer.invoke(RECIPES.REMOVE, id),
  },
};

// Если включена изоляция контекста — открываем API через contextBridge,
// иначе напрямую добавляем в глобальный объект window.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  }
  catch (error) {
    console.error(error);
  }
}
else {
  // @ts-ignore (определено в .d.ts)
  window.electron = electronAPI;
  // @ts-ignore (определено в .d.ts)
  window.api = api;
}
