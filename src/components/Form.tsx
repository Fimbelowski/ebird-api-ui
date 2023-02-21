import { type FormEvent, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: Props) {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
