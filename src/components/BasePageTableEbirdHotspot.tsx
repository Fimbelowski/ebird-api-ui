import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import GoogleMapsLink from './GoogleMapsLink';
import type EbirdHotspot from '../types/EbirdHotspot';
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
          callback: ({ lat, lng, locName }) => (
            <GoogleMapsLink
              latitude={lat}
              longitude={lng}
            >
              {locName}
            </GoogleMapsLink>
          ),
          label: 'Name',
        },
        {
          align: 'right',
          callback: ({ numSpeciesAllTime = 0 }) =>
            numSpeciesAllTime.toLocaleString(),
          label: 'Species Observed',
          sortConfig: {
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdHotspot[]) =>
              items.toSorted(
                (a, b) =>
                  (a.numSpeciesAllTime ?? 0) - (b.numSpeciesAllTime ?? 0)
              ),
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
