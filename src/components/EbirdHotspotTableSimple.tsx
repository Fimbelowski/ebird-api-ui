import type EbirdHotspot from '../types/EbirdHotspot';
import GoogleMapsLink from './GoogleMapsLink';
import type HotspotTableProps from '../types/HotspotTableProps';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../components/Table';

export default function EbirdHotspotTableSimple({
  hotspots,
}: HotspotTableProps) {
  const tableCells: TableCellArray<EbirdHotspot> = [
    {
      callback: ({ locName }) => locName,
      wrap: true,
    },
    {
      align: 'right',
      callback: ({ numSpeciesAllTime = 0 }) =>
        numSpeciesAllTime.toLocaleString(),
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

  const tableHeaders: TableHeader[] = [
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

  return (
    <Table
      cells={tableCells}
      headers={tableHeaders}
      items={hotspots}
    />
  );
}
