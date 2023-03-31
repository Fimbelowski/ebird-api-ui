import { useState } from 'react';

import { BasePageTable, type Tables } from '../../components/BasePageTable';
import type EbirdChecklist from '../../types/EbirdChecklist';
import type EbirdChecklistSortKey from '../../types/EbirdChecklistSortKey';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import GoogleMapsLink from '../../components/GoogleMapsLink';
import NumberInput from '../../components/NumberInput';
import { Select, type SelectOptionArray } from '../../components/Select';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function ChecklistFeedOnDate() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getChecklistFeedOnDate } = useEbirdApi();

  const [maxResults, setMaxResults] = useState('10');
  const [regionCode, setRegionCode] = useState('');
  const [sortKey, setSortKey] = useState<EbirdChecklistSortKey>('obs_dt');

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

  const sortKeyOptions: SelectOptionArray<EbirdChecklistSortKey> = [
    {
      label: 'Observation Date',
      value: 'obs_dt',
    },
    {
      label: 'Creation Date',
      value: 'creation_dt',
    },
  ];

  async function request() {
    return await getChecklistFeedOnDate(
      regionCode,
      year,
      month,
      day,
      sortKey,
      maxResults
    );
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        onChange={setRegionCode}
        required
        value={regionCode}
      />
      <DateInput
        id="date"
        onChange={onDateChange}
        required
      />
      <Select<EbirdChecklistSortKey>
        id="sort-key"
        label="Sort By"
        onChange={setSortKey}
        options={sortKeyOptions}
        value={sortKey}
      />
      <NumberInput
        id="max-results"
        label="Max Results"
        onChange={setMaxResults}
        value={maxResults}
      />
    </>
  );

  return (
    <BasePageTable<EbirdChecklist>
      formContent={formContent}
      request={request}
      requiresApiKey
      tables={tables}
      title="Checklist Feed on a Date"
    />
  );
}
