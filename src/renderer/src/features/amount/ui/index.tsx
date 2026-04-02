import { Input } from '@/shared/ui/input';
import { TAmount } from '../types';
import { Select } from '@/shared/ui/select';
import { useUnitsStore } from '../model/store';
import cx from 'classix';

export const Amount: FCClass<TAmount> = ({
  className,
  amount,
  unit,
  onChange,
}) => {
  const units = useUnitsStore(store => store.units);

  return (
    <div
      className={cx('flex gap-8', className)}
    >
      <Input
        value={amount}
        onChange={event => onChange({ amount: event.target.value, unit })}
      />

      <Select
        options={units}
        value={unit}
        onChange={event => onChange({ amount: amount, unit: event.target.value })}
      />
    </div>
  );
};
