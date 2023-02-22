import Select from './Select';
import type SelectOption from '../types/SelectOption';
import type SelectProps from '../types/SelectProps';

type Props = Omit<SelectProps, 'label' | 'options'>;

const options: SelectOption[] = [
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
    <Select
      {...props}
      label="Format"
      options={options}
    />
  );
}
