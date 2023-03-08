import { useState } from 'react';

import BasePage from '../../components/BasePage';
import type EbirdChecklistSortKey from '../../types/EbirdChecklistSortKey';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import NumberInput from '../../components/NumberInput';
import Select from '../../components/Select';
import type SelectOption from '../../types/SelectOption';
import useApiKey from '../../hooks/useApiKey';
import useDate from '../../hooks/useDate';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function ChecklistFeedOnDate() {
  const { apiKey } = useApiKey();
  const { DateInput, day, month, onChange: onDateChange, year } = useDate();
  const ebirdApi = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [maxResults, setMaxResults] = useState('10');
  const [regionCode, setRegionCode] = useState('');
  const [sortKey, setSortKey] = useState<EbirdChecklistSortKey>('obs_dt');

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

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      rawResponse={rawResponse}
      requiresApiKey
      title="Checklist Feed on a Date"
    />
  );
}
