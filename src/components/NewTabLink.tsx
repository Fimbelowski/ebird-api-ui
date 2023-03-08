import { type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  href: string;
}

export default function NewTabLink({ children, href }: Props) {
  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
