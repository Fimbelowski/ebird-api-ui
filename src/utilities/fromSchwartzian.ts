import type { SchwartzianItem } from './toSchwartzian';

export default function fromSchwartzian<T>(
  schwartzianItems: Array<SchwartzianItem<T>>
) {
  return schwartzianItems.map(([originalItem]) => originalItem);
}
