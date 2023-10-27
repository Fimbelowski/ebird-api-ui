import { type SortConfig, SortDirection } from '../Table/Table';

interface Props<T> {
  activeSortConfig: SortConfig<T> | undefined;
  activeSortDirection: SortDirection;
  onClick: (sortConfig: SortConfig<T>) => void;
  sortConfig: SortConfig<T>;
}

export default function TableSortControls<T>({
  activeSortConfig,
  activeSortDirection,
  onClick,
  sortConfig,
}: Props<T>) {
  function sortIcon() {
    if (
      activeSortConfig?.id !== sortConfig.id ||
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
