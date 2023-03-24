import type EbirdFormat from '../types/EbirdFormat';
import type SelectProps from '../types/SelectProps';
import useSelect from '../hooks/useSelect';

type Props = Omit<
  SelectProps<EbirdFormat>,
  'label' | 'onChange' | 'options'
> & {
  onChange: (format: EbirdFormat) => void;
};

export default function FormatSelect(props: Props) {
  const Select = useSelect<EbirdFormat>([
    {
      label: 'CSV',
      value: 'csv',
    },
    {
      label: 'JSON',
      value: 'json',
    },
  ]);

  return (
    <Select
      {...props}
      label="Format"
    />
  );
}
