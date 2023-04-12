import type { ChangeEvent } from 'react';

export default function getValueFromChangeEvent(
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const {
    target: { value },
  } = event;
  return value;
}
