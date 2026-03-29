import { ROUTES_PATHS } from '@/shared/config/routes';
import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';
import { useTranslation } from 'react-i18next';

export const Menu: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'menu' });

  return (
    <div
      className={cx(
        'p-16 border-1 border-black-100 rounded-2xl',
        className,
      )}
    >
      <div
        className="mb-16"
      >
        {t('title')}
      </div>

      <Button
        url={ROUTES_PATHS.RECIPES}
      >
        {t('addRecipe')}
      </Button>
    </div>
  );
};
