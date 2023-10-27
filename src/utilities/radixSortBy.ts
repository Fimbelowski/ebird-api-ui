import getNumDigits from './getNumDigits';
import getNthDigitFromRight from './getNthDigitFromRight';

export default function radixSortBy<T>(
  items: T[],
  transformer: (item: T) => number
) {
  const maxDigits = items.reduce(
    (previousValue, currentValue) =>
      Math.max(previousValue, getNumDigits(transformer(currentValue))),
    -Infinity
  );

  let negativeWhenTransformedItems: T[] = [];
  let positiveWhenTransformedItems: T[] = [];

  items.forEach((item) => {
    if (transformer(item) < 0) {
      negativeWhenTransformedItems.push(item);
    } else {
      positiveWhenTransformedItems.push(item);
    }
  });

  for (let i = 0; i < maxDigits; i++) {
    const negativeBuckets: T[][] = new Array(10).fill(undefined).map(() => []);
    const positiveBuckets: T[][] = new Array(10).fill(undefined).map(() => []);

    negativeWhenTransformedItems.forEach((item) => {
      negativeBuckets[getNthDigitFromRight(transformer(item) * -1, i + 1)].push(
        item
      );
    });

    positiveWhenTransformedItems.forEach((item) =>
      positiveBuckets[getNthDigitFromRight(transformer(item), i + 1)].push(item)
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
