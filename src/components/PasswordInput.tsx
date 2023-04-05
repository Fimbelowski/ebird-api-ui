import { BaseInput, type BaseInputProps } from './BaseInput';

type Props = Omit<
  BaseInputProps,
  'hideStepper' | 'max' | 'min' | 'noScroll' | 'step' | 'type'
>;

export default function PasswordInput(props: Props) {
  return (
    <BaseInput
      {...props}
      type="password"
    />
  );
}
