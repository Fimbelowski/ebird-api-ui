import type NumberInputProps from '../types/NumberInputProps';

export default function NumberInput({
  disabled,
  hideStepper = false,
  id,
  label,
  max,
  min,
  noScroll = false,
  onChange,
  pattern,
  required,
  step,
  value,
}: NumberInputProps) {
  const inputClasses = hideStepper ? 'number-input--no-stepper' : '';

  // onKeyDown and onWheel are unfortunate hacks needed to circumvent default
  // scrolling behavior on number input elements since there is no built-in way to disable that functionality.
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (noScroll) {
      const { key } = event;

      if (key === 'ArrowUp' || key === 'ArrowDown') {
        const { currentTarget } = event;
        blurAndRefocus(currentTarget);
      }
    }
  }

  function onWheel(event: React.UIEvent<HTMLInputElement>) {
    if (noScroll) {
      const { currentTarget } = event;
      blurAndRefocus(currentTarget);
    }
  }

  function blurAndRefocus(target: EventTarget & HTMLInputElement) {
    target.blur();
    setTimeout(() => {
      target.focus();
    }, 0);
  }

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
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        pattern={pattern}
        required={required}
        step={step}
        value={value}
        type="number"
      ></input>
    </>
  );
}
