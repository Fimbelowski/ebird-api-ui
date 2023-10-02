import type { ReactNode } from 'react';

import classNames from '../../utilities/classNames';
import useAppSelector from '../../store/hooks/useAppSelector';

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
  const isLoadingPosition = useAppSelector(
    (state) => state.loading.isLoadingPosition
  );
  const isLoadingRequest = useAppSelector(
    (state) => state.loading.isLoadingRequest
  );

  function classes() {
    return classNames([
      'button',
      { 'button--disabled': disabled },
      { 'button--full-width': fullWidth },
      { 'button--loading': isLoadingRequest || isLoadingPosition },
      { 'button--primary': primary },
      { 'button--secondary': secondary },
    ]);
  }

  return (
    <button
      className={classes()}
      disabled={disabled || isLoadingRequest || isLoadingPosition}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
