import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdHotspot from '../types/EbirdHotspot';
import GoogleMapsLink from './GoogleMapsLink';

type Props = Omit<BasePageTableProps<EbirdHotspot>, 'tables'>;

export default function BasePageTableEbirdHotspot(props: Props) {
  const tables: Tables<EbirdHotspot> = [
    {
      cells: [
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
      headers: [
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
      ],
      title: 'Detailed Table',
    },
    {
      cells: [
        {
          callback: ({ lat, lng, locName }) => (
            <GoogleMapsLink
              latitude={lat}
              longitude={lng}
            >
              {locName}
            </GoogleMapsLink>
          ),
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
      ],
      headers: [
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
      ],
      open: true,
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
