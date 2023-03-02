import type EbirdHotspot from '../types/EbirdHotspot';
import type HotspotTableProps from '../types/HotspotTableProps';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

const cells: Array<TableCell<EbirdHotspot>> = [
  {
    callback: ({ locId }) => locId,
  },
  {
    callback: ({ locName }) => locName,
  },
  {
    callback: ({ countryCode }) => countryCode,
  },
  {
    callback: ({ subnational1Code }) => subnational1Code,
  },
  {
    callback: ({ subnational2Code }) => subnational2Code,
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
    callback: ({ latestObsDt = 'N/A' }) => latestObsDt,
  },
  {
    align: 'right',
    callback: ({ numSpeciesAllTime = 0 }) => numSpeciesAllTime.toLocaleString(),
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

export default function EbirdHotspotTableDetailed({
  hotspots,
}: HotspotTableProps) {
  return (
    <Table<EbirdHotspot>
      cells={cells}
      headers={headers}
      items={hotspots}
    />
  );
}
