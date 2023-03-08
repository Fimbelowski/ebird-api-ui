import { useState } from 'react';

import BasePage from '../../components/BasePage';
import type EbirdRankedBy from '../../types/EbirdRankedBy';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import NumberInput from '../../components/NumberInput';
import Select from '../../components/Select';
import type SelectOption from '../../types/SelectOption';
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

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      rawResponse={rawResponse}
      requiresApiKey
      title="Top 100"
    />
  );
}
