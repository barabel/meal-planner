import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateRecipeIngredient } from './create-recipe-ingredient';
import { TCreateRecipeForm } from '../../types';
import { defaultIngredientFormValues } from '../../const';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Amount — интеграционная зависимость с Select и Zustand-стором.
// Тестируем только логику Ingredient: передачу полей, валидацию, onDelete.
vi.mock('@/features/amount', () => ({
  Amount: ({
    amount,
    onChange,
    errors,
  }: {
    amount: string;
    onChange: (v: { amount: string; unit: string }) => void;
    errors?: { amount?: string; unit?: string };
  }) => (
    <div>
      <input
        data-testid="amount-input"
        value={amount}
        onChange={e => onChange({ amount: e.target.value, unit: 'g' })}
      />
      {errors?.amount && <span>{errors.amount}</span>}
    </div>
  ),
}));

type WrapperProps = {
  index?: number;
  onDelete?: () => void;
  placeholderTitle?: string;
};

// FormProvider — обязателен, т.к. Ingredient использует useFormContext.
// Форма с кнопкой сабмита нужна для тестирования валидации полей.
const Wrapper = ({ index = 0, onDelete, placeholderTitle }: WrapperProps) => {
  const methods = useForm<TCreateRecipeForm>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      ingredients: [defaultIngredientFormValues],
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <CreateRecipeIngredient
          index={index}
          onDelete={onDelete}
          placeholderTitle={placeholderTitle}
        />
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};

describe('CreateRecipeIngredient', () => {
  it('рендерит поле названия ингредиента', () => {
    render(<Wrapper placeholderTitle="Ингредиент 1" />);
    expect(screen.getByPlaceholderText('Ингредиент 1')).toBeInTheDocument();
  });

  it('рендерит компонент Amount', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
  });

  it('рендерит кнопку удаления', () => {
    render(<Wrapper />);
    expect(screen.getByText('recipes.deleteIngredient')).toBeInTheDocument();
  });

  it('клик по кнопке удаления вызывает onDelete', async () => {
    const onDelete = vi.fn();
    render(<Wrapper onDelete={onDelete} />);
    await userEvent.click(screen.getByText('recipes.deleteIngredient'));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('сабмит без title → показывает validation.required у поля названия', async () => {
    render(<Wrapper placeholderTitle="Ингредиент 1" />);
    await userEvent.click(screen.getByText('submit'));
    // оба поля (title и amount) не заполнены → две ошибки
    expect(screen.getAllByText('validation.required').length).toBeGreaterThanOrEqual(1);
  });

  it('сабмит без amount → показывает validation.required у поля количества', async () => {
    render(<Wrapper placeholderTitle="Ингредиент 1" />);
    // заполняем title, оставляем amount пустым
    await userEvent.type(screen.getByPlaceholderText('Ингредиент 1'), 'Морковь');
    await userEvent.click(screen.getByText('submit'));
    // Amount-мок рендерит ошибку amount напрямую
    expect(screen.getByText('validation.required')).toBeInTheDocument();
  });
});
