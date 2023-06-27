import { type ReactNode, useState } from 'react';

import classNames from '../../utilities/classNames';
import Pagination from '../Pagination/Pagination';

export interface TableCell<T> {
  align?: 'left' | 'center' | 'right';
  callback: (item: T) => string | ReactNode;
  wrap?: boolean;
}

export type TableCellArray<T> = Array<TableCell<T>>;

export interface TableHeader {
  align?: 'left' | 'center' | 'right';
  label: string;
}

export interface TableProps<T> {
  cells: TableCellArray<T>;
  headers: TableHeader[];
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
    const listItems = headers.map(({ align, label }, index) => {
      const classes = classNames([
        'table__th',
        { [`table__th--${align ?? ''}`]: align !== undefined },
      ]);

      return (
        <th
          className={classes}
          key={index}
        >
          {label}
        </th>
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
      <table className="table">
        <thead className="table__thead">
          <Headers />
        </thead>
        <tbody className="table__tbody">
          <Rows />
        </tbody>
      </table>
      {hidePagination ? null : (
        <Pagination<T>
          items={items}
          onPaginatedItemsChange={setPaginatedItems}
        />
      )}
    </>
  );
}
