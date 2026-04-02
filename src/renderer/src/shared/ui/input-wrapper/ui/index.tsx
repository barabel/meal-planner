import cx from 'classix';
import { TInputWrapper } from '../types';

export const InputWrapper: FCClass<TInputWrapper> = ({
  className,
  children,
  label,
}) => {
  return (
    <div
      className={cx(
        'flex flex-col gap-4',
        className,
      )}
    >
      {label && (
        <div>
          {label}
        </div>
      )}

      {children}
    </div>
  );
};
