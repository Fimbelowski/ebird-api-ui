// https://en.wikipedia.org/wiki/Schwartzian_transform

export type SchwartzianItem<T> = [T, number];
export type SchwartzianTransform<T> = (item: T) => number;

export function toSchwartzian<T>(
  items: T[],
  transformer: SchwartzianTransform<T>
): Array<SchwartzianItem<T>> {
  return items.map((item) => [item, transformer(item)]);
}
