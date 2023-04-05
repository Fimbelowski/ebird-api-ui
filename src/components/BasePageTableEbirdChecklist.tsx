import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import type EbirdChecklist from '../types/EbirdChecklist';
import GoogleMapsLink from './GoogleMapsLink';

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
          callback: ({ loc: { locName } }) => locName,
        },
        {
          align: 'right',
          callback: ({ numSpecies }) => numSpecies,
        },
        {
          callback: ({ obsDt, obsTime = '' }) => {
            const date = new Date(`${obsDt} ${obsTime}`);

            return obsTime === ''
              ? date.toLocaleDateString()
              : date.toLocaleString();
          },
        },
        {
          callback: ({ loc }) => <GoogleMapsLink location={loc} />,
        },
      ],
      headers: [
        {
          label: 'Contributor',
        },
        {
          label: 'Location',
        },
        {
          align: 'right',
          label: '# Species',
        },
        {
          label: 'Date of Observation',
        },
        {
          label: 'View on Google Maps',
        },
      ],
      open: true,
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
