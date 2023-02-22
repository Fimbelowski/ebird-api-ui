import BaseInput from './BaseInput';
import type CommonInputProps from '../types/CommonInputProps';

export default function TextInput(props: CommonInputProps) {
  return (
    <BaseInput
      {...props}
      type="text"
    />
  );
}
