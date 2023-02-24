import { type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function ResultsContainer({ children }: Props) {
  return <div className="results">{children}</div>;
}
