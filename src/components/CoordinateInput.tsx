import NumberInput from './NumberInput';
import type NumberInputProps from '../types/NumberInputProps';

type Props = Omit<NumberInputProps, 'hideStepper' | 'pattern' | 'step'>;

export default function CoordinateInput(props: Props) {
  return (
    <NumberInput
      {...props}
      hideStepper
      pattern="-?\d*.\d{2,}"
      step="any"
    />
  );
}
