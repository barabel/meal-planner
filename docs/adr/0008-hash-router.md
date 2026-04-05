# ADR-008: HashRouter вместо BrowserRouter

## Статус
Принято

## Контекст
Приложение использует React Router. В prod-режиме Electron загружает фронтенд как `file:///path/to/index.html`. BrowserRouter ожидает серверной обработки URL — при переходе на `/recipes` сервера нет, файла тоже.

## Решение
`HashRouter` — URL хранится в части после `#`, например `file:///index.html#/recipes`. Браузер (и Electron) не отправляет хэш-часть никуда, React Router читает её сам.

```tsx
<HashRouter>
  <Routes>
    <Route path="/" element={<LayoutIndex />}>
      <Route index element={<MainPage />} />
      <Route path="/recipes" element={<RecipePage />} />
    </Route>
  </Routes>
</HashRouter>
```

## Альтернативы
- **BrowserRouter** — работает в dev (ELECTRON_RENDERER_URL), ломается в prod
- **MemoryRouter** — нет отражения маршрута в URL, нельзя использовать DevTools для навигации

## Последствия
**Плюсы:** работает в prod без серверной настройки; работает и в dev-режиме

**Минусы:** URL выглядит как `#/recipes` — некрасиво, но в desktop-приложении это не важно

**Когда пересмотреть:** при миграции на веб — заменить на BrowserRouter (или использовать фреймворк с file-based роутингом)
