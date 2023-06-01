import { useState } from 'react';

import BasePageTableEbirdChecklist from '../../components/BasePageTableEbirdChecklist';
import DateInput from '../../components/DateInput';
import type EbirdChecklistSortKey from '../../types/EbirdChecklistSortKey';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import { NumberInput } from '../../components/NumberInput';
import { Select, type SelectOptionArray } from '../../components/Select';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function ChecklistFeed() {
  const { getChecklistFeedOnDate } = useEbirdApi();

  const [date, setDate] = useState<Date>();
  const [maxResults, setMaxResults] = useState(10);
  const [regionCode, setRegionCode] = useState('');
  const [sortKey, setSortKey] = useState<EbirdChecklistSortKey>('obs_dt');

  const sortKeyOptions: SelectOptionArray<EbirdChecklistSortKey> = [
    {
      label: 'Observation Date',
      value: 'obs_dt',
    },
    {
      label: 'Creation Date',
      value: 'creation_dt',
    },
  ];

  async function onSubmit() {
    return await getChecklistFeedOnDate(
      regionCode,
      date as Date,
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
        onChange={setDate}
        required
      />
      <Select<EbirdChecklistSortKey>
        id="sort-key"
        label="Sort By"
        onChange={setSortKey}
        options={sortKeyOptions}
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

  return (
    <BasePageTableEbirdChecklist
      formContent={formContent}
      onSubmit={onSubmit}
      requiresApiKey
      title="Checklist Feed on a Date"
    />
  );
}