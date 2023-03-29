import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import type EbirdContributor from '../../types/EbirdContributor';
import EbirdProfileLink from '../../components/ebirdProfileLink';
import type EbirdRankedBy from '../../types/EbirdRankedBy';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import getOrdinalNumber from '../../utilities/getOrdinalNumber';
import NumberInput from '../../components/NumberInput';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../components/Table';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useSelect from '../../hooks/useSelect';

export default function Top100() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getTop100 } = useEbirdApi();
  const Select = useSelect<EbirdRankedBy>([
    {
      label: 'Checklists',
      value: 'cl',
    },
    {
      label: 'Species',
      value: 'spp',
    },
  ]);

  const [contributors, setContributors] = useState<EbirdContributor[]>([]);
  const [lastRankedBy, setLastRankedBy] = useState<EbirdRankedBy>('spp');
  const [maxResults, setMaxResults] = useState('');
  const [rankedBy, setRankedBy] = useState<EbirdRankedBy>('spp');
  const [regionCode, setRegionCode] = useState('');

  const detailedTableCells: TableCellArray<EbirdContributor> = [
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
  ];

  const detailedTableHeaders: TableHeader[] = [
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
  ];

  const simpleTableCells: TableCellArray<EbirdContributor> = [
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
  ];

  const simpleTableHeaders: TableHeader[] = [
    {
      align: 'right',
      label: 'Place',
    },
    {
      label: 'Contributor',
    },
    {
      align: 'right',
      label: `# ${lastRankedBy === 'spp' ? 'Species' : 'Complete Checklists'}`,
    },
  ];

  function onLoad(results: EbirdContributor[]) {
    setLastRankedBy(rankedBy);
    setContributors(results);
  }

  async function request() {
    return await getTop100(regionCode, year, month, day, rankedBy, maxResults);
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
      <Select
        id="ranked-by"
        label="Ranked By"
        onChange={setRankedBy}
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

  const resultsContent = (
    <>
      <Details summary="Detailed Table">
        <Table
          cells={detailedTableCells}
          headers={detailedTableHeaders}
          items={contributors}
        />
      </Details>
      <Details
        open
        summary="Simple Table"
      >
        <Table
          cells={simpleTableCells}
          headers={simpleTableHeaders}
          items={contributors}
        />
      </Details>
    </>
  );

  return (
    <BasePage<EbirdContributor[]>
      formContent={formContent}
      onLoad={onLoad}
      request={request}
      requiresApiKey
      resultsContent={resultsContent}
      title="Top 100 Contributors"
    />
  );
}
