import type { ChangeEvent } from 'react';

export default function getValueFromChangeEvent({
  target: { value },
}: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  return value;
}
