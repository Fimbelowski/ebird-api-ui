import { useState } from 'react';

import Pagination from '../Pagination/Pagination';
import {
  TableCell,
  type TableCellConfig,
  type TableCellConfigArray,
} from '../TableCell/TableCell';
import {
  TableHeader,
  type TableHeaderProps,
  type TableHeaderPropsArray,
} from '../TableHeader/TableHeader';

interface Props<T> {
  cells: TableCellConfigArray<T>;
  headers: TableHeaderPropsArray;
  hidePagination?: boolean;
  items: T[];
}

export type {
  Props as TableProps,
  TableCellConfig,
  TableCellConfigArray,
  TableHeaderProps,
  TableHeaderPropsArray,
};

export function Table<T>({
  cells,
  headers,
  hidePagination = false,
  items,
}: Props<T>) {
  const [paginatedItems, setPaginatedItems] = useState<T[]>([]);

  function Headers() {
    const listItems = headers.map((props, index) => {
      return (
        <TableHeader
          key={index}
          {...props}
        />
      );
    });

    return <tr>{listItems}</tr>;
  }

  function Rows() {
    const listItems = paginatedItems.map((item, itemIndex) => {
      const tds = cells.map((props, cellIndex) => {
        return (
          <TableCell
            key={cellIndex}
            {...props}
            item={item}
          />
        );
      });

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
        <Pagination<T>
          items={items}
          onPaginatedItemsChange={setPaginatedItems}
        />
      )}
    </>
  );
}
