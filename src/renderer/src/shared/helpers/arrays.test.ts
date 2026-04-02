import { isArrayAndNotEmpty } from './arrays';

describe('isArrayAndNotEmpty', () => {
  it('возвращает false для пустого массива', () => {
    expect(isArrayAndNotEmpty([])).toBe(false);
  });

  it('возвращает true для непустого массива', () => {
    expect(isArrayAndNotEmpty([1, 2, 3])).toBe(true);
  });

  it('возвращает false если массив не передан', () => {
    expect(isArrayAndNotEmpty()).toBe(false);
  });

  it('работает с массивом строк', () => {
    expect(isArrayAndNotEmpty(['а', 'б'])).toBe(true);
  });
});
