import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Amount } from './amount';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

import { TAmount } from '../types';

const defaultProps: TAmount = { amount: '100', unit: 'g', onChange: vi.fn() };
const renderAmount = (props: Partial<TAmount> = {}) =>
  render(<Amount {...defaultProps} {...props} />);

describe('Amount', () => {
  it('рендерит поле ввода количества', () => {
    renderAmount();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('рендерит select единицы измерения', () => {
    renderAmount();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('отображает переданное значение amount', () => {
    renderAmount({ amount: '250' });
    expect(screen.getByDisplayValue('250')).toBeInTheDocument();
  });

  it('onChange при вводе в amount передаёт { amount, unit }', async () => {
    const onChange = vi.fn();
    renderAmount({ amount: '', onChange });
    await userEvent.type(screen.getByRole('textbox'), '5');
    expect(onChange).toHaveBeenCalledWith({ amount: '5', unit: 'g' });
  });

  it('onChange при смене unit передаёт { amount, unit }', async () => {
    const onChange = vi.fn();
    renderAmount({ onChange });
    await userEvent.selectOptions(screen.getByRole('combobox'), 'kg');
    expect(onChange).toHaveBeenCalledWith({ amount: '100', unit: 'kg' });
  });

  it('errors.amount — показывает индикатор ошибки у поля количества', () => {
    renderAmount({ errors: { amount: 'обязательное поле' } });
    expect(document.querySelectorAll('.border-red-400')).toHaveLength(1);
    expect(screen.getByRole('textbox').closest('.error-input')).toBeInTheDocument();
  });

  it('errors.unit — показывает индикатор ошибки у поля единицы, не у количества', () => {
    renderAmount({ errors: { unit: 'выберите единицу' } });
    expect(document.querySelectorAll('.border-red-400')).toHaveLength(1);
    expect(screen.getByRole('combobox').closest('.error-input')).toBeInTheDocument();
  });

  it('применяет className к корневому элементу', () => {
    const { container } = render(<Amount {...defaultProps} className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });
});
