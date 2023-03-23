import Table from '../components/Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

export default function useTable<T>(
  tableCells: Array<TableCell<T>>,
  tableHeaders: TableHeader[]
) {
  function CurriedTable({ items }: { items: T[] }) {
    return (
      <Table<T>
        cells={tableCells}
        headers={tableHeaders}
        items={items}
      />
    );
  }

  return {
    Table: CurriedTable,
  };
}
