import { NumberInput, type NumberInputProps } from './NumberInput';

type Props = Omit<NumberInputProps, 'id' | 'label' | 'min'>;

export default function DistanceInput({
  max = 50,
  placeholder = '25',
  ...rest
}: Props) {
  return (
    <NumberInput
      {...rest}
      id="distance"
      label="Distance From the Given Position (km)"
      max={max}
      min={0}
      placeholder={placeholder}
    />
  );
}
