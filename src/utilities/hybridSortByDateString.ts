import dateStringToEpochMilliseconds from './dateStringToEpochMilliseconds';
import fromSchwartzian from './fromSchwartzian';
import hybridSortBy from './hybridSortBy';
import { toSchwartzian } from './toSchwartzian';

export default function hybridSortByDateString<T>(
  items: T[],
  transformer: (item: T) => string
) {
  function modifiedTransformer(item: T) {
    return dateStringToEpochMilliseconds(transformer(item));
  }

  const schwartzianItems = toSchwartzian(items, modifiedTransformer);

  const itemsWithoutValidDate = schwartzianItems.filter(
    ([, transformedValue]) => isNaN(transformedValue)
  );
  const itemsWithValidDate = schwartzianItems.filter(
    ([, transformedValue]) => !isNaN(transformedValue)
  );

  return [
    ...fromSchwartzian(itemsWithoutValidDate),
    ...hybridSortBy(fromSchwartzian(itemsWithValidDate), modifiedTransformer),
  ];
}
