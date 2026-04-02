import cx from 'classix';
import { TInput } from '../types';

export const Input: FCClass<TInput> = ({
  className,
  type = 'text',
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
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
