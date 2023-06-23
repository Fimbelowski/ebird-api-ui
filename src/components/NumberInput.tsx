import { BaseInput, type BaseInputProps } from './BaseInput';

export type NumberInputProps = Omit<
  BaseInputProps,
  'maxLength' | 'minLength' | 'type'
> & {
  value: string;
};

export function NumberInput(props: NumberInputProps) {
  return (
    <BaseInput
      {...props}
      type="number"
    />
  );
}
