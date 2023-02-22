import { type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  title: string;
}

export default function BasePage({ children, title }: Props) {
  return (
    <section className="base-page">
      <h2 className="base-page__title">{title}</h2>
      {children}
    </section>
  );
}
