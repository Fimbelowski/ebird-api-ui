import { type ChangeEvent } from 'react';

import classNames from '../utilities/classNames';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';
import useAppSelector from '../store/hooks/useAppSelector';

export interface BaseInputProps {
  disabled?: boolean;
  hideRequiredAsterisk?: boolean;
  hideStepper?: boolean;
  id: string;
  inline?: boolean;
  label: string;
  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  noScroll?: boolean;
  onChange: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  size?: number;
  step?: number | 'any';
  type: 'date' | 'number' | 'password' | 'text';
  value?: string;
}

export function BaseInput({
  disabled = false,
  hideRequiredAsterisk = false,
  hideStepper = false,
  id,
  inline = false,
  label,
  max,
  maxLength,
  min,
  minLength,
  noScroll = false,
  onChange: onChangeProp,
  pattern,
  placeholder,
  required = false,
  size,
  step,
  type,
  value,
}: BaseInputProps) {
  const isLoadingPosition = useAppSelector(
    (state) => state.loading.isLoadingPosition
  );
  const isLoadingRequest = useAppSelector(
    (state) => state.loading.isLoadingRequest
  );

  function computedLabel() {
    return required && !hideRequiredAsterisk ? `${label}*` : label;
  }

  function inputClasses() {
    return classNames([
      'base-input__input',
      { 'base-input__input--disabled': disabled },
      { 'base-input__input--inline': inline },
      { 'base-input__input--loading': isLoadingRequest || isLoadingPosition },
      { 'base-input__input--no-stepper': hideStepper },
    ]);
  }

  function labelClasses() {
    return classNames([
      'base-input__label',
      { 'base-input__label--inline': inline },
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
    <div>
      <label
        className={labelClasses()}
        htmlFor={id}
      >
        {computedLabel()}
      </label>
      <input
        className={inputClasses()}
        disabled={disabled || isLoadingRequest || isLoadingPosition}
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
        size={size}
        step={step}
        type={type}
        value={value}
      ></input>
    </div>
  );
}
