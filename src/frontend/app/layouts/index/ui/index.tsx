import { Navbar } from '@/widgets/navbar';
import cx from 'classix';
import { Outlet } from 'react-router';

export const LayoutIndex: FCClass = ({
  className,
}) => {
  return (
    <main
      className={cx(
        'main flex flex-col gap-16',
        className,
      )}
    >
      <Navbar />

      <Outlet />
    </main>
  );
};
