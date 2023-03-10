import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdRegionStats from '../../types/EbirdRegionStats';
import Table from '../../components/Table';
import type TableCell from '../../types/TableCell';
import type TableHeader from '../../types/TableHeader';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function RegionalStatsOnDate() {
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const { getRegionStatsOnDate } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [regionCode, setRegionCode] = useState('');
  const [stats, setStats] = useState<EbirdRegionStats>();

  const tableCells: Array<TableCell<EbirdRegionStats>> = [
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

  function onSubmit() {
    setLoading(true);

    getRegionStatsOnDate(regionCode, year, month, day)
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setStats(JSON.parse(data));
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
    </>
  );

  const resultsContent =
    stats === undefined ? null : (
      <Details
        open
        summary="Results Table"
      >
        <Table<EbirdRegionStats>
          cells={tableCells}
          headers={tableHeaders}
          items={[stats]}
        />
      </Details>
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
      title="Regional Statistics on a Date"
    />
  );
}
