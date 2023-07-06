import type { ReactNode } from 'react';

import Header from '../Header/Header';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
    </div>
  );
}
