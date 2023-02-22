import type EbirdHotspot from '../types/EbirdHotspot';
import Table from './Table';
import type TableCell from '../types/TableCell';
import type TableHeader from '../types/TableHeader';

interface Props {
  hotspots: EbirdHotspot[];
}

const cells: Array<TableCell<EbirdHotspot>> = [
  {
    callback: (item) => item.locName,
    wrap: true,
  },
  {
    align: 'right',
    callback: (item) => item.numSpeciesAllTime.toLocaleString(),
  },
  {
    callback: (item) => (
      <time>{new Date(item.latestObsDt).toLocaleString()}</time>
    ),
  },
  {
    callback: (item) => (
      <a
        href={`https://maps.google.com/?q=${item.lat},${item.lng}`}
        rel="noreferrer"
        target="_blank"
      >
        Link
      </a>
    ),
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

export default function SimpleHotspotsTable({ hotspots }: Props) {
  return (
    <Table<EbirdHotspot>
      cells={cells}
      headers={headers}
      items={hotspots}
    />
  );
}
