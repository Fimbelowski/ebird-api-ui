import getNumDigits from './getNumDigits';
import getNthDigitFromRight from './getNthDigitFromRight';
import getValueFromIteratee from './getValueFromIteratee';
import type { KeysCorrespondingToNumericValues } from '../types/KeysCorrespondingToValueType';
import type { NumericIteratee } from '../types/Iteratee';

export default function radixSortBy<
  T extends Record<KeysCorrespondingToNumericValues<T>, number>
>(items: T[], iteratee: NumericIteratee<T>) {
  function partialGetValueFromIteratee(item: T) {
    return getValueFromIteratee(item, iteratee);
  }

  let negativeWhenTransformedItems: T[] = [];
  let positiveWhenTransformedItems: T[] = [];

  items.forEach((item) => {
    if (partialGetValueFromIteratee(item) < 0) {
      negativeWhenTransformedItems.push(item);
    } else {
      positiveWhenTransformedItems.push(item);
    }
  });

  if (negativeWhenTransformedItems.length > 0) {
    negativeWhenTransformedItems = radixSortBy(
      negativeWhenTransformedItems,
      (item: T) => partialGetValueFromIteratee(item) * -1
    ).reverse();
  }

  const maxDigits = positiveWhenTransformedItems.reduce(
    (previousValue, currentValue) =>
      Math.max(
        previousValue,
        getNumDigits(partialGetValueFromIteratee(currentValue))
      ),
    -Infinity
  );

  for (let i = 0; i < maxDigits; i++) {
    const buckets: T[][] = new Array(10).fill(undefined).map(() => []);

    positiveWhenTransformedItems.forEach((item) =>
      buckets[
        getNthDigitFromRight(partialGetValueFromIteratee(item), i + 1)
      ].push(item)
    );

    positiveWhenTransformedItems = buckets.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue],
      []
    );
  }

  return [...negativeWhenTransformedItems, ...positiveWhenTransformedItems];
}
