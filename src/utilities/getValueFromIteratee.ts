import type { Iteratee } from '../types/Iteratee';

export default function getValueFromIteratee<T, V>(
  item: T,
  iteratee: Iteratee<T, V>
) {
  return typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
}
