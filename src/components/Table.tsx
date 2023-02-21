import type TableCellCallback from '../types/TableCellCallback';
import type TableHeader from '../types/TableHeader';

interface Props<T> {
  cellCallbacks: Array<TableCellCallback<T>>;
  headers: TableHeader[];
  items: T[];
}

export default function Table<T>({ cellCallbacks, headers, items }: Props<T>) {
  function Headers() {
    const listItems = headers.map(({ align = 'left', label }, index) => (
      <th
        className="table__th"
        key={index}
      >
        {label}
      </th>
    ));

    return <tr>{listItems}</tr>;
  }

  function Rows() {
    const listItems = items.map((item, itemIndex) => {
      const tds = cellCallbacks.map((cellCallback, cellCallbackIndex) => {
        return (
          <td
            className="table__td"
            key={cellCallbackIndex}
          >
            {cellCallback(item)}
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
