import BaseInput from './BaseInput';
import type NumberInputProps from '../types/NumberInputProps';

export default function NumberInput(props: NumberInputProps) {
  return (
    <BaseInput
      {...props}
      type="number"
    />
  );
}
