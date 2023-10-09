import { type ReactNode, useState } from 'react';

import Pagination from '../Pagination/Pagination';
import TableCell from '../TableCell/TableCell';
import TableHeader from '../TableHeader/TableHeader';
import usePagination from '../../hooks/usePagination';

type Sort<T> = (items: T[]) => T[];

export enum SortDirection {
  None,
  Ascending,
  Descening,
}

interface Column<T> {
  align?: 'left' | 'center' | 'right';
  callback: (item: T) => string | ReactNode;
  label: string;
  sort?: Sort<T>;
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
};

export function Table<T>({ columns, hidePagination = false, items }: Props<T>) {
  const { itemsPerPage, page, paginatedItems, setItemsPerPage, setPage } =
    usePagination(items);

  const [activeSort, setActiveSort] = useState<Sort<T>>();
  const [activeSortDirection, setActiveSortDirection] = useState(
    SortDirection.None
  );

  function Headers() {
    const listItems = columns.map(({ align = 'left', label, sort }, index) => {
      return (
        <TableHeader
          activeSort={activeSort}
          activeSortDirection={activeSortDirection}
          align={align}
          key={index}
          label={label}
          sort={sort}
        />
      );
    });

    return <tr>{listItems}</tr>;
  }

  function Rows() {
    const listItems = paginatedItems().map((item, itemIndex) => {
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
