---
name: Memory Sync Rule
description: Обновлять memory в обоих местах — глобальном и локальном (в репо)
type: feedback
---

Всегда обновлять memory в двух местах одновременно:
1. Глобальный: `C:\Users\Barabel\.claude\projects\c---coding--others--electron-meal-planner\memory\`
2. Локальный (в репо): `c:\_coding\_others\_electron\meal-planner\.claude\memory\`

**Why:** пользователь работает на нескольких машинах. Локальный memory синхронизируется через git, глобальный — для текущей машины.

**How to apply:** при каждом сохранении memory-файла записывать его в оба места и обновлять оба `MEMORY.md`.