import { type ReactNode, useMemo, useState } from 'react';

import Pagination from '../Pagination/Pagination';
import TableCell from '../TableCell/TableCell';
import TableHeader from '../TableHeader/TableHeader';
import usePagination from '../../hooks/usePagination';
import TableSortControls from '../TableSortControls/TableSortControls';

type Sort<T> = (items: T[]) => T[];

export enum SortDirection {
  None,
  Ascending,
  Descending,
}

interface SortConfig<T> {
  id: string;
  initialSortDirection: SortDirection;
  sort: Sort<T>;
}

interface Column<T> {
  align?: 'left' | 'center' | 'right';
  callback: (item: T) => string | ReactNode;
  label: string;
  sortConfig?: SortConfig<T>;
  wrap?: boolean;
}

type ColumnArray<T> = Array<Column<T>>;

interface Props<T> {
  columns: ColumnArray<T>;
  hidePagination?: boolean;
  items: T[];
}

export type {
  Column as TableColumn,
  ColumnArray as TableColumnArray,
  Props as TableProps,
  Sort,
  SortConfig,
};

export function Table<T>({ columns, hidePagination = false, items }: Props<T>) {
  const [activeSortConfig, setActiveSortConfig] = useState<SortConfig<T>>();
  const [activeSortDirection, setActiveSortDirection] = useState(
    SortDirection.None
  );

  const sortedItems = useMemo(
    () => getSortedItems(items),
    [items, activeSortConfig, activeSortDirection]
  );

  const { itemsPerPage, page, paginatedItems, setItemsPerPage, setPage } =
    usePagination(sortedItems);

  function Headers() {
    const listItems = columns.map(
      ({ align = 'left', label, sortConfig }, index) => {
        const sortControls =
          sortConfig === undefined ? null : (
            <TableSortControls<T>
              activeSortConfig={activeSortConfig}
              activeSortDirection={activeSortDirection}
              onClick={onSortControlsClick}
              sortConfig={sortConfig}
            />
          );

        return (
          <TableHeader
            align={align}
            key={index}
            label={label}
            sortControls={sortControls}
            stretch={index === 0}
          />
        );
      }
    );

    return <tr>{listItems}</tr>;
  }

  function Rows() {
    const listItems = paginatedItems.map((item, itemIndex) => {
      const tds = columns.map(
        ({ align = 'left', callback, wrap = false }, cellIndex) => {
          return (
            <TableCell
              key={cellIndex}
              align={align}
              callback={callback}
              item={item}
              wrap={wrap}
            />
          );
        }
      );

      return (
        <tr
          className="table__tr"
          key={itemIndex}
        >
          {tds}
        </tr>
      );
    });

    return <>{listItems}</>;
  }

  function onSortControlsClick(sortConfig: SortConfig<T>) {
    const { initialSortDirection } = sortConfig;

    if (activeSortConfig !== sortConfig) {
      setActiveSortConfig(sortConfig);
      setActiveSortDirection(initialSortDirection);
    } else if (activeSortDirection === initialSortDirection) {
      setActiveSortDirection(
        initialSortDirection === SortDirection.Ascending
          ? SortDirection.Descending
          : SortDirection.Ascending
      );
    } else {
      setActiveSortConfig(undefined);
      setActiveSortDirection(SortDirection.None);
    }
  }

  function getSortedItems(items: T[]) {
    if (activeSortConfig === undefined) {
      return items;
    }

    const { initialSortDirection, sort } = activeSortConfig;

    const sortedItems = sort(items);

    return activeSortDirection === initialSortDirection
      ? sortedItems
      : sortedItems.reverse();
  }

  return (
    <>
      <div className="table__container">
        <table className="table__table">
          <thead className="table__thead">
            <Headers />
          </thead>
          <tbody className="table__tbody">
            <Rows />
          </tbody>
        </table>
      </div>
      {hidePagination ? null : (
        <Pagination
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          onPageChange={setPage}
          page={page}
          totalItems={items.length}
        />
      )}
    </>
  );
}
