import { Input } from '@/shared/ui/input';
import { TCreateRecipeIngredient } from '../../types';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';

export const CreateRecipeIngredient: FCClass<TCreateRecipeIngredient> = ({
  className,
  title,
  onChange,
  onDelete,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'recipes' });

  return (
    <div
      className={cx(
        'flex gap-20',
        className,
      )}
    >
      <Input
        value={title}
        onChange={e => onChange(e.target.value)}
      />

      <Button onClick={onDelete}>
        {t('deleteIngredient')}
      </Button>
    </div>
  );
};
