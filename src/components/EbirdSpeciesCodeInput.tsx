import { TextInput, type TextInputProps } from './TextInput';

type Props = Omit<TextInputProps, 'id' | 'label' | 'placeholder'>;

export default function EbirdSpeciesCodeInput(props: Props) {
  return (
    <TextInput
      {...props}
      id="species-code"
      label="Species Code"
      placeholder="virrai"
    />
  );
}
