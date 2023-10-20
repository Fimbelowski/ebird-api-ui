import { type SortConfig, SortDirection } from '../Table/Table';

interface Props<T> {
  activeSortDirection: SortDirection;
  onClick: (sortConfig: SortConfig<T>) => void;
  sortConfig: SortConfig<T>;
}

export default function TableSortControls<T>({
  activeSortDirection,
  onClick,
  sortConfig,
}: Props<T>) {
  function sortIcon() {
    switch (activeSortDirection) {
      case SortDirection.None:
        return '▲▼';
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
