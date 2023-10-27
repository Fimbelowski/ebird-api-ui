import radixSortBy from './radixSortBy';

export default function radixSortByDateString<T>(
  items: T[],
  transformer: (item: T) => string | undefined
) {
  const itemsWithoutValidDate: T[] = [];
  const itemsWithValidDate: T[] = [];

  items.forEach((item) => {
    if (transformer(item) === undefined) {
      itemsWithoutValidDate.push(item);
    } else {
      itemsWithValidDate.push(item);
    }
  });

  return [
    ...itemsWithoutValidDate,
    ...radixSortBy(itemsWithValidDate, (item: T) =>
      new Date(transformer(item) ?? '').valueOf()
    ),
  ];
}
