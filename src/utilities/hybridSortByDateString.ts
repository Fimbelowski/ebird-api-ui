import fromSchwartzian from './fromSchwartzian';
import hybridSortBy from './hybridSortBy';
import { type SchwartzianTransform } from './toSchwartzian';
import { toSchwartzian } from './toSchwartzian';

export default function hybridSortByDateString<T>(
  items: T[],
  transformer: SchwartzianTransform<T>
) {
  const schwartzianItems = toSchwartzian(items, transformer);

  const itemsWithoutValidDate = schwartzianItems.filter(
    ([, transformedValue]) => isNaN(transformedValue)
  );
  const itemsWithValidDate = schwartzianItems.filter(
    ([, transformedValue]) => !isNaN(transformedValue)
  );

  return [
    ...fromSchwartzian(itemsWithoutValidDate),
    ...hybridSortBy(fromSchwartzian(itemsWithValidDate), transformer),
  ];
}
