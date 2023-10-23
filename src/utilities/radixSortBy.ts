function getNumDigits(value: number) {
  return Math.floor(Math.log10(value) + 1);
}

function getNthDigitFromRight(value: number, n: number) {
  return Math.floor(Math.abs(value) / Math.pow(10, n - 1)) % 10;
}

export default function radixSortBy<T>(
  items: T[],
  transformer: (item: T) => number
) {
  const maxDigits = items.reduce(
    (previousValue, currentValue) =>
      Math.max(previousValue, getNumDigits(transformer(currentValue))),
    -Infinity
  );

  let result: T[] = [...items];

  for (let i = 0; i < maxDigits; i++) {
    const buckets: T[][] = new Array(10).fill(undefined).map(() => []);

    result.forEach((item) =>
      buckets[getNthDigitFromRight(transformer(item), i + 1)].push(item)
    );

    result = buckets.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue],
      []
    );
  }

  return result;
}
