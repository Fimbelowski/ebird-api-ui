import type EbirdHotspot from '../types/EbirdHotspot';
import GoogleMapsLink from './GoogleMapsLink';
import type HotspotTableProps from '../types/HotspotTableProps';
import useTable from '../hooks/useTable';

export default function EbirdHotspotTableSimple({
  hotspots,
}: HotspotTableProps) {
  const { Table } = useTable<EbirdHotspot>(
    [
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
    ],
    [
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
    ]
  );

  return <Table items={hotspots} />;
}
