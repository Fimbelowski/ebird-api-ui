import { type ChangeEvent } from 'react';

import classNames from '../utilities/classNames';
import type SelectOption from '../types/SelectOption';

interface Props {
  disabled?: boolean;
  id: string;
  label: string;
  loading?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  value: string;
}

export default function Select({
  disabled = false,
  id,
  label,
  loading = false,
  onChange,
  options,
  required = false,
  value,
}: Props) {
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

  function selectClasses() {
    return classNames([
      'select__select',
      { 'select__select--disabled': disabled },
      { 'select__select--loading': loading },
    ]);
  }

  return (
    <>
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
    </>
  );
}
