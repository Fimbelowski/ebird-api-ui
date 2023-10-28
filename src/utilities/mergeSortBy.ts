import {
  type SchwartzianItem,
  type SchwartzianTransform,
  toSchwartzian,
} from './toSchwartzian';

export default function mergeSortBy<T>(
  items: T[],
  transformer: SchwartzianTransform<T>
) {
  const schwartzianItems = toSchwartzian(items, transformer);
  return schwartzianMergeSort(schwartzianItems).map(
    ([originalItem]) => originalItem
  );
}

function schwartzianMergeSort<T>(
  schwartzianItems: Array<SchwartzianItem<T>>
): Array<SchwartzianItem<T>> {
  if (schwartzianItems.length <= 1) {
    return schwartzianItems;
  }

  const { length } = schwartzianItems;
  const middle = length / 2;

  const left = schwartzianMergeSort(schwartzianItems.slice(0, middle));
  const right = schwartzianMergeSort(schwartzianItems.slice(middle));

  return merge(left, right);
}

function merge<T>(
  left: Array<SchwartzianItem<T>>,
  right: Array<SchwartzianItem<T>>
) {
  const result: Array<SchwartzianItem<T>> = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const [, leftTransformedValue] = left[i];
    const [, rightTransformedValue] = right[j];

    if (leftTransformedValue <= rightTransformedValue) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  if (i < left.length) {
    result.push(...left.slice(i));
  } else if (j < right.length) {
    result.push(...right.slice(j));
  }

  return result;
}
