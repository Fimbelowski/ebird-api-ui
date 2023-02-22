import classNames from '../utilities/classNames';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

interface Props<T> {
  cells: Array<TableCell<T>>;
  headers: TableHeader[];
  items: T[];
}

export default function Table<T>({ cells, headers, items }: Props<T>) {
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
    const listItems = items.map((item, itemIndex) => {
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
    <table className="table">
      <thead className="table__thead">
        <Headers />
      </thead>
      <tbody className="table__tbody">
        <Rows />
      </tbody>
    </table>
  );
}
