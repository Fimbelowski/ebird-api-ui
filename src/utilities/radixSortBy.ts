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

  const maxDigits = items.reduce(
    (previousValue, currentValue) =>
      Math.max(
        previousValue,
        getNumDigits(partialGetValueFromIteratee(currentValue))
      ),
    -Infinity
  );

  let negativeWhenTransformedItems: T[] = [];
  let positiveWhenTransformedItems: T[] = [];

  items.forEach((item) => {
    if (partialGetValueFromIteratee(item) < 0) {
      negativeWhenTransformedItems.push(item);
    } else {
      positiveWhenTransformedItems.push(item);
    }
  });

  for (let i = 0; i < maxDigits; i++) {
    const negativeBuckets: T[][] = new Array(10).fill(undefined).map(() => []);
    const positiveBuckets: T[][] = new Array(10).fill(undefined).map(() => []);

    negativeWhenTransformedItems.forEach((item) => {
      negativeBuckets[
        getNthDigitFromRight(partialGetValueFromIteratee(item) * -1, i + 1)
      ].push(item);
    });

    positiveWhenTransformedItems.forEach((item) =>
      positiveBuckets[
        getNthDigitFromRight(partialGetValueFromIteratee(item), i + 1)
      ].push(item)
    );

    negativeWhenTransformedItems = negativeBuckets.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue],
      []
    );

    positiveWhenTransformedItems = positiveBuckets.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue],
      []
    );
  }

  return [...negativeWhenTransformedItems, ...positiveWhenTransformedItems];
}
