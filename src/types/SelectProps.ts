import type SelectOption from '../types/SelectOption';

export default interface SelectProps<T> {
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (value: T) => void;
  options: Array<SelectOption<T>>;
  required?: boolean;
  value: string;
}
