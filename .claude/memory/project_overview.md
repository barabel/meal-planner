---
name: Project Overview
description: Architecture, stack, and domain structure of the meal-planner Electron app
type: project
---

## Stack
- **Electron** 41 + Electron Forge 7 (Vite plugin)
- **React** 19 + React Router 7 (HashRouter)
- **TypeScript** 5.9 strict mode
- **Vite** 8 as bundler (frontend) + tsc for Electron process
- **Tailwind CSS** 4 + SCSS (custom font: Halvar Mittel)
- **i18next** 26 + react-i18next — single locale `ru`, hardcoded
- **electron-store** 11 for persistence
- **classix** for conditional className merging

## Architecture
Feature-Sliced Design (FSD-like):
- `src/frontend/` — React app
  - `app/` — App.tsx (routes), layouts/index (Navbar + Outlet)
  - `pages/main/` — Week view (main meal planning page)
  - `pages/recipe/` — Recipe form page
  - `widgets/navbar/` — navigation
  - `widgets/week/` — 7-day grid
  - `entities/cards/day/` — CardDay component
  - `shared/ui/buttons/button/` — Button (renders Link or button depending on `url` prop)
  - `shared/config/routes.ts` — route constants
  - `locales/ru.json` — translations
  - `i18n.ts` — i18next init
- `src/electron/` — Main process
  - `main.ts` — BrowserWindow (1440x730), loads localhost:5173 in dev
  - `preload.ts` — contextBridge exposing `window.backend`
  - `api.ts` — IPC handlers
  - `repository/recipe/` — RecipeStoreRepository (electron-store)
  - `domain/recipe/` — IRecipe { id, title }
  - `services/recipe/` — RecipeService (DI pattern)

## Key conventions
- Barrel exports via `index.ts` in each component folder
- Component structure: `index.tsx` (export) + `ui/component.tsx` + optional `types/`
- Custom `FCClass` type (adds optional `className` + children to React.FC)
- Path aliases: `@` → `src/frontend`, `@-electron` → `src/electron`, `~` → root
- Spacing base unit: 0.0625rem
- Breakpoints: 375 / 768 / 1024 / 1280 / 1440 / 1600px

## Current status (as of 2026-03-30)
Early-stage MVP — structure is clean but features are shells:
- Recipe form has no submit logic
- CardDay shows empty days, no meal assignment
- No IPC connection between frontend and RecipeService
- Single language (ru), no language switching

## Open TODOs in code
- FIXME: add icons to Button component
- Connect RecipeService to IPC/API layer
- Implement recipe form submission
