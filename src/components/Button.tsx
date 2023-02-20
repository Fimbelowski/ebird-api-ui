import { type MouseEvent } from 'react';

import classNames from '../utilities/classNames';

interface Props {
  className?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  className = '',
  disabled = false,
  label,
  loading = false,
  onClick,
  type,
}: Props) {
  function classes() {
    return classNames([
      'button',
      { 'button--disabled': disabled },
      { 'button--loading': loading },
      className,
    ]);
  }

  return (
    <button
      className={classes()}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
