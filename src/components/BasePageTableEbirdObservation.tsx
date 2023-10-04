import { useState } from 'react';

import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdObservationDetailLevel from '../types/EbirdObservationDetailLevel';
import GoogleMapsLink from './GoogleMapsLink';
import type { TableHeaderProps } from './TableHeader/TableHeader';
import type { TableCellConfig } from './TableCell/TableCell';

interface EbirdObservation {
  checklistId?: string;
  comName: string;
  countryCode?: string;
  countryName?: string;
  evidence?: string;
  exoticCategory?: string;
  firstName?: string;
  hasComments?: boolean;
  hasRichMedia?: boolean;
  howMany?: number;
  lastName?: string;
  lat: number;
  lng: number;
  locId: string;
  locName: string;
  locationPrivate: boolean;
  obsDt: string;
  obsId?: string;
  obsReviewed: boolean;
  obsValid: boolean;
  presenceNoted?: boolean;
  sciName: string;
  speciesCode: string;
  subId: string;
  subnational1Code?: string;
  subnational1Name?: string;
  subnational2Code?: string;
  subnational2Name?: string;
  userDisplayName?: string;
}

type Props = Omit<
  BasePageTableProps<EbirdObservation>,
  'requiresApiKey' | 'tables'
> & { detailLevel?: EbirdObservationDetailLevel };

export default function BasePageTableEbirdObservation({
  detailLevel = 'simple',
  onSubmit: onSubmitProp,
  ...rest
}: Props) {
  const [lastDetailLevel, setLastDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');

  function detailedTableCells() {
    const cells: Array<
      TableCellConfig<EbirdObservation> & {
        detailLevel: EbirdObservationDetailLevel;
      }
    > = [
      {
        callback: ({ checklistId }) => checklistId,
        detailLevel: 'full',
      },
      {
        callback: ({ comName }) => comName,
        detailLevel: 'simple',
      },
      {
        callback: ({ countryCode }) => countryCode,
        detailLevel: 'full',
      },
      {
        callback: ({ countryName }) => countryName,
        detailLevel: 'full',
      },
      {
        callback: ({ evidence }) => evidence,
        detailLevel: 'full',
      },
      {
        callback: ({ exoticCategory }) => exoticCategory,
        detailLevel: 'simple',
      },
      {
        callback: ({ firstName }) => firstName,
        detailLevel: 'full',
      },
      {
        callback: ({ hasComments }) => hasComments,
        detailLevel: 'full',
      },
      {
        callback: ({ hasRichMedia }) => hasRichMedia,
        detailLevel: 'full',
      },
      {
        callback: ({ howMany }) => howMany,
        detailLevel: 'simple',
      },
      {
        callback: ({ lastName }) => lastName,
        detailLevel: 'full',
      },
      {
        align: 'right',
        callback: ({ lat }) => lat,
        detailLevel: 'simple',
      },
      {
        align: 'right',
        callback: ({ lng }) => lng,
        detailLevel: 'simple',
      },
      {
        callback: ({ locId }) => locId,
        detailLevel: 'simple',
      },
      {
        callback: ({ locName }) => locName,
        detailLevel: 'simple',
      },
      {
        callback: ({ locationPrivate }) => locationPrivate,
        detailLevel: 'simple',
      },
      {
        callback: ({ obsDt }) => obsDt,
        detailLevel: 'simple',
      },
      {
        callback: ({ obsId }) => obsId,
        detailLevel: 'full',
      },
      {
        callback: ({ obsReviewed }) => obsReviewed,
        detailLevel: 'simple',
      },
      {
        callback: ({ obsValid }) => obsValid,
        detailLevel: 'simple',
      },
      {
        callback: ({ presenceNoted }) => presenceNoted,
        detailLevel: 'full',
      },
      {
        callback: ({ sciName }) => sciName,
        detailLevel: 'simple',
      },
      {
        callback: ({ speciesCode }) => speciesCode,
        detailLevel: 'simple',
      },
      {
        callback: ({ subId }) => subId,
        detailLevel: 'simple',
      },
      {
        callback: ({ subnational1Code }) => subnational1Code,
        detailLevel: 'full',
      },
      {
        callback: ({ subnational1Name }) => subnational1Name,
        detailLevel: 'full',
      },
      {
        callback: ({ subnational2Code }) => subnational2Code,
        detailLevel: 'full',
      },
      {
        callback: ({ subnational2Name }) => subnational2Name,
        detailLevel: 'full',
      },
      {
        callback: ({ userDisplayName }) => userDisplayName,
        detailLevel: 'full',
      },
    ];

    return lastDetailLevel === 'full'
      ? cells
      : cells.filter((cell) => cell.detailLevel === 'simple');
  }

  function detailedTableHeaders() {
    const headers: Array<
      TableHeaderProps & {
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
        detailLevel: 'full',
        label: 'obsId',
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

    return lastDetailLevel === 'full'
      ? headers
      : headers.filter(({ detailLevel }) => detailLevel === 'simple');
  }

  const tables: Tables<EbirdObservation> = [
    {
      cells: detailedTableCells(),
      headers: detailedTableHeaders(),
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
      title: 'Simple Table',
    },
  ];

  async function onSubmit() {
    setLastDetailLevel(detailLevel);
    return await onSubmitProp();
  }

  return (
    <BasePageTable
      {...rest}
      onSubmit={onSubmit}
      tables={tables}
    />
  );
}
