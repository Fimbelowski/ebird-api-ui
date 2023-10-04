import { type ReactNode, useState } from 'react';

import classNames from '../../utilities/classNames';
import Pagination from '../Pagination/Pagination';
import {
  TableHeader,
  type TableHeaderPropsArray,
} from '../TableHeader/TableHeader';

export interface TableCell<T> {
  align?: 'left' | 'center' | 'right';
  callback: (item: T) => string | ReactNode;
  wrap?: boolean;
}

export type TableCellArray<T> = Array<TableCell<T>>;

export interface TableProps<T> {
  cells: TableCellArray<T>;
  headers: TableHeaderPropsArray;
  hidePagination?: boolean;
  items: T[];
}

export function Table<T>({
  cells,
  headers,
  hidePagination = false,
  items,
}: TableProps<T>) {
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
      const tds = cells.map(({ align, callback, wrap = false }, cellIndex) => {
        const classes = classNames([
          'table__td',
          { [`table__td--${align ?? ''}`]: align !== undefined },
          { 'table__td--wrap': wrap },
        ]);

        return (
          <td
            className={classes}
            key={cellIndex}
          >
            {callback(item)}
          </td>
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
