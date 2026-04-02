import { useUnitsStore } from './store';

describe('useUnitsStore', () => {
  it('содержит непустой массив единиц', () => {
    const { units } = useUnitsStore.getState();
    expect(units.length).toBeGreaterThan(0);
  });

  it('содержит все 7 единиц измерения', () => {
    const { units } = useUnitsStore.getState();
    expect(units).toHaveLength(7);
  });

  it('каждая единица имеет label и value', () => {
    const { units } = useUnitsStore.getState();
    units.forEach((unit) => {
      expect(unit.label).toBeTruthy();
      expect(unit.value).toBeTruthy();
    });
  });

  it('содержит единицу г (value: g)', () => {
    const { units } = useUnitsStore.getState();
    expect(units.some(u => u.value === 'g')).toBe(true);
  });
});
