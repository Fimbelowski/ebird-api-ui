import { TextInput, type TextInputProps } from './TextInput';

type Props = Omit<TextInputProps, 'id' | 'label' | 'placeholder'>;

export default function EbirdSpeciesCodeInput(props: Props) {
  return (
    <TextInput
      {...props}
      id="species-code"
      label="Species Code"
      pattern="[a-z]{2,6}\d{0,2}|[xy]\d{5}"
      placeholder="virrai"
    />
  );
}
