import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateRecipe } from './create-recipe';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const addRecipe = vi.fn().mockResolvedValue(undefined);

vi.mock('@/entities/recipe', () => ({
  useRecipesStore: (selector: (s: { addRecipe: typeof addRecipe }) => unknown) =>
    selector({ addRecipe }),
}));

vi.mock('./ingredient/create-recipe-ingredient', () => ({
  CreateRecipeIngredient: ({ index, onDelete }: { index: number; onDelete: () => void }) => (
    <div data-testid={`ingredient-${index}`}>
      <button type="button" onClick={onDelete}>delete</button>
    </div>
  ),
}));

describe('CreateRecipe', () => {
  it('рендерит поле названия рецепта', () => {
    render(<CreateRecipe />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('рендерит кнопку "добавить ингредиент" и кнопку отправки формы', () => {
    render(<CreateRecipe />);
    expect(screen.getByText('recipes.addIngredient')).toBeInTheDocument();
    expect(screen.getByText('recipes.addRecipe')).toBeInTheDocument();
  });

  it('клик "добавить ингредиент" → появляется строка ингредиента', async () => {
    render(<CreateRecipe />);
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    expect(screen.getByTestId('ingredient-0')).toBeInTheDocument();
  });

  it('второй клик → две строки ингредиентов', async () => {
    render(<CreateRecipe />);
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    expect(screen.getAllByTestId(/^ingredient-/)).toHaveLength(2);
  });

  it('удаление ингредиента → остаётся одна строка', async () => {
    render(<CreateRecipe />);
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    await userEvent.click(screen.getAllByText('delete')[0]);
    expect(screen.getAllByTestId(/^ingredient-/)).toHaveLength(1);
  });

  it('сабмит без названия → показывает validation.required', async () => {
    render(<CreateRecipe />);
    await userEvent.click(screen.getByText('recipes.addRecipe'));
    expect(screen.getByText('validation.required')).toBeInTheDocument();
  });

  it('сабмит без ингредиентов → показывает validation.ingredientsNeed', async () => {
    render(<CreateRecipe />);
    await userEvent.type(screen.getByRole('textbox'), 'Борщ');
    await userEvent.click(screen.getByText('recipes.addRecipe'));
    expect(screen.getByText('validation.ingredientsNeed')).toBeInTheDocument();
  });

  it('название + ингредиент → сабмит без root-ошибки', async () => {
    render(<CreateRecipe />);
    await userEvent.type(screen.getByRole('textbox'), 'Борщ');
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    await userEvent.click(screen.getByText('recipes.addRecipe'));
    expect(screen.queryByText('validation.ingredientsNeed')).not.toBeInTheDocument();
  });

  it('валидный сабмит → addRecipe вызывается с title и ingredients', async () => {
    addRecipe.mockClear();
    render(<CreateRecipe />);
    await userEvent.type(screen.getByRole('textbox'), 'Борщ');
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    await userEvent.click(screen.getByText('recipes.addRecipe'));
    expect(addRecipe).toHaveBeenCalledOnce();
    expect(addRecipe).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Борщ', ingredients: expect.arrayContaining([expect.any(Object)]) }),
    );
  });

  it('после успешного сабмита → поле названия сбрасывается', async () => {
    addRecipe.mockClear();
    render(<CreateRecipe />);
    await userEvent.type(screen.getByRole('textbox'), 'Борщ');
    await userEvent.click(screen.getByText('recipes.addIngredient'));
    await userEvent.click(screen.getByText('recipes.addRecipe'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
