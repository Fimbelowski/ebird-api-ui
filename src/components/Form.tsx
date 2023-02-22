import { type FormEvent, type ReactNode } from 'react';

import Button from './Button';

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
      <Button type="submit">Submit</Button>
    </form>
  );
}
