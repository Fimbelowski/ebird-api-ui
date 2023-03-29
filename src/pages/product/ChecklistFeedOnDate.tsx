import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import type EbirdChecklist from '../../types/EbirdChecklist';
import type EbirdChecklistSortKey from '../../types/EbirdChecklistSortKey';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import GoogleMapsLink from '../../components/GoogleMapsLink';
import NumberInput from '../../components/NumberInput';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../components/Table';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useSelect from '../../hooks/useSelect';

export default function ChecklistFeedOnDate() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getChecklistFeedOnDate } = useEbirdApi();
  const Select = useSelect<EbirdChecklistSortKey>([
    {
      label: 'Observation Date',
      value: 'obs_dt',
    },
    {
      label: 'Creation Date',
      value: 'creation_dt',
    },
  ]);

  const [checklists, setChecklists] = useState<EbirdChecklist[]>([]);
  const [maxResults, setMaxResults] = useState('10');
  const [regionCode, setRegionCode] = useState('');
  const [sortKey, setSortKey] = useState<EbirdChecklistSortKey>('obs_dt');

  const detailedTableCells: TableCellArray<EbirdChecklist> = [
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

  const simpleTableCells: TableCellArray<EbirdChecklist> = [
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
      <Select
        id="sort-key"
        label="Sort By"
        onChange={setSortKey}
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
        <Table
          cells={detailedTableCells}
          headers={detailedTableHeaders}
          items={checklists}
        />
      </Details>
      <Details
        open
        summary="Simple Table"
      >
        <Table
          cells={simpleTableCells}
          headers={simpleTableHeaders}
          items={checklists}
        />
      </Details>
    </>
  );

  return (
    <BasePage<EbirdChecklist[]>
      formContent={formContent}
      onLoad={setChecklists}
      request={request}
      requiresApiKey
      resultsContent={resultsContent}
      title="Checklist Feed on a Date"
    />
  );
}
