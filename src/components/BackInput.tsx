import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<
  NumberInputProps,
  'id' | 'label' | 'max' | 'min' | 'placeholder'
>;

export default function BackInput(props: Props) {
  return (
    <NumberInput
      {...props}
      id="back"
      label="Back"
      max={30}
      min={1}
      placeholder="7"
    />
  );
}
