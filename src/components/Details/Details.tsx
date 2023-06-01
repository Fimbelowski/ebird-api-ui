import { type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  open?: boolean;
  summary: string;
}

export default function Details({ children, open = false, summary }: Props) {
  return (
    <details
      className="details"
      open={open}
    >
      <summary className="details__summary">{summary}</summary>
      <div className="details__content">{children}</div>
    </details>
  );
}
