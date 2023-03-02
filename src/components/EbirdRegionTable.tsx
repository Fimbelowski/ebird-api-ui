import type EbirdRegion from '../types/EbirdRegion';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

interface Props {
  regions: EbirdRegion[];
}

export default function EbirdRegionTable({ regions }: Props) {
  const headers: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      label: 'Code',
    },
  ];

  const cells: Array<TableCell<EbirdRegion>> = [
    {
      callback: ({ name }) => name,
    },
    {
      callback: ({ code }) => code,
    },
  ];

  return (
    <Table<EbirdRegion>
      cells={cells}
      headers={headers}
      items={regions}
    />
  );
}
