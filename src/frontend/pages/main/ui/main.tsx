import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

export const MainPage: FCClass = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={className}
    >
      <NavLink to="/recipe">
        {t('recipes')}
      </NavLink>

      <div>
        {t('test')}
      </div>
    </div>
  );
};
