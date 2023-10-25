function getNumDigits(value: number) {
  return Math.floor(Math.log10(Math.abs(value)) + 1);
}

function getNthDigitFromRight(value: number, n: number) {
  return Math.floor(Math.abs(value) / Math.pow(10, n - 1)) % 10;
}

export default function radixSortBy<T>(
  items: T[],
  transformer: (item: T) => number
) {
  const negativeWhenTransformedItems: T[] = [];
  const positiveWhenTransformedItems: T[] = [];

  items.forEach((item) => {
    if (transformer(item) < 0) {
      negativeWhenTransformedItems.push(item);
    } else {
      positiveWhenTransformedItems.push(item);
    }
  });

  const sortedNegativeWhenTransformedItems: T[] =
    negativeWhenTransformedItems.length > 0
      ? radixSortBy(
          negativeWhenTransformedItems,
          (item: T) => transformer(item) * -1
        ).reverse()
      : [];

  let sortedPositiveWhenTransformedItems: T[] = [
    ...positiveWhenTransformedItems,
  ];

  const maxDigits = positiveWhenTransformedItems.reduce(
    (previousValue, currentValue) =>
      Math.max(previousValue, getNumDigits(transformer(currentValue))),
    -Infinity
  );

  for (let i = 0; i < maxDigits; i++) {
    const buckets: T[][] = new Array(10).fill(undefined).map(() => []);

    sortedPositiveWhenTransformedItems.forEach((item) =>
      buckets[getNthDigitFromRight(transformer(item), i + 1)].push(item)
    );

    sortedPositiveWhenTransformedItems = buckets.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue],
      []
    );
  }

  return [
    ...sortedNegativeWhenTransformedItems,
    ...sortedPositiveWhenTransformedItems,
  ];
}
