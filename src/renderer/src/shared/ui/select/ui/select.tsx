import { isArrayAndNotEmpty } from '@/shared/helpers/arrays';
import { TSelect } from '../types';
import cx from 'classix';

export const Select: FCClass<TSelect> = ({
  className,
  name,
  options,
  value,
  onChange,
}) => {
  const hasOptions = isArrayAndNotEmpty(options);

  return (
    <select
      className={cx(
        'h-32 border-1 border-black-100',
        className,
      )}
      name={name}
      value={value}
      onChange={onChange}
    >
      {hasOptions && options.map((option, index) => {
        const { label, value } = option;

        return (
          <option
            key={index}
            value={value}
          >
            {label}
          </option>
        );
      })}
    </select>
  );
};
