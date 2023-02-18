import { type MouseEvent } from 'react';

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
  const classes = [
    'button',
    disabled ? 'button--disabled' : '',
    loading ? 'button--loading' : '',
    className,
  ].join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
