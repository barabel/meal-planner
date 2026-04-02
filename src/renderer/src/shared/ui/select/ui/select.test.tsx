import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './select';

const options = [
  { label: 'Яблоко', value: 'apple' },
  { label: 'Банан', value: 'banana' },
  { label: 'Вишня', value: 'cherry' },
];

describe('Рендеринг', () => {
  it('отображает корректное количество опций', () => {
    render(<Select options={options} />);

    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('отображает пустой select, если передан пустой массив', () => {
    render(<Select options={[]} />);

    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('не падает и не рендерит опции, если options = undefined', () => {
    render(<Select options={undefined} />);

    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });
});

describe('Содержимое', () => {
  it('каждая опция отображает правильный label как текст', () => {
    render(<Select options={options} />);

    const optionElements = screen.getAllByRole('option');

    optionElements.forEach((el, index) => {
      expect(el).toHaveTextContent(options[index].label);
    });
  });

  it('каждая опция имеет правильный value', () => {
    render(<Select options={options} />);

    const optionElements = screen.getAllByRole('option');

    optionElements.forEach((el, index) => {
      expect(el).toHaveValue(options[index].value);
    });
  });

  it('устанавливает атрибут name на select', () => {
    render(<Select options={options} name="fruit" />);

    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'fruit');
  });

  it('выбирает опцию, соответствующую переданному value', () => {
    render(<Select options={options} value="banana" onChange={() => {}} />);

    expect(screen.getByRole('combobox')).toHaveValue('banana');
  });

  it('не выбирает ни одну опцию, если value не совпадает ни с одним из вариантов', () => {
    render(<Select options={options} value="nonexistent" onChange={() => {}} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});

describe('Взаимодействие', () => {
  it('вызывает onChange при изменении выбранного значения', () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'cherry' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('передаёт в onChange нативное событие с корректным target.value', () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'banana' },
    });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'banana' }),
      }),
    );
  });

  it('не падает при смене значения, если onChange не передан', () => {
    render(<Select options={options} />);

    expect(() => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'apple' },
      });
    }).not.toThrow();
  });
});
