import { type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Header({ children }: Props) {
  return (
    <header className="header">
      <h1>eBird API UI</h1>
      {children}
    </header>
  );
}
