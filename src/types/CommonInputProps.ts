export default interface CommonInputProps {
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  required?: boolean;
  value: string;
}
