import type EbirdLocation from '../types/EbirdLocation';
import type LocationTableProps from '../types/LocationTableProps';
import { Table, type TableColumnArray } from './Table/Table';

export default function DetailedLocationTable({
  locations,
}: LocationTableProps) {
  const tableColumns: TableColumnArray<EbirdLocation> = [
    {
      callback: ({ locId }) => locId,
      label: 'locId',
    },
    {
      callback: ({ name }) => name,
      label: 'name',
    },
    {
      align: 'right',
      callback: ({ latitude }) => latitude.toLocaleString(),
      label: 'latitude',
    },
    {
      align: 'right',
      callback: ({ longitude }) => longitude.toLocaleString(),
      label: 'longitude',
    },
    {
      callback: ({ countryCode }) => countryCode,
      label: 'countryCode',
    },
    {
      callback: ({ countryName }) => countryName,
      label: 'countryName',
    },
    {
      callback: ({ subnational1Name }) => subnational1Name,
      label: 'subnational1Name',
    },
    {
      callback: ({ subnational1Code }) => subnational1Code,
      label: 'subnational1Code',
    },
    {
      callback: ({ subnational2Code }) => subnational2Code,
      label: 'subnational2Code',
    },
    {
      callback: ({ subnational2Name }) => subnational2Name,
      label: 'subnational2Name',
    },
    {
      callback: ({ isHotspot }) => isHotspot.toString(),
      label: 'isHotspot',
    },
    {
      callback: ({ locName }) => locName,
      label: 'locName',
    },
    {
      align: 'right',
      callback: ({ lat }) => lat.toLocaleString(),
      label: 'lat',
    },
    {
      align: 'right',
      callback: ({ lng }) => lng.toLocaleString(),
      label: 'lng',
    },
    {
      callback: ({ hierarchicalName }) => hierarchicalName,
      label: 'hierarchicalName',
    },
    {
      callback: ({ locID }) => locID,
      label: 'locID',
    },
  ];

  return (
    <Table
      columns={tableColumns}
      items={locations}
    />
  );
}
