import type EbirdLocation from '../types/EbirdLocation';
import type LocationTableProps from '../types/LocationTableProps';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

const cells: Array<TableCell<EbirdLocation>> = [
  {
    callback: ({ locId }) => locId,
  },
  {
    callback: ({ name }) => name,
  },
  {
    align: 'right',
    callback: ({ latitude }) => latitude.toLocaleString(),
  },
  {
    align: 'right',
    callback: ({ longitude }) => longitude.toLocaleString(),
  },
  {
    callback: ({ countryCode }) => countryCode,
  },
  {
    callback: ({ countryName }) => countryName,
  },
  {
    callback: ({ subnational1Name }) => subnational1Name,
  },
  {
    callback: ({ subnational1Code }) => subnational1Code,
  },
  {
    callback: ({ subnational2Code }) => subnational2Code,
  },
  {
    callback: ({ subnational2Name }) => subnational2Name,
  },
  {
    callback: ({ isHotspot }) => isHotspot.toString(),
  },
  {
    callback: ({ locName }) => locName,
  },
  {
    align: 'right',
    callback: ({ lat }) => lat.toLocaleString(),
  },
  {
    align: 'right',
    callback: ({ lng }) => lng.toLocaleString(),
  },
  {
    callback: ({ hierarchicalName }) => hierarchicalName,
  },
  {
    callback: ({ locID }) => locID,
  },
];

const headers: TableHeader[] = [
  {
    label: 'locId',
  },
  {
    label: 'name',
  },
  {
    align: 'right',
    label: 'latitude',
  },
  {
    align: 'right',
    label: 'longitude',
  },
  {
    label: 'countryCode',
  },
  {
    label: 'countryName',
  },
  {
    label: 'subnational1Name',
  },
  {
    label: 'subnational1Code',
  },
  {
    label: 'subnational2Code',
  },
  {
    label: 'subnational2Name',
  },
  {
    label: 'isHotspot',
  },
  {
    label: 'locName',
  },
  {
    align: 'right',
    label: 'lat',
  },
  {
    align: 'right',
    label: 'lng',
  },
  {
    label: 'hierarchicalName',
  },
  {
    label: 'locID',
  },
];

export default function DetailedLocationTable({
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
