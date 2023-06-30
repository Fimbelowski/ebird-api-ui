import { NumberInput, type NumberInputProps } from '../NumberInput';

type Props = Omit<NumberInputProps, 'id' | 'label' | 'max' | 'min'>;

export default function BackInput({ placeholder = '14', ...rest }: Props) {
  return (
    <NumberInput
      {...rest}
      id="back"
      label="Back"
      max={30}
      min={1}
      placeholder={placeholder}
    />
  );
}
