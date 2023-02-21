import type { ChangeEvent } from 'react';

export default function getValueFromChangeEvent(
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { target } = event;
  const { value } = target;

  return value;
}
