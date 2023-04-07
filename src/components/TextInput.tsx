import { BaseInput, type BaseInputProps } from './BaseInput';

export type TextInputProps = Omit<
  BaseInputProps,
  'hideStepper' | 'max' | 'min' | 'noScroll' | 'step' | 'type'
> & { value: string };

export function TextInput(props: TextInputProps) {
  return (
    <BaseInput
      {...props}
      type="text"
    />
  );
}
