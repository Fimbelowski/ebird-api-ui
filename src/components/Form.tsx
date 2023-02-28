import { type FormEvent, type ReactNode } from 'react';

import Button from './Button';

interface Props {
  children?: ReactNode;
  loading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, loading, onSubmit }: Props) {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
    >
      {children}
      <Button
        loading={loading}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
