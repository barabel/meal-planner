import cx from 'classix';
import type { TCardDay } from '../types';

export const CardDay: FCClass<TCardDay> = ({
  className,
  title,
}) => {
  return (
    <div
      className={cx(
        'p-10 border-1 border-black-100 rounded-2xl cursor-pointer',
        className,
      )}
    >
      {title && (
        <div>
          {title}
        </div>
      )}
    </div>
  );
};
