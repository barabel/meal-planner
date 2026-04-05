import { Input } from '@/shared/ui/input';
import { TCreateRecipeIngredientComp, TCreateRecipeForm } from '../../types';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';
import { Amount } from '@/features/amount';
import { InputWrapper } from '@/shared/ui/input-wrapper';
import { useController, useFormContext } from 'react-hook-form';

export const CreateRecipeIngredient: FCClass<TCreateRecipeIngredientComp> = ({
  className,
  index,
  placeholderTitle,
  onDelete,
}) => {
  const { t } = useTranslation();

  const { control } = useFormContext<TCreateRecipeForm>();

  const { field: titleField, fieldState: { error: titleError } } = useController({
    control,
    name: `ingredients.${index}.title`,
    rules: { required: t('validation.required') },
  });

  const { field: amountField, fieldState: { error: amountError } } = useController({
    control,
    name: `ingredients.${index}.amount`,
    rules: { required: t('validation.required') },
  });

  const { field: unitField, fieldState: { error: unitError } } = useController({
    control,
    name: `ingredients.${index}.unit`,
  });

  return (
    <div
      className={cx(
        'flex items-end gap-20',
        className,
      )}
    >
      <InputWrapper
        label={t('recipes.ingredientWrapper')}
        error={titleError?.message}
      >
        <Input
          placeholder={placeholderTitle}
          value={titleField.value}
          onChange={event => titleField.onChange(event.target.value)}
        />
      </InputWrapper>

      <Amount
        amount={amountField.value}
        unit={unitField.value}
        onChange={({ amount, unit }) => {
          amountField.onChange(amount);
          unitField.onChange(unit);
        }}
        errors={{ amount: amountError?.message, unit: unitError?.message }}
      />

      <Button onClick={onDelete}>
        {t('recipes.deleteIngredient')}
      </Button>
    </div>
  );
};
