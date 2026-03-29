import { ROUTES_PATHS } from '@/shared/config/routes';
import { Button } from '@/shared/ui/buttons/button';
import cx from 'classix';
import { useTranslation } from 'react-i18next';

export const Navbar: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  return (
    <div
      className={cx(
        'flex gap-20 pt-16 px-16',
        className,
      )}
    >
      <Button
        url={ROUTES_PATHS.MAIN}
      >
        {t('menu')}
      </Button>

      <Button
        url={ROUTES_PATHS.RECIPES}
      >
        {t('recipe')}
      </Button>
    </div>
  );
};
