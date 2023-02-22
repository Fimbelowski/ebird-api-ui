import classNames from '../utilities/classNames';
import type SelectProps from '../types/SelectProps';

export default function Select({
  disabled = false,
  id,
  label,
  loading = false,
  onChange,
  options,
  required = false,
  value,
}: SelectProps) {
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
