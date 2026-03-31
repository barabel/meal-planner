---
name: Project Overview
description: Architecture, stack, and domain structure of the meal-planner Electron app
type: project
---

## Stack
- **Electron** + electron-vite (three targets: main, preload, renderer)
- **React** 19 + React Router 7 (HashRouter)
- **TypeScript** 5.9 strict mode
- **Vite** as bundler (renderer) via electron-vite
- **Tailwind CSS** 4 + SCSS
- **i18next** 26 + react-i18next — single locale `ru`, hardcoded
- **electron-store** 11 for persistence
- **classix** for conditional className merging

## Architecture
Feature-Sliced Design (FSD-like):
- `src/renderer/src/` — React app
  - `app/` — App.tsx (routes), layouts
  - `pages/` — page components
  - `widgets/` — navbar, week grid
  - `entities/` — CardDay etc.
  - `shared/` — ui, config/routes
  - `locales/ru.json` — translations
- `src/main/` — Electron main process
  - `index.ts` — BrowserWindow entry
  - `controllers/` — IPC handlers (ipcMain.handle)
  - `ipc-channels.ts` — channel name constants
  - `repository/` — electron-store implementations
  - `domain/` — interfaces (IRecipe etc.)
  - `services/` — business logic (DI pattern)
- `src/preload/` — contextBridge (`window.api`, `window.electron`)

## Key conventions
- Path aliases: `@` → `src/renderer/src`, `@-electron` → `src/main`, `~` → root
- Custom `FCClass` type (adds optional `className` + children to React.FC)
- Barrel exports via `index.tsx` in each component folder

## Current status (as of 2026-03-31)
Early-stage MVP — migrated to electron-vite build tooling.
