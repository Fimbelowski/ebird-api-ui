import { TextInput, type TextInputProps } from './TextInput';

type Props = Omit<TextInputProps, 'id' | 'label' | 'placeholder'> & {
  label?: string;
};

export default function EbirdRegionCodeInput({
  label = 'Region Code',
  ...rest
}: Props) {
  return (
    <TextInput
      {...rest}
      id="region-code"
      label={label}
      placeholder="US-CO"
    />
  );
}
