import { create } from 'zustand';
import type { TRecipesStore } from './types';

export const useRecipesStore = create<TRecipesStore>(set => ({
  recipes: [],
  isLoading: false,

  fetchAll: async () => {
    set({ isLoading: true });
    const recipes = await window.api.recipes.getAll();
    set({ recipes, isLoading: false });
  },

  addRecipe: async (dto) => {
    const recipe = await window.api.recipes.add(dto);
    set(state => ({ recipes: [...state.recipes, recipe] }));
  },

  removeRecipe: async (id) => {
    await window.api.recipes.remove(id);
    set(state => ({ recipes: state.recipes.filter(r => r.id !== id) }));
  },
}));
