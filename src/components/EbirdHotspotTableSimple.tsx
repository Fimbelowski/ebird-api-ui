import type EbirdHotspot from '../types/EbirdHotspot';
import GoogleMapsLink from './GoogleMapsLink';
import type HotspotTableProps from '../types/HotspotTableProps';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

const cells: Array<TableCell<EbirdHotspot>> = [
  {
    callback: ({ locName }) => locName,
    wrap: true,
  },
  {
    align: 'right',
    callback: ({ numSpeciesAllTime = 0 }) => numSpeciesAllTime.toLocaleString(),
  },
  {
    callback: ({ latestObsDt }) =>
      latestObsDt === undefined ? (
        'N/A'
      ) : (
        <time>{new Date(latestObsDt).toLocaleString()}</time>
      ),
  },
  {
    callback: (item) => <GoogleMapsLink location={item} />,
  },
];

const headers: TableHeader[] = [
  {
    label: 'Name',
  },
  {
    align: 'right',
    label: 'Species Observed',
  },
  {
    label: 'Latest Observation',
  },
  {
    label: 'View on Google Maps',
  },
];

export default function EbirdHotspotTableSimple({
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
