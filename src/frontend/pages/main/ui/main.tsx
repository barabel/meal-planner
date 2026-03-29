import { Menu } from '@/widgets/menu';
import { Week } from '@/widgets/week';
import cx from 'classix';

export const MainPage: FCClass = ({
  className,
}) => {
  return (
    <div
      className={cx(
        'flex gap-20 h-[100vh] p-16',
        className,
      )}
    >
      <Menu
        className="w-15/100 h-full"
      />

      <div
        className="w-85/100"
      >
        <Week />
      </div>
    </div>
  );
};
