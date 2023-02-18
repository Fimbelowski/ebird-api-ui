import { type ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
  title: string;
}

export default function BasePage({ className = '', children, title }: Props) {
  const classes = ['base-page', className].join(' ');

  return (
    <section className={classes}>
      <h2 className="base-page__title">{title}</h2>
      {children}
    </section>
  );
}
