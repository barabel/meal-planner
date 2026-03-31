import { CardDay } from '@/entities/cards/day';
import cx from 'classix';
import { useTranslation } from 'react-i18next';

const days = [
  { i18key: 'Mon' },
  { i18key: 'Tue' },
  { i18key: 'Wed' },
  { i18key: 'Thu' },
  { i18key: 'Fri' },
  { i18key: 'Sat' },
  { i18key: 'Sun' },
] as const;

export const Week: FCClass = ({
  className,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'days' });

  return (
    <div
      className={cx(
        className,
      )}
    >
      <div
        className="grid grid-cols-7 gap-20"
      >
        {days.map((day, index) => {
          const { i18key } = day;

          return (
            <CardDay
              key={index}
              className="w-full h-200"
              title={t(`${i18key}`)}
            />
          );
        })}
      </div>
    </div>
  );
};
