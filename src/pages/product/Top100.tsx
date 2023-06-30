import { useState } from 'react';

import { BasePageTable, type Tables } from '../../components/BasePageTable';
import DateInput from '../../components/DateInput';
import type EbirdContributor from '../../types/EbirdContributor';
import EbirdProfileLink from '../../components/EbirdProfileLink';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import getOrdinalNumber from '../../utilities/getOrdinalNumber';
import { Select, type SelectOptionArray } from '../../components/Select/Select';
import useTop100 from '../../services/ebird/hooks/endpoints/product/useTop100';
import dateStringToYearMonthDay from '../../utilities/dateStringToYearMonthDay';
import type EbirdContributorRankedBy from '../../types/EbirdContributorRankedBy';
import MaxResultsInput from '../../components/MaxResultsInput';

export default function Top100() {
  const getTop100 = useTop100();

  const [date, setDate] = useState('');
  const [lastRankedBy, setLastRankedBy] =
    useState<EbirdContributorRankedBy>('spp');
  const [maxResults, setMaxResults] = useState('');
  const [rankedBy, setRankedBy] = useState<EbirdContributorRankedBy>('spp');
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

  const rankedByOptions: SelectOptionArray<EbirdContributorRankedBy> = [
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

  async function onSubmit() {
    if (date === undefined) {
      throw Error('A valid date is required.');
    }

    return await getTop100(
      regionCode,
      ...dateStringToYearMonthDay(date),
      rankedBy,
      maxResults
    );
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        allowCountry
        allowLocation
        allowSubnational1
        onChange={setRegionCode}
        value={regionCode}
      />
      <DateInput
        id="date"
        onChange={setDate}
        required
      />
      <Select<EbirdContributorRankedBy>
        id="ranked-by"
        label="Ranked By"
        onChange={setRankedBy}
        options={rankedByOptions}
        value={rankedBy}
      />
      <MaxResultsInput
        max="100"
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
      onSubmit={onSubmit}
      requiresApiKey
      tables={tables}
      title="Top 100 Contributors"
    />
  );
}
