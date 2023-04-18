import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<
  NumberInputProps,
  'id' | 'label' | 'max' | 'min' | 'placeholder'
>;

export default function MaxResultsInput(props: Props) {
  return (
    <NumberInput
      {...props}
      id="max-results"
      label="Max Results"
      max={10000}
      min={1}
      placeholder="100"
    />
  );
}
