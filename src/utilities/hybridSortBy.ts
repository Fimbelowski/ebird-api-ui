import getNumDigits from './getNumDigits';
import mergeSortBy from './mergeSortBy';
import radixSortBy from './radixSortBy';
import { type SchwartzianTransform, toSchwartzian } from './toSchwartzian';

export default function hybridSortBy<T>(
  items: T[],
  transformer: SchwartzianTransform<T>
) {
  const schwartzianItems = toSchwartzian(items, transformer);
  const { length } = schwartzianItems;

  const maxDigits = schwartzianItems.reduce(
    (accumulator, [, transformedValue]) =>
      Math.max(accumulator, getNumDigits(transformedValue)),
    -Infinity
  );

  const radixSortComplexity = length * maxDigits;
  const mergeSortComplexity = length * Math.log10(length);

  return radixSortComplexity >= mergeSortComplexity
    ? mergeSortBy(items, transformer)
    : radixSortBy(items, transformer);
}
