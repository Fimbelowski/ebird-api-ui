import { TextInput, type TextInputProps } from './TextInput';

type Props = Omit<
  TextInputProps,
  'id' | 'label' | 'placeholder' | 'pattern'
> & {
  maxLocations?: number;
};

export default function LocationsInput({ maxLocations = 10, ...rest }: Props) {
  function label() {
    return `Only Fetch Observations From These Locations (Comma Separated, Up to ${maxLocations})`;
  }

  function pattern() {
    return `^L(?:\\d{1,3}|\\d{5,8})(?:\\s*,\\s*L(?:\\d{1,3}|\\d{5,8})){0,${
      maxLocations - 1
    }}$`;
  }

  return (
    <TextInput
      {...rest}
      id="locations-input"
      label={label()}
      pattern={pattern()}
      placeholder="L1379126, L2747329"
    />
  );
}
