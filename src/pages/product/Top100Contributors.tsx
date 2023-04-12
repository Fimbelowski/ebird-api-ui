import { useState } from 'react';

import { BasePageTable, type Tables } from '../../components/BasePageTable';
import DateInput from '../../components/DateInput';
import type EbirdContributor from '../../types/EbirdContributor';
import EbirdProfileLink from '../../components/EbirdProfileLink';
import type EbirdRankedBy from '../../types/EbirdRankedBy';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import getOrdinalNumber from '../../utilities/getOrdinalNumber';
import { NumberInput } from '../../components/NumberInput';
import { Select, type SelectOptionArray } from '../../components/Select';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function Top100() {
  const { getTop100 } = useEbirdApi();

  const [date, setDate] = useState<Date>();
  const [lastRankedBy, setLastRankedBy] = useState<EbirdRankedBy>('spp');
  const [maxResults, setMaxResults] = useState<number>();
  const [rankedBy, setRankedBy] = useState<EbirdRankedBy>('spp');
  const [regionCode, setRegionCode] = useState('');

  const tables: Tables<EbirdContributor> = [
    {
      cells: [
        {
          callback: ({ profileHandle }) => profileHandle,
        },
        {
          callback: ({ userDisplayName }) => userDisplayName,
        },
        {
          align: 'right',
          callback: ({ numSpecies }) => numSpecies,
        },
        {
          align: 'right',
          callback: ({ numCompleteChecklists }) => numCompleteChecklists,
        },
        {
          align: 'right',
          callback: ({ rowNum }) => rowNum,
        },
        {
          callback: ({ userId }) => userId,
        },
      ],
      headers: [
        {
          label: 'profileHandle',
        },
        {
          label: 'userDisplayName',
        },
        {
          align: 'right',
          label: 'numSpecies',
        },
        {
          align: 'right',
          label: 'numCompleteChecklists',
        },
        {
          align: 'right',
          label: 'rowNum',
        },
        {
          label: 'userId',
        },
      ],
      title: 'Detailed Table',
    },
    {
      cells: [
        {
          callback: ({ rowNum }) => getOrdinalNumber(rowNum),
        },
        {
          callback: ({ userDisplayName, profileHandle }) =>
            profileHandle === undefined ? (
              userDisplayName
            ) : (
              <EbirdProfileLink
                profileHandle={profileHandle}
                userDisplayName={userDisplayName}
              />
            ),
        },
        {
          align: 'right',
          callback: ({ numCompleteChecklists, numSpecies }) =>
            lastRankedBy === 'spp' ? numSpecies : numCompleteChecklists,
        },
      ],
      headers: [
        {
          align: 'right',
          label: 'Place',
        },
        {
          label: 'Contributor',
        },
        {
          align: 'right',
          label: `# ${
            lastRankedBy === 'spp' ? 'Species' : 'Complete Checklists'
          }`,
        },
      ],
      open: true,
      title: 'Simple Table',
    },
  ];

  const rankedByOptions: SelectOptionArray<EbirdRankedBy> = [
    {
      label: 'Checklists',
      value: 'cl',
    },
    {
      label: 'Species',
      value: 'spp',
    },
  ];

  function onLoad() {
    setLastRankedBy(rankedBy);
  }

  async function request() {
    return await getTop100(regionCode, date as Date, rankedBy, maxResults);
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
        onChange={setDate}
        required
      />
      <Select<EbirdRankedBy>
        id="ranked-by"
        label="Ranked By"
        onChange={setRankedBy}
        options={rankedByOptions}
        value={rankedBy}
      />
      <NumberInput
        id="max-results"
        label="Max Results"
        max={100}
        min={1}
        onChange={setMaxResults}
        placeholder="100"
        value={maxResults}
      />
    </>
  );

  return (
    <BasePageTable<EbirdContributor>
      formContent={formContent}
      onLoad={onLoad}
      request={request}
      requiresApiKey
      tables={tables}
      title="Top 100 Contributors"
    />
  );
}
