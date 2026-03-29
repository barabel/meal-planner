import { ipcMain } from 'electron';

ipcMain.handle(
  'node-version',
  () => {
    return process.versions.node;
  },
);
