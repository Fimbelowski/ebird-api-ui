import { type Sort, type SortConfig, SortDirection } from '../Table/Table';

interface Props<T> {
  activeSort: Sort<T> | undefined;
  activeSortDirection: SortDirection;
  activeSortId: string | undefined;
  onClick: (sortConfig: SortConfig<T>) => void;
  sortConfig: SortConfig<T>;
}

export default function TableSortControls<T>({
  activeSort,
  activeSortDirection,
  activeSortId,
  onClick,
  sortConfig,
}: Props<T>) {
  function sortIcon() {
    if (
      activeSortId !== sortConfig.id ||
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
