import { type MouseEvent, type ReactNode } from 'react';

import classNames from '../../utilities/classNames';
import useLoading from '../../hooks/useLoading';

interface Props {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  children,
  className = '',
  disabled = false,
  onClick,
  type,
}: Props) {
  const { loading } = useLoading();

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
