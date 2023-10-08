import type EbirdLocation from '../types/EbirdLocation';
import GoogleMapsLink from './GoogleMapsLink';
import type LocationTableProps from '../types/LocationTableProps';
import { Table, type TableColumnArray } from './Table/Table';

export default function EbirdLocationTableSimple({
  locations,
}: LocationTableProps) {
  const tableColumns: TableColumnArray<EbirdLocation> = [
    {
      callback: ({ hierarchicalName }) => hierarchicalName,
      label: 'Name',
      wrap: true,
    },
    {
      callback: ({ countryName }) => countryName,

      label: 'Country',
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
      label: 'View on Google Maps',
    },
  ];

  return (
    <Table
      columns={tableColumns}
      items={locations}
    />
  );
}
