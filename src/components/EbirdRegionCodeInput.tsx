import type CommonInputProps from '../types/CommonInputProps';
import TextInput from './TextInput';

type Props = Omit<CommonInputProps, 'placeholder'>;

export default function EbirdRegionCodeInput(props: Props) {
  return (
    <TextInput
      {...props}
      placeholder="US-CO"
    />
  );
}
