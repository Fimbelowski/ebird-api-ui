import { type MouseEvent, type ReactNode } from 'react';

import classNames from '../../utilities/classNames';

interface Props {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type,
}: Props) {
  function classes() {
    return classNames([
      'button',
      { 'button--disabled': disabled },
      { 'button--loading': loading },
      { 'button--submit': type === 'submit' },
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
      {children}
    </button>
  );
}
