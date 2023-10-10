import { type Sort, SortDirection } from './Table/Table';

interface Props<T> {
  activeSort?: Sort<T>;
  activeSortDirection: SortDirection;
  onClick: (sort: Sort<T>) => void;
  sort: Sort<T>;
}

export default function TableSortControls<T>({
  activeSort,
  activeSortDirection,
  onClick: onClickProp,
  sort,
}: Props<T>) {
  function onClick() {
    onClickProp(sort);
  }

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

  return <span onClick={onClick}>{sortIcon()}</span>;
}
