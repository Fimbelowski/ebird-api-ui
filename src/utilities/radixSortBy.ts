type KeysCorrespondingToValueType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

type KeysCorrespondingToNumericValue<T> = KeysCorrespondingToValueType<
  T,
  number
>;

type Iteratee<T, V> = KeysCorrespondingToValueType<T, V> | ((item: T) => V);

type NumericIteratee<T> = Iteratee<T, number>;

function getNumDigits(value: number) {
  return Math.floor(Math.log10(Math.abs(value)) + 1);
}

function getNthDigitFromRight(value: number, n: number) {
  return Math.floor(Math.abs(value) / Math.pow(10, n - 1)) % 10;
}

function getValueFromIteratee<
  T extends Record<KeysCorrespondingToNumericValue<T>, number>
>(item: T, iteratee: NumericIteratee<T>) {
  return typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
}

export default function radixSortBy<
  T extends Record<KeysCorrespondingToNumericValue<T>, number>
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
