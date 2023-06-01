import { type FormEvent, type ReactNode } from 'react';

import Button from './Button/Button';

interface Props {
  children?: ReactNode;
  disableSubmit?: boolean;
  loading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  children,
  disableSubmit = false,
  loading,
  onSubmit,
}: Props) {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
    >
      {children}
      <Button
        disabled={disableSubmit}
        loading={loading}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
