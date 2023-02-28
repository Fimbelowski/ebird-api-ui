export default interface CommonInputProps {
  className?: string;
  disabled?: boolean;
  form?: string;
  id: string;
  label: string;
  loading?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
}
