import { type ChangeEvent } from 'react';

import classNames from '../utilities/classNames';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';
import type SelectProps from '../types/SelectProps';
import useLoading from '../hooks/useLoading';

export default function Select<T extends string>({
  disabled = false,
  id,
  label,
  onChange: onChangeProp,
  options,
  required = false,
  value,
}: SelectProps<T>) {
  const { loading } = useLoading();

  function Options() {
    const listItems = options.map(({ label, value }, index) => {
      return (
        <option
          className="select__option"
          key={index}
          value={value}
        >
          {label}
        </option>
      );
    });

    return <>{listItems}</>;
  }

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = getValueFromChangeEvent(event);
    onChangeProp(value as T);
  }

  function selectClasses() {
    return classNames([
      'select__select',
      { 'select__select--disabled': disabled },
      { 'select__select--loading': loading },
    ]);
  }

  return (
    <div>
      <label
        className="select__label"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className={selectClasses()}
        disabled={disabled || loading}
        id={id}
        onChange={onChange}
        required={required}
        value={value}
      >
        <Options />
      </select>
    </div>
  );
}
