import type EbirdLocation from '../types/EbirdLocation';
import GoogleMapsLink from './GoogleMapsLink';
import type LocationTableProps from '../types/LocationTableProps';
import useTable from '../hooks/useTable';

export default function EbirdLocationTableSimple({
  locations,
}: LocationTableProps) {
  const Table = useTable<EbirdLocation>(
    [
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
    ],
    [
      {
        label: 'Name',
      },
      {
        label: 'Country',
      },
      {
        label: 'View on Google Maps',
      },
    ]
  );

  return <Table items={locations} />;
}
