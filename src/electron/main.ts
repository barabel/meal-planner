import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import Store from 'electron-store';
import { RecipeStoreRepository } from './repository/recipe/electron-store/recipe-store';
import type { StoreSchema } from './repository/recipe/electron-store/types';
import { RecipeService } from './services/recipe';
import { RecipeController } from './controllers/recipe';
import './api';

const isDev = process.env.DEV != undefined;
const isPreview = process.env.PREVIEW != undefined;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 730,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');

    mainWindow.webContents.openDevTools();
  }
  else if (isPreview) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('dist/index.html');
  }
  else {
    mainWindow.loadFile('dist/index.html');
  }
}

app.whenReady().then(() => {
  const store = new Store<StoreSchema>({
    name: 'recipes',
    defaults: { recipes: [] },
  });

  const recipeRepository = new RecipeStoreRepository(store);
  const recipeSerive = new RecipeService(recipeRepository);
  new RecipeController(recipeSerive);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
