import { create } from 'zustand';
import { TSelectOption } from '@/shared/ui/select';

type TUnitsStore = {
  units: TSelectOption[];
};

export const useUnitsStore = create<TUnitsStore>(() => ({
  units: [
    { label: 'г', value: 'g' },
    { label: 'кг', value: 'kg' },
    { label: 'мл', value: 'ml' },
    { label: 'л', value: 'l' },
    { label: 'шт', value: 'pcs' },
    { label: 'ст.л', value: 'tbs' },
    { label: 'ч.л', value: 'tsp' },
  ],
}));
