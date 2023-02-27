import { type FormEvent, type ReactNode } from 'react';

import Button from './Button';

interface Props {
  children?: ReactNode;
  id: string;
  loading?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  children,
  id,
  loading = false,
  onSubmit,
}: Props) {
  return (
    <form
      className="form"
      id={id}
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
