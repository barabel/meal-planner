# ADR-003: contextBridge + preload для IPC

## Статус
Принято

## Контекст
Renderer process (React) должен вызывать операции в main process. Electron предоставляет несколько способов это сделать, с разными компромиссами по безопасности.

## Решение
Использовать `contextBridge` в preload-скрипте, который создаёт явный контракт между main и renderer:

```ts
// preload/index.ts
const api = {
  recipes: {
    getAll: () => ipcRenderer.invoke(RECIPES.GET_ALL),
    add: (dto: ICreateRecipeDto) => ipcRenderer.invoke(RECIPES.ADD, dto),
    remove: (id: string) => ipcRenderer.invoke(RECIPES.REMOVE, id),
  },
};

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api);
} else {
  window.api = api; // fallback для dev без изоляции
}
```

Типы открытого API описаны в `preload/index.d.ts`.

## Альтернативы
- **`nodeIntegration: true`** — прямой доступ к Node.js из renderer, опасно (XSS = RCE)
- **Remote module** — устарел и удалён из современного Electron

## Последствия
**Плюсы:** безопасно (renderer не видит Node.js API); явный контракт; TypeScript-типизация через `.d.ts`

**Минусы:** каждый новый канал требует добавления в 3 места (ipc-channels, preload, preload.d.ts)

**Когда пересмотреть:** не нужно — это рекомендованный Electron-подход
