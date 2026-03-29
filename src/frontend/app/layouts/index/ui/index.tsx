import cx from 'classix';
import { Outlet } from 'react-router';

export const LayoutIndex: FCClass = ({
  className,
}) => {
  return (
    <main
      className={cx(
        'main',
        className,
      )}
    >
      <Outlet />
    </main>
  );
};
