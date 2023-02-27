import classNames from '../utilities/classNames';
import type CommonInputProps from '../types/CommonInputProps';
import type NumberInputProps from '../types/NumberInputProps';

type BaseInputProps = CommonInputProps & NumberInputProps & { type: string };

export default function BaseInput({
  className = '',
  disabled = false,
  hideStepper = false,
  id,
  inline = false,
  label,
  loading = false,
  max,
  min,
  noScroll = false,
  onChange,
  pattern,
  placeholder,
  required = false,
  step,
  type,
  value,
}: BaseInputProps) {
  function containerClasses() {
    return classNames(['base-input', className]);
  }

  function inputClasses() {
    return classNames([
      'base-input__input',
      { 'base-input__input--disabled': disabled },
      { 'base-input__input--inline': inline },
      { 'base-input__input--loading': loading },
      { 'base-input__input--no-stepper': hideStepper },
    ]);
  }

  function labelClasses() {
    return classNames([
      'base-input__label',
      { 'base-input__label--inline': inline },
    ]);
  }

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
    <div className={containerClasses()}>
      <label
        className={labelClasses()}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={inputClasses()}
        disabled={disabled || loading}
        id={id}
        max={max}
        min={min}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
        value={value}
      ></input>
    </div>
  );
}
