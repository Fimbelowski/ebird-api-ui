import { BaseInput, type BaseInputProps } from './BaseInput';

type Props = Omit<
  BaseInputProps,
  | 'hideStepper'
  | 'maxLength'
  | 'minLength'
  | 'noScroll'
  | 'onChange'
  | 'pattern'
  | 'placeholder'
  | 'label'
  | 'type'
  | 'value'
> & {
  label?: string;
  onChange: (value: Date) => void;
};

export default function DateInput({
  label = 'Date',
  onChange: onChangeProp,
  ...rest
}: Props) {
  function onChange(value: string) {
    const valueAsDate = new Date(value);

    onChangeProp(valueAsDate);
  }

  return (
    <BaseInput
      {...rest}
      label={label}
      onChange={onChange}
      type="date"
    />
  );
}
