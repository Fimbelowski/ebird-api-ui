import { type ReactNode } from 'react';

import classNames from '../utilities/classNames';

interface Props {
  className?: string;
  children?: ReactNode;
  title: string;
}

export default function BasePage({ className = '', children, title }: Props) {
  function sectionClasses() {
    return classNames(['base-page', className]);
  }

  return (
    <section className={sectionClasses()}>
      <h2 className="base-page__title">{title}</h2>
      {children}
    </section>
  );
}
