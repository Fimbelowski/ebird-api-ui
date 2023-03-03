import { type ChangeEvent } from 'react';

import classNames from '../utilities/classNames';
import type CommonInputProps from '../types/CommonInputProps';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';
import type NumberInputProps from '../types/NumberInputProps';

type BaseInputProps = CommonInputProps & NumberInputProps & { type: string };

export default function BaseInput({
  className = '',
  disabled = false,
  form,
  hideStepper = false,
  id,
  label,
  loading = false,
  max,
  maxLength,
  min,
  minLength,
  noScroll = false,
  onChange: onChangeProp,
  pattern,
  placeholder,
  required = false,
  step,
  type,
  value,
}: BaseInputProps) {
  function computedLabel() {
    return required ? `${label}*` : label;
  }

  function containerClasses() {
    return classNames(['base-input', className]);
  }

  function inputClasses() {
    return classNames([
      'base-input__input',
      { 'base-input__input--disabled': disabled },
      { 'base-input__input--loading': loading },
      { 'base-input__input--no-stepper': hideStepper },
    ]);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    onChangeProp(value);
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
        className="base-input__label"
        htmlFor={id}
      >
        {computedLabel()}
      </label>
      <input
        className={inputClasses()}
        disabled={disabled || loading}
        form={form}
        id={id}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
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
