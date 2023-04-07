import { BaseInput, type BaseInputProps } from './BaseInput';

export type NumberInputProps = Omit<
  BaseInputProps,
  'onChange' | 'maxLength' | 'minLength' | 'type' | 'value'
> & { onChange: (value: number) => void; value?: number };

export function NumberInput({
  onChange: onChangeProp,
  value,
  ...rest
}: NumberInputProps) {
  function onChange(value: string) {
    const valueAsNumber = parseFloat(value);

    onChangeProp(valueAsNumber);
  }

  function valueAsString() {
    return value?.toString() ?? '';
  }

  return (
    <BaseInput
      {...rest}
      onChange={onChange}
      type="number"
      value={valueAsString()}
    />
  );
}
