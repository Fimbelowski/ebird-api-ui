import type { ReactNode } from 'react';

import classNames from '../../utilities/classNames';
import useLoading from '../../hooks/useLoading';

export interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export function Button({
  children,
  disabled = false,
  fullWidth = false,
  onClick,
  primary = false,
  secondary = false,
  type,
}: ButtonProps) {
  const { loading, loadingPosition } = useLoading();

  function classes() {
    return classNames([
      'button',
      { 'button--disabled': disabled },
      { 'button--full-width': fullWidth },
      { 'button--loading': loading || loadingPosition },
      { 'button--primary': primary },
      { 'button--secondary': secondary },
    ]);
  }

  return (
    <button
      className={classes()}
      disabled={disabled || loading || loadingPosition}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
