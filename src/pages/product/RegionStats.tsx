import { useState } from 'react';

import { BasePage } from '../../components/BasePage/BasePage';
import DateInput from '../../components/DateInput';
import Details from '../../components/Details/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdRegionStats from '../../services/ebird/types/EbirdRegionStats';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../components/Table/Table';
import useRegionalStatisticsOnADate from '../../services/ebird/hooks/endpoints/product/useRegionalStatisticsOnADate';

export default function RegionStats() {
  const getRegionalStatisticsOnADate = useRegionalStatisticsOnADate();

  const [date, setDate] = useState<Date>();
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

  async function onSubmit() {
    if (date === undefined) {
      throw Error('A valid date is required.');
    }

    return await getRegionalStatisticsOnADate(
      regionCode,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
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
        onChange={setDate}
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
      onSubmit={onSubmit}
      requiresApiKey
      resultsContent={resultsContent}
      title="Regional Statistics on a Date"
    />
  );
}
