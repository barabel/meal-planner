import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('рендерит поле ввода', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('отображает переданное значение', () => {
    render(<Input value="тест" onChange={() => {}} />);
    expect(screen.getByDisplayValue('тест')).toBeInTheDocument();
  });

  it('вызывает onChange при вводе текста', async () => {
    const onChange = vi.fn();
    render(<Input value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'а');
    expect(onChange).toHaveBeenCalled();
  });

  it('рендерит как type="number" если передан type', () => {
    render(<Input type="number" />);
    expect(document.querySelector('input[type="number"]')).toBeInTheDocument();
  });
});
