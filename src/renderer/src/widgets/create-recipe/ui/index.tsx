import { useState } from 'react';
import { Button } from '@/shared/ui/buttons/button';
import { Input } from '@/shared/ui/input';
import { useTranslation } from 'react-i18next';
import { CreateRecipeIngredient } from './ingredient';
import { TCreateRecipeIngredient } from '../types';
import { InputWrapper } from '@/shared/ui/input-wrapper';

export const CreateRecipe: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'recipes' });

  const [ingredients, setIngredients] = useState<TCreateRecipeIngredient[]>([]);
  const [ingredientsCount, setIngredientsCount] = useState(1);

  const addIngredient = () => {
    setIngredients(prev => [...prev, {
      title: '',
      placeholderTitle: `${t('ingredientTitlePlacehoder')}${ingredientsCount}`,
      amount: '',
      unit: 'g',
    }]);

    setIngredientsCount(count => count + 1);
  };

  const updateIngredient = (index: number, newValues: Partial<TCreateRecipeIngredient>) =>
    setIngredients((prev) => {
      return prev.map((ingredient, i) => i === index ? { ...ingredient, ...newValues } : ingredient);
    });

  const removeIngredient = (index: number) =>
    setIngredients(prev => prev.filter((_, i) => i !== index));

  return (
    <div
      className={className}
    >
      <div
        className="flex flex-col gap-20 mb-20"
      >
        <div
          className="flex gap-20"
        >
          <InputWrapper
            label={t('recipeName')}
          >
            <Input
              name="recipeName"
            />
          </InputWrapper>
        </div>

        {ingredients.map((ingredient, index) => {
          return (
            <CreateRecipeIngredient
              key={index}
              {...ingredient}
              onChange={newValues => updateIngredient(index, newValues)}
              onDelete={() => removeIngredient(index)}
            />
          );
        })}

        <Button
          onClick={() => {
            addIngredient();
          }}
        >
          {t('addIngredient')}
        </Button>
      </div>

      <Button>
        {t('addRecipe')}
      </Button>
    </div>
  );
};
