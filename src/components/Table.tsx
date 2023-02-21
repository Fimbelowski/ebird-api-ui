import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

interface Props<T> {
  cells: Array<TableCell<T>>;
  headers: TableHeader[];
  items: T[];
}

export default function Table<T>({ cells, headers, items }: Props<T>) {
  function Headers() {
    const listItems = headers.map(({ align = 'left', label }, index) => (
      <th key={index}>{label}</th>
    ));

    return <tr>{listItems}</tr>;
  }

  return (
    <table className="table">
      <thead className="table__thead">
        <Headers />
      </thead>
      <tbody className="table__tbody"></tbody>
    </table>
  );
}
