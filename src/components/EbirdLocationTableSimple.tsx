import type EbirdLocation from '../types/EbirdLocation';
import GoogleMapsLink from './GoogleMapsLink';
import type LocationTableProps from '../types/LocationTableProps';
import { Table, type TableCellArray } from './Table/Table';
import type { TableHeaderPropsArray } from './TableHeader/TableHeader';

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
      callback: ({ lat, lng }) => (
        <GoogleMapsLink
          latitude={lat}
          longitude={lng}
        >
          Link
        </GoogleMapsLink>
      ),
    },
  ];

  const tableHeaders: TableHeaderPropsArray = [
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
