import { type ChangeEvent } from 'react';

import classNames from '../../utilities/classNames';
import getValueFromChangeEvent from '../../utilities/getValueFromChangeEvent';
import useLoading from '../../hooks/useLoading';

interface SelectOption<T> {
  label: string;
  value: T;
}

export type SelectOptionArray<T> = Array<SelectOption<T>>;

export interface SelectProps<T> {
  disabled?: boolean;
  id: string;
  inline?: boolean;
  label: string;
  onChange: (value: T) => void;
  options: Array<SelectOption<T>>;
  required?: boolean;
  value: string;
}

export function Select<T extends string>({
  disabled = false,
  id,
  inline = false,
  label: labelProp,
  onChange: onChangeProp,
  options,
  required = false,
  value,
}: SelectProps<T>) {
  const { loading, loadingPosition } = useLoading();

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

  function label() {
    return required ? `${labelProp}*` : labelProp;
  }

  function labelClasses() {
    return classNames(['select__label', { 'select__label--inline': inline }]);
  }

  function selectClasses() {
    return classNames([
      'select__select',
      { 'select__select--disabled': disabled },
      { 'select__select--inline': inline },
      { 'select__select--loading': loading || loadingPosition },
    ]);
  }

  return (
    <div>
      <label
        className={labelClasses()}
        htmlFor={id}
      >
        {label()}
      </label>
      <select
        className={selectClasses()}
        disabled={disabled || loading || loadingPosition}
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
