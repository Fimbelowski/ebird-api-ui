import type EbirdLocation from '../types/EbirdLocation';
import GoogleMapsLink from './GoogleMapsLink';
import type LocationTableProps from '../types/LocationTableProps';
import { Table, type TableCellArray, type TableHeader } from './Table';

export default function EbirdLocationTableSimple({
  locations,
}: LocationTableProps) {
  const tableCells: TableCellArray<EbirdLocation> = [
    {
      callback: ({ hierarchicalName }) => hierarchicalName,
      wrap: true,
    },
    {
      callback: ({ countryName }) => countryName,
    },
    {
      callback: (item) => <GoogleMapsLink location={item} />,
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      label: 'Country',
    },
    {
      label: 'View on Google Maps',
    },
  ];

  return (
    <Table
      cells={tableCells}
      headers={tableHeaders}
      items={locations}
    />
  );
}
