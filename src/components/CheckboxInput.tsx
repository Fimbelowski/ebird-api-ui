import { type ChangeEvent } from 'react';

interface Props {
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}

export default function CheckboxInput({
  disabled = false,
  id,
  label,
  onChange: onChangeProp,
  value,
}: Props) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { checked },
    } = event;
    onChangeProp(checked);
  }

  return (
    <div className="checkbox-input">
      <input
        checked={value}
        className="checkbox-input__input"
        disabled={disabled}
        id={id}
        onChange={onChange}
        type="checkbox"
      ></input>
      <label
        className="checkbox-input__label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
