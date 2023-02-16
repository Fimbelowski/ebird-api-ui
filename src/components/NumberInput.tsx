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
  const inputClasses = hideStepper ? 'number-input--no-stepper' : '';

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        className={inputClasses}
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
