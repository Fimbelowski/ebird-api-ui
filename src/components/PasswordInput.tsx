import BaseInput from './BaseInput';
import type CommonInputProps from '../types/CommonInputProps';

export default function PasswordInput(props: CommonInputProps) {
  return (
    <BaseInput
      {...props}
      type="password"
    />
  );
}
