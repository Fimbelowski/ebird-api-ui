import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdObservation from '../types/EbirdObservation';
import GoogleMapsLink from './GoogleMapsLink';

type Props = Omit<
  BasePageTableProps<EbirdObservation>,
  'requiresApiKey' | 'tables'
>;

export default function BasePageTableEbirdObservation(props: Props) {
  const tables: Tables<EbirdObservation> = [
    {
      cells: [
        {
          callback: ({ comName }) => comName,
        },
        {
          callback: ({ exoticCategory }) => exoticCategory,
        },
        {
          align: 'right',
          callback: ({ howMany }) => howMany?.toString(),
        },
        {
          align: 'right',
          callback: ({ lat }) => lat.toString(),
        },
        {
          align: 'right',
          callback: ({ lng }) => lng.toString(),
        },
        {
          callback: ({ locId }) => locId,
        },
        {
          callback: ({ locName }) => locName,
        },
        {
          callback: ({ locationPrivate }) => locationPrivate,
        },
        {
          callback: ({ obsDt }) => obsDt,
        },
        {
          callback: ({ obsReviewed }) => obsReviewed,
        },
        {
          callback: ({ obsValid }) => obsValid,
        },
        {
          callback: ({ sciName }) => sciName,
        },
        {
          callback: ({ speciesCode }) => speciesCode,
        },
        {
          callback: ({ subId }) => subId,
        },
      ],
      headers: [
        {
          label: 'comName',
        },
        {
          label: 'exoticCategory',
        },
        {
          align: 'right',
          label: 'howMany',
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
          label: 'locId',
        },
        {
          label: 'locName',
        },
        {
          label: 'locationPrivate',
        },
        {
          label: 'obsDt',
        },
        {
          label: 'obsReviewed',
        },
        {
          label: 'obsValid',
        },
        {
          label: 'sciName',
        },
        {
          label: 'speciesCode',
        },
        {
          label: 'subId',
        },
      ],
      title: 'Detailed Table',
    },
    {
      cells: [
        {
          callback: ({ comName }) => comName,
        },
        {
          align: 'right',
          callback: ({ howMany }) => howMany?.toLocaleString(),
        },
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
          callback: ({ obsDt }) => new Date(obsDt).toLocaleString(),
        },
      ],
      headers: [
        {
          label: 'Species',
        },
        {
          label: 'Quantity',
        },
        {
          label: 'Location',
        },
        {
          label: 'Date',
        },
      ],
      open: true,
      title: 'Simple Table',
    },
  ];

  return (
    <BasePageTable
      {...props}
      requiresApiKey
      tables={tables}
    />
  );
}
