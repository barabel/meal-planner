import cx from 'classix';
import { TInput } from '../types';

export const Input: FCClass<TInput> = ({
  className,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      className={cx(
        'flex items-center h-32 px-10 border-1 border-black-100',
        className,
      )}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
