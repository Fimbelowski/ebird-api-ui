import type CommonInputProps from '../types/CommonInputProps';

export default function PasswordInput({
  disabled = false,
  id,
  label,
  onChange,
  required = false,
  value,
}: CommonInputProps) {
  return (
    <div className="password-input">
      <label
        className="password-input__label"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        disabled={disabled}
        id={id}
        onChange={onChange}
        required={required}
        type="password"
        value={value}
      ></input>
    </div>
  );
}
