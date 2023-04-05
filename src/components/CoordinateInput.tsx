import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<
  NumberInputProps,
  'hideStepper' | 'noScroll' | 'pattern' | 'step'
>;

export default function CoordinateInput(props: Props) {
  return (
    <NumberInput
      {...props}
      hideStepper
      noScroll
      pattern="-?\d*.\d{2,}"
      step="any"
    />
  );
}
