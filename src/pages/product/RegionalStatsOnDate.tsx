import { useState } from 'react';

import { BasePage } from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdRegionStats from '../../types/EbirdRegionStats';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../components/Table';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function RegionalStatsOnDate() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getRegionStatsOnDate } = useEbirdApi();

  const [regionCode, setRegionCode] = useState('');
  const [stats, setStats] = useState<EbirdRegionStats>();

  const tableCells: TableCellArray<EbirdRegionStats> = [
    {
      align: 'right',
      callback: ({ numChecklists }) => numChecklists,
    },
    {
      align: 'right',
      callback: ({ numContributors }) => numContributors,
    },
    {
      align: 'right',
      callback: ({ numSpecies }) => numSpecies,
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      align: 'right',
      label: 'Checklists',
    },
    {
      align: 'right',
      label: 'Contributors',
    },
    {
      align: 'right',
      label: 'Species',
    },
  ];

  async function request() {
    return await getRegionStatsOnDate(regionCode, year, month, day);
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
    </>
  );

  const resultsContent =
    stats === undefined ? null : (
      <Details
        open
        summary="Results Table"
      >
        <Table
          cells={tableCells}
          headers={tableHeaders}
          items={[stats]}
        />
      </Details>
    );

  return (
    <BasePage<EbirdRegionStats>
      formContent={formContent}
      onLoad={setStats}
      request={request}
      requiresApiKey
      resultsContent={resultsContent}
      title="Regional Statistics on a Date"
    />
  );
}
