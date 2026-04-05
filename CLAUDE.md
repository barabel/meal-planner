# CLAUDE.md

Инструкции для Claude Code при работе с этим репозиторием.

## Команды

```bash
npm run dev          # electron-vite dev (hot reload)
npm run start        # electron-vite preview (prod-сборка + запуск)
npm run build        # typecheck + electron-vite build
npm run build:win    # build + electron-builder --win
npm run typecheck    # tsc для node и web таргетов
npm run lint         # проверка ESLint
npm run lintFix      # ESLint с автоисправлением
npm run test         # vitest (watch)
npm run test:run     # vitest run (один проход)
```

## Архитектура

Electron-приложение с React-фронтендом на базе **electron-vite**. Три таргета:

- **main** — `src/main/` (Electron main process)
- **preload** — `src/preload/` (contextBridge)
- **renderer** — `src/renderer/src/` (React, собирается Vite)

В dev-режиме Electron загружает `ELECTRON_RENDERER_URL`; в prod — `out/renderer/index.html`.

### IPC-паттерн

- `src/main/controllers/` — регистрирует обработчики `ipcMain.handle`
- `src/main/ipc-channels.ts` — константы имён каналов
- `src/preload/index.ts` — открывает API рендереру через `contextBridge.exposeInMainWorld`
- `src/preload/index.d.ts` — типы для `window.api` / `window.electron`

Новый IPC-канал: добавить канал в `ipc-channels.ts`, обработчик в контроллер, открыть в `preload/index.ts`, типизировать в `preload/index.d.ts`.

### Слои Electron-бэкенда

```
src/main/
  domain/       # Интерфейсы и чистые типы (напр. IRecipe, IRecipeRepository)
  services/     # Бизнес-логика, зависит только от доменных интерфейсов
  repository/   # Реализации (сейчас на основе electron-conf)
  controllers/  # IPC-обработчики (регистрируют ipcMain.handle)
```

Данные хранятся в `electron-conf` (пакет `electron-conf`, `Conf` из `electron-conf/main`). Репозитории реализуют доменные интерфейсы; сервисы получают репозитории через constructor injection.

### Структура фронтенда (Feature-Sliced Design)

```
src/renderer/src/
  app/          # Точка входа, роутер, лэйауты
  pages/        # Компоненты страниц (main, recipe)
  widgets/      # Составные UI-блоки (navbar, week, create-recipe)
  features/     # Фичи (amount — ввод количества+единицы)
  entities/     # Бизнес-сущности (cards/day, recipe — useRecipesStore)
  shared/       # Конфиг (роуты), helpers/arrays, UI (button, input, input-wrapper, select), types/recipe
  assets/       # SCSS + Tailwind-тема
  locales/      # i18n JSON (пока только ru)
```

Каждый слой экспортирует через barrel `index.tsx`.

## Стек (актуально)

- Electron 39, electron-vite 5, Vite 7
- React 19, React Router 7, TypeScript 5.9
- Tailwind CSS 4 (CSS-first), SCSS (sass-embedded)
- Zustand 5 — стейт (features/amount, entities/recipe)
- react-hook-form — формы (widgets/create-recipe)
- i18next 26 + react-i18next, только `ru`
- electron-conf 1.3 — персистентность
- Vitest 4 + Testing Library — тесты
- Husky 9 — pre-commit: `vitest run && lint && typecheck && build`

## Домен: Recipe (реализован)

IPC-цепочка полностью готова:
`RecipeStoreRepository` (electron-conf) → `RecipeService` → `RecipeController` → preload → `window.api.recipes`

- каналы: `recipes:getAll`, `recipes:add`, `recipes:remove`
- Типы в `src/shared/types/recipe.ts` (shared между main и renderer):
  - `IRecipe { id: string, title: string, ingredients: IRecipeIngredient[] }`
  - `IRecipeIngredient { title: string, amount: string, unit: string }`
  - `ICreateRecipeDto { title: string, ingredients: IRecipeIngredient[] }`
- `entities/recipe` — Zustand-стор `useRecipesStore`: `fetchAll`, `addRecipe`, `removeRecipe`
- Фронтенд (create-recipe) **подключён** к IPC через `useRecipesStore.addRecipe`; форма на `react-hook-form` + `useFieldArray`

## Контекст разработчика

- Новичок в бэкенд-архитектуре; этот проект — pet project для её изучения (DDD, onion, репозитории, сервисы)
- Долгосрочная цель: мигрировать с electron-conf на web API и захостить как веб-приложение

### Ключевые соглашения

- алиас `@/` → `src/renderer/src/`; `@-electron/` → `src/main/`; `~/` → корень репо
- глобальный тип `FCClass<P>` — FC, всегда принимающий `className` и `children`
- `classix` (`cx(...)`) для условного слияния классов
- роутинг через `HashRouter` (требуется для file-протокола Electron)
- i18n: только русский (`lng: 'ru'`), ключи в `src/renderer/src/locales/ru.json`
- стили: Tailwind v4 (CSS-first конфиг) + SCSS-модули в `assets/styles/`

## Компоненты

COMPONENT_BASE_PATH=src/renderer/src/

## Планы
В конце каждого плана предоставь мне список не решенных вопросов, если есть. Предоставь эти вопросы максимально кратко, грамматикой можно жертвовать ради лаконичности
