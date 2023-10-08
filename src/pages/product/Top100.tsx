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
import PAGE from './PAGE';

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
      columns: [
        {
          callback: ({ profileHandle }) => profileHandle,
          label: 'profileHandle',
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
          align: 'right',
          callback: ({ numCompleteChecklists }) => numCompleteChecklists,
          label: 'numCompleteChecklists',
        },
        {
          align: 'right',
          callback: ({ rowNum }) => rowNum,
          label: 'rowNum',
        },
        {
          callback: ({ userId }) => userId,
          label: 'userId',
        },
      ],
      title: 'Detailed Table',
    },
    {
      columns: [
        {
          align: 'right',
          callback: ({ rowNum }) => getOrdinalNumber(rowNum),
          label: 'Place',
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
          label: 'Contributor',
        },
        {
          align: 'right',
          callback: ({ numCompleteChecklists, numSpecies }) =>
            lastRankedBy === 'spp' ? numSpecies : numCompleteChecklists,
          label: `# ${
            lastRankedBy === 'spp' ? 'Species' : 'Complete Checklists'
          }`,
        },
      ],
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
      <DateInput
        id="date"
        onChange={setDate}
        required
      />
      <EbirdRegionCodeInput
        allowCountry
        allowLocation
        allowSubnational1
        onChange={setRegionCode}
        value={regionCode}
      />
      <Select<EbirdContributorRankedBy>
        id="ranked-by"
        label="Ranked By"
        onChange={setRankedBy}
        options={rankedByOptions}
        value={rankedBy}
      />
    </>
  );

  const formOptionsFieldsetContent = (
    <MaxResultsInput
      max="100"
      onChange={setMaxResults}
      placeholder="100"
      value={maxResults}
    />
  );

  return (
    <BasePageTable<EbirdContributor>
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onLoad={onLoad}
      onSubmit={onSubmit}
      page={PAGE.Top100}
      tables={tables}
    />
  );
}
