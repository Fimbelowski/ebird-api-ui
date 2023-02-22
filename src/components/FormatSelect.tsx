import { type ChangeEvent } from 'react';

import Format from '../types/Format';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';
import Select from './Select';
import type SelectOption from '../types/SelectOption';
import type SelectProps from '../types/SelectProps';

type Props = Omit<SelectProps, 'label' | 'onChange' | 'options'> & {
  onChange: (format: Format) => void;
};

const options: SelectOption[] = [
  {
    label: 'CSV',
    value: Format.Csv,
  },
  {
    label: 'JSON',
    value: Format.Json,
  },
];

export default function FormatSelect(props: Props) {
  function verifyChangeValue(event: ChangeEvent<HTMLSelectElement>) {
    const value = getValueFromChangeEvent(event);

    if (value !== Format.Csv && value !== Format.Json) {
      throw Error(`Invalid format: ${value}`);
    }

    props.onChange(value);
  }

  return (
    <Select
      {...props}
      label="Format"
      options={options}
      onChange={verifyChangeValue}
    />
  );
}
