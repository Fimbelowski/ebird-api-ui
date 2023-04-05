import { BaseInput, type BaseInputProps } from './BaseInput';

type Props = Omit<
  BaseInputProps,
  | 'hideStepper'
  | 'maxLength'
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
  return (
    <BaseInput
      {...rest}
      label={label}
      type="date"
    />
  );
}
