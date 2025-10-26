import { BaseInput, type BaseInputProps } from './BaseInput/BaseInput';

export type TextInputProps = Omit<
  BaseInputProps,
  'hideStepper' | 'max' | 'min' | 'noScroll' | 'step' | 'type'
> & { forceUppercase?: boolean; value: string };

export function TextInput({
  forceUppercase = false,
  onChange: onChangeProp,
  ...rest
}: TextInputProps) {
  function onChange(event: string) {
    onChangeProp(forceUppercase ? event.toUpperCase() : event);
  }

  return (
    <BaseInput
      {...rest}
      onChange={onChange}
      type="text"
    />
  );
}
