import cx from 'classix';
import { TInputWrapper } from '../types';
import { useState } from 'react';

export const InputWrapper: FCClass<TInputWrapper> = ({
  className,
  children,
  label,
  error,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className={cx(
        'relative flex flex-col gap-4',
        error && 'error-input',
        className,
      )}
    >
      {label && (
        <div>
          {label}
        </div>
      )}

      {children}

      {error && (
        <div
          className="absolute bottom-12 right-10 size-8 rounded border-1 border-red-400 cursor-pointer"
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
        >
          <div
            className={cx(
              'z-1 absolute top-[calc(100%+(--spacing(4)))] left-1/2 -translate-x-1/2 p-4 border-1 text-center text-red-400 bg-white-100 pointer-events-none',
              opened ? 'block' : 'hidden',
            )}
          >
            {error}
          </div>
        </div>
      )}
    </div>
  );
};
