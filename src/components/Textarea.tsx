import { type ChangeEvent } from 'react';

interface Props {
  cols?: number;
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  value: string;
}

export default function Textarea({
  cols,
  disabled = false,
  id,
  label,
  onChange: onChangeProp,
  placeholder,
  rows,
  value,
}: Props) {
  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const {
      target: { value },
    } = event;

    onChangeProp(value);
  }

  return (
    <div className="textarea">
      <label
        className="textarea__label"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className="textarea__textarea"
        cols={cols}
        disabled={disabled}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        value={value}
      ></textarea>
    </div>
  );
}
