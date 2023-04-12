import { type ReactNode } from 'react';

import classNames from '../utilities/classNames';

interface Props {
  children?: ReactNode;
  disabled?: boolean;
  text: string;
}

export default function Tooltip({ children, disabled = false, text }: Props) {
  function textClasses() {
    return classNames([
      'tooltip__text',
      { 'tooltip__text--disabled': disabled },
    ]);
  }

  return (
    <span className="tooltip">
      {children}
      <span className={textClasses()}>{text}</span>
    </span>
  );
}
