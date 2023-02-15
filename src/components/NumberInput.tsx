import type NumberInputProps from '../types/NumberInputProps';

export default function NumberInput({
  disabled,
  hideStepper = false,
  id,
  label,
  max,
  min,
  onChange,
  pattern,
  required,
  step,
  value,
}: NumberInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        onChange={onChange}
        pattern={pattern}
        required={required}
        step={step}
        value={value}
        type="number"
      ></input>
    </>
  );
}
