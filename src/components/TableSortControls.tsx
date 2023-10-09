import { type Sort, SortDirection } from './Table/Table';

interface Props<T> {
  activeSort?: Sort<T>;
  activeSortDirection: SortDirection;
  sort: Sort<T>;
}

export default function TableSortControls<T>({
  activeSort,
  activeSortDirection,
  sort,
}: Props<T>) {
  function sortIcon() {
    switch (activeSortDirection) {
      case SortDirection.None:
        return 'AD';
      case SortDirection.Ascending:
        return 'A';
      case SortDirection.Descening:
        return 'D';
    }
  }

  return <span>{sortIcon()}</span>;
}
