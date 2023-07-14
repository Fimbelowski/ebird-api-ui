import type { ReactNode } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">{children}</main>
      <Footer />
    </div>
  );
}
