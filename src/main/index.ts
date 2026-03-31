import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

function createWindow(): void {
  // Создаём окно браузера.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 730,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR для рендерера на основе electron-vite cli.
  // В разработке загружаем удалённый URL, в продакшне — локальный html.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  }
  else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// Вызывается когда Electron завершил инициализацию
// и готов создавать окна. Некоторые API доступны только после этого.
app.whenReady().then(() => {
  // Устанавливаем app user model id для Windows
  electronApp.setAppUserModelId('com.electron');

  // В разработке F12 открывает/закрывает DevTools,
  // в продакшне игнорируем CommandOrControl+R.
  // см. https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Тест IPC
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // На macOS принято пересоздавать окно при клике на иконку в доке,
    // если нет других открытых окон.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Выходим когда все окна закрыты, кроме macOS — там приложение
// остаётся активным пока пользователь явно не выйдет через Cmd+Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Здесь можно добавить остальной код главного процесса
// или вынести его в отдельные файлы и подключить здесь.
