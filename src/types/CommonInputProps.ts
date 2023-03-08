export default interface CommonInputProps {
  className?: string;
  disabled?: boolean;
  form?: string;
  id: string;
  label: string;
  loading?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
}
