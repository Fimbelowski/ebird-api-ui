import BaseInput from './BaseInput';
import type CommonInputProps from '../types/CommonInputProps';

type Props = Omit<CommonInputProps, 'label' | 'type'> & { label?: string };

export default function DateInput({ label = 'Date', ...rest }: Props) {
  return (
    <BaseInput
      {...rest}
      label={label}
      type="date"
    />
  );
}
