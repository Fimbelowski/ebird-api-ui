import { type Sort, type SortConfig, SortDirection } from '../Table/Table';

interface Props<T> {
  activeSort: Sort<T> | undefined;
  activeSortDirection: SortDirection;
  onClick: (sortConfig: SortConfig<T>) => void;
  sortConfig: SortConfig<T>;
}

export default function TableSortControls<T>({
  activeSort,
  activeSortDirection,
  onClick,
  sortConfig,
}: Props<T>) {
  function sortIcon() {
    if (
      activeSort !== sortConfig.sort ||
      activeSortDirection === SortDirection.None
    ) {
      return '▲▼';
    }

    switch (activeSortDirection) {
      case SortDirection.Ascending:
        return '▲';
      case SortDirection.Descending:
        return '▼';
    }
  }

  return (
    <span
      className="table-sort-controls"
      onClick={() => {
        onClick(sortConfig);
      }}
    >
      {sortIcon()}
    </span>
  );
}
