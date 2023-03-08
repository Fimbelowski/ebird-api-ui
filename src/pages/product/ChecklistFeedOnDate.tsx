import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import type EbirdChecklistSortKey from '../../types/EbirdChecklistSortKey';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import GoogleMapsLink from '../../components/GoogleMapsLink';
import NumberInput from '../../components/NumberInput';
import Select from '../../components/Select';
import type SelectOption from '../../types/SelectOption';
import Table from '../../components/Table';
import type TableCell from '../../types/TableCell';
import type TableHeader from '../../types/TableHeader';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';
import type EbirdChecklist from '../../types/EbirdChecklist';

export default function ChecklistFeedOnDate() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getChecklistFeedOnDate } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [checklists, setChecklists] = useState<EbirdChecklist[]>([]);
  const [maxResults, setMaxResults] = useState('10');
  const [regionCode, setRegionCode] = useState('');
  const [sortKey, setSortKey] = useState<EbirdChecklistSortKey>('obs_dt');

  const detailedTableCells: Array<TableCell<EbirdChecklist>> = [
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
  ];

  const detailedTableHeaders: TableHeader[] = [
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
  ];

  const simpleTableCells: Array<TableCell<EbirdChecklist>> = [
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
  ];

  const simpleTableHeaders: TableHeader[] = [
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
  ];

  const sortKeySelectOptions: Array<SelectOption<EbirdChecklistSortKey>> = [
    {
      label: 'Observation Date',
      value: 'obs_dt',
    },
    {
      label: 'Creation Date',
      value: 'creation_dt',
    },
  ];

  function onSubmit() {
    setLoading(true);

    getChecklistFeedOnDate(regionCode, year, month, day, sortKey, maxResults)
      .then(async (response) => await response.text())
      .then((data) => {
        setChecklists(JSON.parse(data));
        setRawResponse(data);
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
      <Select<EbirdChecklistSortKey>
        id="sort-key"
        label="Sort By"
        onChange={setSortKey}
        options={sortKeySelectOptions}
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

  const resultsContent = (
    <>
      <Details summary="Detailed Table">
        <Table<EbirdChecklist>
          cells={detailedTableCells}
          headers={detailedTableHeaders}
          items={checklists}
        />
      </Details>
      <Details
        open
        summary="Simple Table"
      >
        <Table<EbirdChecklist>
          cells={simpleTableCells}
          headers={simpleTableHeaders}
          items={checklists}
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
      title="Checklist Feed on a Date"
    />
  );
}
