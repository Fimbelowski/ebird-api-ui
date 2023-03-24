import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdRegionStats from '../../types/EbirdRegionStats';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useTable from '../../hooks/useTable';

export default function RegionalStatsOnDate() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getRegionStatsOnDate } = useEbirdApi();
  const Table = useTable<EbirdRegionStats>(
    [
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
    ],
    [
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
    ]
  );

  const [regionCode, setRegionCode] = useState('');
  const [stats, setStats] = useState<EbirdRegionStats>();

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
        <Table items={[stats]} />
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
