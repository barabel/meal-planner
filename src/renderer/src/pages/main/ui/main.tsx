import { Week } from '@/widgets/week';
import cx from 'classix';

export const MainPage: FCClass = ({
  className,
}) => {
  return (
    <div
      className={cx(
        'flex gap-20 p-16',
        className,
      )}
    >
      <Week
        className="w-full"
      />
    </div>
  );
};
