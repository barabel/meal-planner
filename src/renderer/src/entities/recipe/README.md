# entities/recipe

FSD-сущность рецептов. Zustand-стор с синхронизацией через IPC (`window.api.recipes`).

## Структура

```
entities/recipe/
  model/
    store.ts   — useRecipesStore (zustand)
    types.ts   — TRecipesStore
  index.ts     — barrel-экспорт
```

## API стора

| Поле / метод | Тип | Описание |
|---|---|---|
| `recipes` | `IRecipe[]` | Список рецептов |
| `isLoading` | `boolean` | Флаг загрузки |
| `fetchAll()` | `Promise<void>` | Загрузить все рецепты |
| `addRecipe(dto)` | `Promise<void>` | Добавить рецепт |
| `removeRecipe(id)` | `Promise<void>` | Удалить рецепт по id |

## Использование

```tsx
import { useRecipesStore } from '@/entities/recipe';

const { recipes, fetchAll } = useRecipesStore();
```

## Зависимости

- `IRecipe`, `ICreateRecipeDto` — из `@shared/types/recipe`
- `window.api.recipes` — IPC-мост (preload)
