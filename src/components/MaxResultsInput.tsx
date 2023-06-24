import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<NumberInputProps, 'id' | 'label' | 'min'>;

export default function MaxResultsInput({
  max = 10000,
  placeholder = '100',
  ...rest
}: Props) {
  return (
    <NumberInput
      {...rest}
      id="max-results"
      label="Max Results"
      max={max}
      min={1}
      placeholder={placeholder}
    />
  );
}
