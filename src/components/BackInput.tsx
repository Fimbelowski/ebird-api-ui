import NumberInput from './NumberInput';
import type NumberInputProps from '../types/NumberInputProps';

type Props = Omit<NumberInputProps, 'label' | 'max' | 'min' | 'placeholder'>;

export default function BackInput(props: Props) {
  return (
    <NumberInput
      {...props}
      label="Back"
      max={30}
      min={1}
      placeholder="7"
    />
  );
}
