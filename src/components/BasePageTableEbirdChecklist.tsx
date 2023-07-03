import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import GoogleMapsLink from './GoogleMapsLink';
import type EbirdLocation from '../types/EbirdLocation';

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
      cells: [
        {
          callback: ({ locId }) => locId,
        },
        {
          callback: ({ subId }) => subId,
        },
        {
          callback: ({ userDisplayName }) => userDisplayName,
        },
        {
          align: 'right',
          callback: ({ numSpecies }) => numSpecies,
        },
        {
          callback: ({ obsDt }) => obsDt,
        },
        {
          callback: ({ obsTime }) => obsTime,
        },
        {
          callback: ({ subID }) => subID,
        },
      ],
      headers: [
        {
          label: 'locId',
        },
        {
          label: 'subId',
        },
        {
          label: 'userDisplayName',
        },
        {
          align: 'right',
          label: 'numSpecies',
        },
        {
          label: 'obsDt',
        },
        {
          label: 'obsTime',
        },
        {
          label: 'subID',
        },
      ],
      title: 'Detailed Table',
    },
    {
      cells: [
        {
          callback: ({ userDisplayName }) => userDisplayName,
        },
        {
          align: 'right',
          callback: ({ numSpecies }) => numSpecies,
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
        },
        {
          callback: ({ obsDt, obsTime = '' }) => {
            const date = new Date(`${obsDt} ${obsTime}`);

            return obsTime === ''
              ? date.toLocaleDateString()
              : date.toLocaleString();
          },
        },
      ],
      headers: [
        {
          label: 'Contributor',
        },
        {
          align: 'right',
          label: '# Species',
        },
        {
          label: 'Location',
        },
        {
          label: 'Date of Observation',
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
