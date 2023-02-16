export default interface CommonInputProps {
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
}
