import { useState } from 'react';

import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import dateStringToEpochMilliseconds from '../utilities/dateStringToEpochMilliseconds';
import type EbirdObservationDetailLevel from '../types/EbirdObservationDetailLevel';
import GoogleMapsLink from './GoogleMapsLink';
import hybridSortBy from '../utilities/hybridSortBy';
import hybridSortByDateString from '../utilities/hybridSortByDateString';
import {
  SortDirection,
  type TableColumn,
  type TableColumnArray,
} from './Table/Table';

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

  const allDetailedTableColumns: Record<
    string,
    TableColumn<EbirdObservation>
  > = {
    checklistId: {
      callback: ({ checklistId }) => checklistId,
      label: 'checklistId',
    },
    comName: {
      callback: ({ comName }) => comName,
      label: 'comName',
    },
    countryCode: {
      callback: ({ countryCode }) => countryCode,
      label: 'countryCode',
    },
    countryName: {
      callback: ({ countryName }) => countryName,
      label: 'countryName',
    },
    evidence: {
      callback: ({ evidence }) => evidence,
      label: 'evidence',
    },
    exoticCategory: {
      callback: ({ exoticCategory }) => exoticCategory,
      label: 'exoticCategory',
    },
    firstName: {
      callback: ({ firstName }) => firstName,
      label: 'firstName',
    },
    hasComments: {
      callback: ({ hasComments }) => hasComments,
      label: 'hasComments',
    },
    hasRichMedia: {
      callback: ({ hasRichMedia }) => hasRichMedia,
      label: 'hasRichMedia',
    },
    howMany: {
      align: 'right',
      callback: ({ howMany }) => howMany,
      label: 'howMany',
    },
    lastName: {
      callback: ({ lastName }) => lastName,
      label: 'lastName',
    },
    lat: {
      align: 'right',
      callback: ({ lat }) => lat,
      label: 'lat',
    },
    lng: {
      align: 'right',
      callback: ({ lng }) => lng,
      label: 'lng',
    },
    locId: {
      callback: ({ locId }) => locId,
      label: 'locId',
    },
    locName: {
      callback: ({ locName }) => locName,
      label: 'locName',
    },
    locationPrivate: {
      callback: ({ locationPrivate }) => locationPrivate,
      label: 'locationPrivate',
    },
    obsDt: {
      callback: ({ obsDt }) => obsDt,
      label: 'obsDt',
    },
    obsId: {
      callback: ({ obsId }) => obsId,
      label: 'obsId',
    },
    obsReviewed: {
      callback: ({ obsReviewed }) => obsReviewed,
      label: 'obsReviewed',
    },
    obsValid: {
      callback: ({ obsValid }) => obsValid,
      label: 'obsValid',
    },
    presenceNoted: {
      callback: ({ presenceNoted }) => presenceNoted,
      label: 'presenceNoted',
    },
    sciName: {
      callback: ({ sciName }) => sciName,
      label: 'sciName',
    },
    speciesCode: {
      callback: ({ speciesCode }) => speciesCode,
      label: 'speciesCode',
    },
    subId: {
      callback: ({ subId }) => subId,
      label: 'subId',
    },
    subnational1Code: {
      callback: ({ subnational1Code }) => subnational1Code,
      label: 'subnational1Code',
    },
    subnational1Name: {
      callback: ({ subnational1Name }) => subnational1Name,
      label: 'subnational1Name',
    },
    subnational2Code: {
      callback: ({ subnational2Code }) => subnational2Code,
      label: 'subnational2Code',
    },
    subnational2Name: {
      callback: ({ subnational2Name }) => subnational2Name,
      label: 'subnational2Name',
    },
    userDisplayName: {
      callback: ({ userDisplayName }) => userDisplayName,
      label: 'userDisplayName',
    },
  };

  function detailedTableColumns(): TableColumnArray<EbirdObservation> {
    const {
      checklistId,
      comName,
      countryCode,
      countryName,
      evidence,
      exoticCategory,
      firstName,
      hasComments,
      hasRichMedia,
      howMany,
      lastName,
      lat,
      lng,
      locId,
      locName,
      locationPrivate,
      obsDt,
      obsId,
      obsReviewed,
      obsValid,
      presenceNoted,
      sciName,
      speciesCode,
      subId,
      subnational1Code,
      subnational1Name,
      subnational2Code,
      subnational2Name,
      userDisplayName,
    } = allDetailedTableColumns;

    return lastDetailLevel === 'full'
      ? [
          checklistId,
          comName,
          countryCode,
          countryName,
          evidence,
          exoticCategory,
          firstName,
          hasComments,
          hasRichMedia,
          howMany,
          lastName,
          lat,
          lng,
          locId,
          locationPrivate,
          obsDt,
          obsId,
          obsReviewed,
          obsValid,
          presenceNoted,
          sciName,
          speciesCode,
          subId,
          subnational1Code,
          subnational1Name,
          subnational2Code,
          subnational2Name,
          userDisplayName,
        ]
      : [
          comName,
          exoticCategory,
          howMany,
          lat,
          lng,
          locId,
          locName,
          locationPrivate,
          obsDt,
          obsReviewed,
          obsValid,
          sciName,
          speciesCode,
          subId,
        ];
  }

  const tables: Tables<EbirdObservation> = [
    {
      columns: detailedTableColumns(),
      title: 'Detailed Table',
    },
    {
      columns: [
        {
          callback: ({ comName }) => comName,
          label: 'Species',
        },
        {
          align: 'right',
          callback: ({ howMany }) => howMany?.toLocaleString(),
          label: 'Quantity',
          sortConfig: {
            id: 'howManySort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdObservation[]) =>
              hybridSortBy(
                items,
                ({ howMany = 0 }: EbirdObservation) => howMany
              ).reverse(),
          },
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
          label: 'Location',
        },
        {
          callback: ({ obsDt }) => new Date(obsDt).toLocaleString(),
          label: 'Date',
          sortConfig: {
            id: 'obsDtSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdObservation[]) =>
              hybridSortByDateString(items, ({ obsDt }: EbirdObservation) =>
                dateStringToEpochMilliseconds(obsDt)
              ).reverse(),
          },
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
