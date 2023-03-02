import type EbirdFormat from '../types/EbirdFormat';
import Select from './Select';
import type SelectOption from '../types/SelectOption';
import type SelectProps from '../types/SelectProps';

type Props = Omit<
  SelectProps<EbirdFormat>,
  'label' | 'onChange' | 'options'
> & {
  onChange: (format: EbirdFormat) => void;
};

const options: Array<SelectOption<EbirdFormat>> = [
  {
    label: 'CSV',
    value: 'csv',
  },
  {
    label: 'JSON',
    value: 'json',
  },
];

export default function FormatSelect(props: Props) {
  return (
    <Select<EbirdFormat>
      {...props}
      label="EbirdFormat"
      options={options}
    />
  );
}
