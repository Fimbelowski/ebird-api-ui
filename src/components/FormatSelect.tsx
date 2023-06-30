import type EbirdRecordFormat from '../types/EbirdRecordFormat';
import {
  Select,
  type SelectProps,
  type SelectOptionArray,
} from './Select/Select';

type Props = Omit<SelectProps<EbirdRecordFormat>, 'id' | 'label' | 'options'>;

export default function FormatSelect(props: Props) {
  const options: SelectOptionArray<EbirdRecordFormat> = [
    {
      label: 'CSV',
      value: 'csv',
    },
    {
      label: 'JSON',
      value: 'json',
    },
  ];

  return (
    <Select<EbirdRecordFormat>
      {...props}
      id="format"
      label="Response Format"
      options={options}
    />
  );
}
