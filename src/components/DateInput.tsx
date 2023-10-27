import { BaseInput, type BaseInputProps } from './BaseInput/BaseInput';

type Props = Omit<
  BaseInputProps,
  | 'hideStepper'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'noScroll'
  | 'pattern'
  | 'placeholder'
  | 'label'
  | 'type'
  | 'value'
> & {
  label?: string;
};

export default function DateInput({ label = 'Date', ...rest }: Props) {
  function max() {
    return new Date().toISOString().slice(0, 10);
  }

  return (
    <BaseInput
      {...rest}
      label={label}
      max={max()}
      min="1800-01-01"
      type="date"
    />
  );
}
