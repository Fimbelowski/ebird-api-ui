import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<NumberInputProps, 'id' | 'label' | 'max' | 'min'>;

export default function MaxResultsInput({
  placeholder = '100',
  ...rest
}: Props) {
  return (
    <NumberInput
      {...rest}
      id="max-results"
      label="Max Results"
      max={10000}
      min={1}
      placeholder={placeholder}
    />
  );
}
