import { Input } from '@/shared/ui/input';
import { TCreateRecipeIngredientComp } from '../../types';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';
import { Amount, TAmount } from '@/features/amount';
import { ChangeEvent } from 'react';
import { InputWrapper } from '@/shared/ui/input-wrapper';

export const CreateRecipeIngredient: FCClass<TCreateRecipeIngredientComp> = ({
  className,
  placeholderTitle,
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
        'flex items-end gap-20',
        className,
      )}
    >
      <InputWrapper
        label={t('ingredientWrapper')}
      >
        <Input
          placeholder={placeholderTitle}
          value={title}
          onChange={handleInputChange}
        />
      </InputWrapper>

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
