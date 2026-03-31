import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@-electron': resolve('src/main'),
      },
    },
  },
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@-electron': resolve('src/main'),
      },
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
  },
});
