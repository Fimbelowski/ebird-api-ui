import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import type EbirdContributor from '../../types/EbirdContributor';
import EbirdProfileLink from '../../components/ebirdProfileLink';
import type EbirdRankedBy from '../../types/EbirdRankedBy';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import getOrdinalNumber from '../../utilities/getOrdinalNumber';
import NumberInput from '../../components/NumberInput';
import Select from '../../components/Select';
import type SelectOption from '../../types/SelectOption';
import Table from '../../components/Table';
import type TableCell from '../../types/TableCell';
import type TableHeader from '../../types/TableHeader';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function Top100() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();
  const { getTop100 } = useEbirdApi();

  const [contributors, setContributors] = useState<EbirdContributor[]>([]);
  const [lastRankedBy, setLastRankedBy] = useState<EbirdRankedBy>('spp');
  const [maxResults, setMaxResults] = useState('');
  const [rankedBy, setRankedBy] = useState<EbirdRankedBy>('spp');
  const [regionCode, setRegionCode] = useState('');

  const rankedByOptions: Array<SelectOption<EbirdRankedBy>> = [
    {
      label: 'Checklists',
      value: 'cl',
    },
    {
      label: 'Species',
      value: 'spp',
    },
  ];

  const detailedTableCells: Array<TableCell<EbirdContributor>> = [
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

  const simpleTableCells: Array<TableCell<EbirdContributor>> = [
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

  function onSubmit() {
    setLoading(true);

    getTop100(regionCode, year, month, day, rankedBy, maxResults)
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setContributors(JSON.parse(data));
        setLastRankedBy(rankedBy);
        setHasQueried(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const resultsContent = (
    <>
      <Details summary="Detailed Table">
        <Table<EbirdContributor>
          cells={detailedTableCells}
          headers={detailedTableHeaders}
          items={contributors}
        />
      </Details>
      <Details
        open
        summary="Simple Table"
      >
        <Table<EbirdContributor>
          cells={simpleTableCells}
          headers={simpleTableHeaders}
          items={contributors}
        />
      </Details>
    </>
  );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={resultsContent}
      title="Top 100 Contributors"
    />
  );
}
