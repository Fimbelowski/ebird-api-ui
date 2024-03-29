import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdHotspot from '../types/EbirdHotspot';
import EbirdHotspotLink from './EbirdHotspotLink';
import hybridSortBy from '../utilities/hybridSortBy';
import hybridSortByDateString from '../utilities/hybridSortByDateString';
import { SortDirection } from './Table/Table';

type Props = Omit<BasePageTableProps<EbirdHotspot>, 'tables'>;

export default function BasePageTableEbirdHotspot(props: Props) {
  const tables: Tables<EbirdHotspot> = [
    {
      columns: [
        {
          callback: ({ locId }) => locId,
          label: 'locId',
        },
        {
          callback: ({ locName }) => locName,
          label: 'locName',
        },
        {
          callback: ({ countryCode }) => countryCode,
          label: 'countryCode',
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
          callback: ({ latestObsDt = 'N/A' }) => latestObsDt,
          label: 'latestObsDt',
        },
        {
          align: 'right',
          callback: ({ numSpeciesAllTime = 0 }) =>
            numSpeciesAllTime.toLocaleString(),
          label: 'numSpeciesAllTime',
        },
      ],
      title: 'Detailed Table',
    },
    {
      columns: [
        {
          callback: ({ locId, locName }) => (
            <EbirdHotspotLink
              id={locId}
              name={locName}
            />
          ),
          label: 'Name',
        },
        {
          align: 'right',
          callback: ({ numSpeciesAllTime = 0 }) =>
            numSpeciesAllTime.toLocaleString(),
          label: 'Species Observed',
          sortConfig: {
            id: 'numSpeciesAllTimeSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdHotspot[]) =>
              hybridSortBy(
                items,
                ({ numSpeciesAllTime }: EbirdHotspot) => numSpeciesAllTime
              ).reverse(),
          },
        },
        {
          callback: ({ latestObsDt }) =>
            latestObsDt === undefined ? (
              'N/A'
            ) : (
              <time>{new Date(latestObsDt).toLocaleString()}</time>
            ),
          label: 'Latest Observation',
          sortConfig: {
            id: 'latestObsDtSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdHotspot[]) =>
              hybridSortByDateString(
                items,
                ({ latestObsDt = '' }: EbirdHotspot) => latestObsDt
              ).reverse(),
          },
        },
      ],
      title: 'Simple Table',
    },
  ];

  return (
    <BasePageTable<EbirdHotspot>
      {...props}
      tables={tables}
    />
  );
}
