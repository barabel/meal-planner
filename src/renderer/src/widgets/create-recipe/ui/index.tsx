import { useState } from 'react';
import { Button } from '@/shared/ui/buttons/button';
import { Input } from '@/shared/ui/input';
import { useTranslation } from 'react-i18next';
import { CreateRecipeIngredient } from './ingredient';
import { TCreateRecipeIngredient } from '../types';

export const CreateRecipe: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'recipes' });

  const [ingredients, setIngredients] = useState<TCreateRecipeIngredient[]>([]);

  const addIngredient = () => setIngredients(prev => [...prev, { title: '', amount: '', unit: 'g' }]);

  const updateIngredient = (index: number, newValues: Partial<TCreateRecipeIngredient>) =>
    setIngredients(prev => prev.map((ingredient, i) => i === index ? { ...ingredient, ...newValues } : ingredient));

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
          <div>
            {t('recipeName')}
          </div>

          <Input
            name="recipeName"
          />
        </div>

        {ingredients.map((ingredient, index) => {
          const { title, amount, unit } = ingredient;

          return (
            <CreateRecipeIngredient
              key={index}
              title={title}
              amount={amount}
              unit={unit}
              onChange={newValues => updateIngredient(index, newValues)}
              onDelete={() => removeIngredient(index)}
            />
          );
        })}

        <Button onClick={addIngredient}>
          {t('addIngredient')}
        </Button>
      </div>

      <Button>
        {t('addRecipe')}
      </Button>
    </div>
  );
};
