import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdObservation from '../types/EbirdObservation';
import type EbirdObservationDetailLevel from '../types/EbirdObservationDetailLevel';
import GoogleMapsLink from './GoogleMapsLink';
import { type TableCell, type TableHeader } from './Table';

type Props = Omit<
  BasePageTableProps<EbirdObservation>,
  'requiresApiKey' | 'tables'
> & { detailLevel?: EbirdObservationDetailLevel };

export default function BasePageTableEbirdObservation({
  detailLevel = 'simple',
  ...rest
}: Props) {
  function detailedTableHeaders() {
    const headers: Array<
      TableHeader & {
        detailLevel: EbirdObservationDetailLevel;
        label: keyof EbirdObservation;
      }
    > = [
      {
        detailLevel: 'full',
        label: 'checklistId',
      },
      {
        detailLevel: 'simple',
        label: 'comName',
      },
      {
        detailLevel: 'full',
        label: 'countryCode',
      },
      {
        detailLevel: 'full',
        label: 'countryName',
      },
      {
        detailLevel: 'full',
        label: 'evidence',
      },
      {
        detailLevel: 'simple',
        label: 'exoticCategory',
      },
      {
        detailLevel: 'full',
        label: 'firstName',
      },
      {
        detailLevel: 'full',
        label: 'hasComments',
      },
      {
        detailLevel: 'full',
        label: 'hasRichMedia',
      },
      {
        align: 'right',
        detailLevel: 'simple',
        label: 'howMany',
      },
      {
        detailLevel: 'full',
        label: 'lastName',
      },
      {
        align: 'right',
        detailLevel: 'simple',
        label: 'lat',
      },
      {
        align: 'right',
        detailLevel: 'simple',
        label: 'lng',
      },
      {
        detailLevel: 'simple',
        label: 'locId',
      },
      {
        detailLevel: 'simple',
        label: 'locName',
      },
      {
        detailLevel: 'simple',
        label: 'locationPrivate',
      },
      {
        detailLevel: 'simple',
        label: 'obsDt',
      },
      {
        detailLevel: 'simple',
        label: 'obsReviewed',
      },
      {
        detailLevel: 'simple',
        label: 'obsValid',
      },
      {
        detailLevel: 'full',
        label: 'presenceNoted',
      },
      {
        detailLevel: 'simple',
        label: 'sciName',
      },
      {
        detailLevel: 'simple',
        label: 'speciesCode',
      },
      {
        detailLevel: 'simple',
        label: 'subId',
      },
      {
        detailLevel: 'full',
        label: 'subnational1Code',
      },
      {
        detailLevel: 'full',
        label: 'subnational1Name',
      },
      {
        detailLevel: 'full',
        label: 'subnational2Code',
      },
      {
        detailLevel: 'full',
        label: 'subnational2Name',
      },
      {
        detailLevel: 'full',
        label: 'userDisplayName',
      },
    ];

    return headers.filter(
      (header) => detailLevel === 'simple' && header.detailLevel === 'simple'
    );
  }

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
      {...rest}
      requiresApiKey
      tables={tables}
    />
  );
}
