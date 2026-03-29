import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

export const RecipePage: FCClass = ({
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={className}
    >
      <NavLink to="/">
        {t('main')}
      </NavLink>
    </div>
  );
};
