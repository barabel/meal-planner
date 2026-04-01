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
  pages/        # Компоненты страниц (уровень роутов)
  widgets/      # Составные UI-блоки (navbar, week)
  entities/     # Бизнес-сущности (cards/day)
  shared/       # Конфиг (роуты), переиспользуемый UI (кнопки)
  assets/       # SCSS + Tailwind-тема
  locales/      # i18n JSON (пока только ru)
```

Каждый слой экспортирует через barrel `index.tsx`.

## Контекст разработчика

- Новичок в бэкенд-архитектуре; этот проект — pet project для её изучения (DDD, onion, репозитории, сервисы)
- Долгосрочная цель: мигрировать с electron-store на web API и захостить как веб-приложение

### Ключевые соглашения

- алиас `@/` → `src/renderer/src/`; `@-electron/` → `src/main/`; `~/` → корень репо
- глобальный тип `FCClass<P>` — FC, всегда принимающий `className` и `children`
- `classix` (`cx(...)`) для условного слияния классов
- роутинг через `HashRouter` (требуется для file-протокола Electron)
- i18n: только русский (`lng: 'ru'`), ключи в `src/renderer/src/locales/ru.json`
- стили: Tailwind v4 (CSS-first конфиг) + SCSS-модули в `assets/styles/`

## Планы
В конце каждого плана предоставь мне список не решенных вопросов, если есть. Предоставь эти вопросы максимально кратко, грамматикой можно жертвовать ради лаконичности
