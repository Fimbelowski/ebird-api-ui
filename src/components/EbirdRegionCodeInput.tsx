import type CommonInputProps from '../types/CommonInputProps';
import TextInput from './TextInput';

type Props = Omit<CommonInputProps, 'id' | 'label' | 'placeholder'> & {
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
