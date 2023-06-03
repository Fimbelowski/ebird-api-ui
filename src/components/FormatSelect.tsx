import type EbirdFormat from '../services/ebird/types/EbirdFormat';
import {
  Select,
  type SelectProps,
  type SelectOptionArray,
} from './Select/Select';

type Props = Omit<
  SelectProps<EbirdFormat>,
  'label' | 'onChange' | 'options'
> & {
  onChange: (format: EbirdFormat) => void;
};

export default function FormatSelect(props: Props) {
  const options: SelectOptionArray<EbirdFormat> = [
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
    <Select<EbirdFormat>
      {...props}
      label="Format"
      options={options}
    />
  );
}
