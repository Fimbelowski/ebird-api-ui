import type Format from '../types/Format';
import Select from './Select';
import type SelectOption from '../types/SelectOption';
import type SelectProps from '../types/SelectProps';

type Props = Omit<SelectProps<Format>, 'label' | 'onChange' | 'options'> & {
  onChange: (format: Format) => void;
};

const options: Array<SelectOption<Format>> = [
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
    <Select<Format>
      {...props}
      label="Format"
      options={options}
    />
  );
}
