import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  legendText: string;
}

export default function Fieldset({ children, legendText }: Props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset__legend">{legendText}</legend>
      <div className="fieldset__content">{children}</div>
    </fieldset>
  );
}
