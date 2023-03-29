import type EbirdRegion from '../types/EbirdRegion';
import {
  Table,
  type TableHeader,
  type TableCellArray,
} from '../components/Table';

interface Props {
  regions: EbirdRegion[];
}

export default function EbirdRegionTable({ regions }: Props) {
  const tableCells: TableCellArray<EbirdRegion> = [
    {
      callback: ({ name }) => name,
    },
    {
      callback: ({ code }) => code,
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      label: 'Code',
    },
  ];

  return (
    <Table
      cells={tableCells}
      headers={tableHeaders}
      items={regions}
    />
  );
}
