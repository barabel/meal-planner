import { useState } from 'react';
import { Button } from '@/shared/ui/buttons/button';
import { Input } from '@/shared/ui/input';
import { useTranslation } from 'react-i18next';
import { CreateRecipeIngredient } from './ingredient';

export const CreateRecipe: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'recipes' });

  const [ingredients, setIngredients] = useState<{ title: string }[]>([]);

  const addIngredient = () => setIngredients(prev => [...prev, { title: '' }]);

  const updateIngredient = (index: number, value: string) =>
    setIngredients(prev => prev.map((item, i) => i === index ? { title: value } : item));

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

        {ingredients.map((ingredient, index) => (
          <CreateRecipeIngredient
            key={index}
            title={ingredient.title}
            onChange={value => updateIngredient(index, value)}
            onDelete={() => removeIngredient(index)}
          />
        ))}

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
