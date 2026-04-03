import { Input } from '@/shared/ui/input';
import { TAmount } from '../types';
import { Select } from '@/shared/ui/select';
import { useUnitsStore } from '../model/store';
import cx from 'classix';
import { InputWrapper } from '@/shared/ui/input-wrapper';
import { useTranslation } from 'react-i18next';

export const Amount: FCClass<TAmount> = ({
  className,
  amount,
  unit,
  onChange,
  errors,
}) => {
  const { t } = useTranslation();

  const units = useUnitsStore(store => store.units);

  return (
    <div
      className={cx('flex gap-20', className)}
    >
      <InputWrapper
        label={t('amount.value')}
        error={errors?.amount}
      >
        <Input
          value={amount}
          onChange={event => onChange({ amount: event.target.value, unit })}
          placeholder="0"
        />
      </InputWrapper>

      <InputWrapper
        label={t('amount.unit')}
        error={errors?.unit}
      >
        <Select
          options={units}
          value={unit}
          onChange={event => onChange({ amount: amount, unit: event.target.value })}
        />
      </InputWrapper>
    </div>
  );
};
