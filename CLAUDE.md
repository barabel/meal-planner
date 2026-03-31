# CLAUDE.md

Инструкции для Claude Code при работе с этим репозиторием.

## Команды

```bash
npm run dev        # запуск Vite dev-сервера + Electron (hot reload)
npm run preview    # сборка фронтенда, компиляция electron, запуск с DevTools
npm run build      # продакшн-сборка + electron-forge package
npm run lint       # проверка ESLint
npm run lint-fix   # автоисправление ESLint
```

## Архитектура

Electron-приложение с React-фронтендом. Два отдельных таргета компиляции:

- **Frontend** — Vite собирает `src/frontend/` → `dist/index.html`
- **Electron main process** — tsc компилирует `src/electron/` → `dist/main.js`

В dev-режиме Electron загружает `http://localhost:5173`; в prod — `dist/index.html`.

### IPC-паттерн

- `src/electron/api.ts` — регистрирует обработчики `ipcMain.handle`
- `src/electron/preload.ts` — открывает обработчики рендереру через `contextBridge.exposeInMainWorld('backend', ...)`
- `src/electron/globals.d.ts` — типы для `window.backend`

Новый IPC-канал: добавить обработчик в `api.ts`, открыть в `preload.ts`, типизировать в `globals.d.ts`.

### Слои Electron-бэкенда

```
src/electron/
  domain/     # Интерфейсы и чистые типы (напр. IRecipe, IRecipeRepository)
  services/   # Бизнес-логика, зависит только от доменных интерфейсов
  repository/ # Реализации (сейчас на основе electron-store)
```

Данные хранятся в `electron-store`. Репозитории реализуют доменные интерфейсы; сервисы получают репозитории через constructor injection.

### Структура фронтенда (Feature-Sliced Design)

```
src/frontend/
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

- алиас `@/` → `src/frontend/`; `@-electron/` → `src/electron/`; `~/` → корень репо
- глобальный тип `FCClass<P>` — FC, всегда принимающий `className` и `children`
- `classix` (`cx(...)`) для условного слияния классов
- роутинг через `HashRouter` (требуется для file-протокола Electron)
- i18n: только русский (`lng: 'ru'`), ключи в `src/frontend/locales/ru.json`
- стили: Tailwind v4 (CSS-first конфиг) + SCSS-модули в `assets/styles/`
