import type EbirdHotspot from '../types/EbirdHotspot';
import type HotspotTableProps from '../types/HotspotTableProps';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

const cells: Array<TableCell<EbirdHotspot>> = [
  {
    callback: (item) => item.locId,
  },
  {
    callback: (item) => item.locName,
  },
  {
    callback: (item) => item.countryCode,
  },
  {
    callback: (item) => item.subnational1Code,
  },
  {
    callback: (item) => item.subnational2Code,
  },
  {
    align: 'right',
    callback: (item) => item.lat.toLocaleString(),
  },
  {
    align: 'right',
    callback: (item) => item.lng.toLocaleString(),
  },
  {
    callback: (item) => item.latestObsDt,
  },
  {
    align: 'right',
    callback: (item) => item.numSpeciesAllTime.toLocaleString(),
  },
];

const headers: TableHeader[] = [
  {
    label: 'locId',
  },
  {
    label: 'locName',
  },
  {
    label: 'countryCode',
  },
  {
    label: 'subnational1Code',
  },
  {
    label: 'subnational2Code',
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
    label: 'latestObsDt',
  },
  {
    align: 'right',
    label: 'numSpeciesAllTime',
  },
];

export default function DetailedHotspotTable({ hotspots }: HotspotTableProps) {
  return (
    <Table<EbirdHotspot>
      cells={cells}
      headers={headers}
      items={hotspots}
    />
  );
}
