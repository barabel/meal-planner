import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      recipes: {
        getAll: () => { id: string; title: string }[];
        add: (title: string) => Promise<{ id: string; title: string }>;
        remove: (id: string) => Promise<void>;
      };
    };
  }
}
