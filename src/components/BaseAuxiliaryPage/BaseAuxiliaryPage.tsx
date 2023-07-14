import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  title: string;
}

export default function BaseAuxiliaryPage({ children, title }: Props) {
  return (
    <div className="base-auxiliary-page">
      <h2 className="base-auxiliary-page__title">{title}</h2>
      {children}
    </div>
  );
}
