import type EbirdLocation from '../types/EbirdLocation';
import type LocationTableProps from '../types/LocationTableProps';
import MapsLink from './MapsLink';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

const cells: Array<TableCell<EbirdLocation>> = [
  {
    callback: ({ hierarchicalName }) => hierarchicalName,
    wrap: true,
  },
  {
    callback: ({ countryName }) => countryName,
  },
  {
    callback: (item) => <MapsLink location={item} />,
  },
];

const headers: TableHeader[] = [
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

export default function EbirdLocationTableSimple({
  locations,
}: LocationTableProps) {
  return (
    <Table<EbirdLocation>
      cells={cells}
      headers={headers}
      items={locations}
    />
  );
}
