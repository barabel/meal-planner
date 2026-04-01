import cx from 'classix';
import { TInput } from '../types';

export const Input: FCClass<TInput> = ({
  className,
  name,
  value,
  onChange,
}) => {
  return (
    <input
      className={cx(
        'border-1 border-black-100',
        className,
      )}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
