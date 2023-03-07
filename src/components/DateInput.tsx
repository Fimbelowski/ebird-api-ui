import BaseInput from './BaseInput';
import type CommonInputProps from '../types/CommonInputProps';

type Props = Omit<CommonInputProps, 'type'>;

export default function DateInput(props: Props) {
  return (
    <BaseInput
      {...props}
      type="date"
    />
  );
}
