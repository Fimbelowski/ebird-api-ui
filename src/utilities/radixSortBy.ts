import getNumDigits from './getNumDigits';
import getNthDigitFromRight from './getNthDigitFromRight';
import { type SchwartzianTransform, toSchwartzian } from './toSchwartzian';

type ItemAndTransformedValue<T> = [T, number];

export default function radixSortBy<T>(
  items: T[],
  transformer: SchwartzianTransform<T>
): T[] {
  const schwartzianItems = toSchwartzian(items, transformer);

  const maxDigits = schwartzianItems.reduce(
    (previousValue, [, transformedValue]) =>
      Math.max(previousValue, getNumDigits(transformedValue)),
    -Infinity
  );

  let negativeSchwartzianItems: Array<ItemAndTransformedValue<T>> =
    schwartzianItems.filter(([, transformedValue]) => transformedValue < 0);
  let positiveSchwartzianItems: Array<ItemAndTransformedValue<T>> =
    schwartzianItems.filter(([, transformedValue]) => transformedValue >= 0);

  for (let i = 0; i < maxDigits; i++) {
    const negativeBuckets: Array<Array<ItemAndTransformedValue<T>>> = new Array(
      10
    )
      .fill(undefined)
      .map(() => []);
    const positiveBuckets: Array<Array<ItemAndTransformedValue<T>>> = new Array(
      10
    )
      .fill(undefined)
      .map(() => []);

    negativeSchwartzianItems.forEach((schwartzianItem) => {
      negativeBuckets[getNthDigitFromRight(schwartzianItem[1], i + 1)].push(
        schwartzianItem
      );
    });

    positiveSchwartzianItems.forEach((schwartzianItem) =>
      positiveBuckets[getNthDigitFromRight(schwartzianItem[1], i + 1)].push(
        schwartzianItem
      )
    );

    negativeSchwartzianItems = negativeBuckets.flat();
    positiveSchwartzianItems = positiveBuckets.flat();
  }

  return [
    ...negativeSchwartzianItems.map(([originalItem]) => originalItem).reverse(),
    ...positiveSchwartzianItems.map(([originalItem]) => originalItem),
  ];
}
