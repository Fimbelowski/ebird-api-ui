import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdLocation from '../types/EbirdLocation';
import GoogleMapsLink from './GoogleMapsLink';
import hybridSortBy from '../utilities/hybridSortBy';
import hybridSortByDateString from '../utilities/hybridSortByDateString';
import { SortDirection } from './Table/Table';

interface EbirdChecklist {
  loc: EbirdLocation;
  locId: string;
  numSpecies: number;
  obsDt: string;
  obsTime?: string;
  subID: string;
  subId: string;
  userDisplayName: string;
}

type Props = Omit<BasePageTableProps<EbirdChecklist>, 'tables'>;

export default function BasePageTableEbirdChecklist(props: Props) {
  const tables: Tables<EbirdChecklist> = [
    {
      columns: [
        {
          callback: ({ locId }) => locId,
          label: 'locId',
        },
        {
          callback: ({ subId }) => subId,
          label: 'subId',
        },
        {
          callback: ({ userDisplayName }) => userDisplayName,
          label: 'userDisplayName',
        },
        {
          align: 'right',
          callback: ({ numSpecies }) => numSpecies,
          label: 'numSpecies',
        },
        {
          callback: ({ obsDt }) => obsDt,
          label: 'obsDt',
        },
        {
          callback: ({ obsTime }) => obsTime,
          label: 'obsTime',
        },
        {
          callback: ({ subID }) => subID,
          label: 'subID',
        },
      ],
      title: 'Detailed Table',
    },
    {
      columns: [
        {
          callback: ({ userDisplayName }) => userDisplayName,
          label: 'Contributor',
        },
        {
          align: 'right',
          callback: ({ numSpecies }) => numSpecies,
          label: '# Species',
          sortConfig: {
            id: 'numSpeciesSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdChecklist[]) =>
              hybridSortBy(
                items,
                ({ numSpecies }: EbirdChecklist) => numSpecies
              ).reverse(),
          },
        },
        {
          callback: ({ loc: { lat, lng, locName } }) => (
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
          callback: ({ obsDt, obsTime = '' }) => {
            const date = new Date(`${obsDt} ${obsTime}`);

            return obsTime === ''
              ? date.toLocaleDateString()
              : date.toLocaleString();
          },
          label: 'Date of Observation',
          sortConfig: {
            id: 'obsDtObsTimeSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdChecklist[]) =>
              hybridSortByDateString(
                items,
                ({ obsDt, obsTime = '' }: EbirdChecklist) =>
                  `${obsDt} ${obsTime}`
              ).reverse(),
          },
        },
      ],
      title: 'Simple Table',
    },
  ];

  return (
    <BasePageTable
      {...props}
      tables={tables}
    />
  );
}
