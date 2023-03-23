import type EbirdHotspot from '../types/EbirdHotspot';
import type HotspotTableProps from '../types/HotspotTableProps';
import useTable from '../hooks/useTable';

export default function EbirdHotspotTableDetailed({
  hotspots,
}: HotspotTableProps) {
  const { Table } = useTable<EbirdHotspot>(
    [
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
        callback: ({ numSpeciesAllTime = 0 }) =>
          numSpeciesAllTime.toLocaleString(),
      },
    ],
    [
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
    ]
  );

  return <Table items={hotspots} />;
}
