import { Input } from '@/shared/ui/input';
import { TCreateRecipeIngredientComp } from '../../types';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';
import { Amount, TAmount } from '@/features/amount';
import { ChangeEvent } from 'react';

export const CreateRecipeIngredient: FCClass<TCreateRecipeIngredientComp> = ({
  className,
  title,
  amount,
  unit,
  onChange,
  onDelete,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'recipes' });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ title: event.target.value });
  };

  const handleAmountChange: TAmount['onChange'] = (params) => {
    onChange?.(params);
  };

  return (
    <div
      className={cx(
        'flex gap-20',
        className,
      )}
    >
      <Input
        value={title}
        onChange={handleInputChange}
      />

      <Amount
        amount={amount}
        unit={unit}
        onChange={handleAmountChange}
      />

      <Button onClick={onDelete}>
        {t('deleteIngredient')}
      </Button>
    </div>
  );
};
