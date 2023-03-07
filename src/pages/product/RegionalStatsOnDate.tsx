import { useState } from 'react';

import BasePage from '../../components/BasePage';
import DateInput from '../../components/DateInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useApiKey from '../../hooks/useApiKey';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function RegionalStatsOnDate() {
  const { apiKey } = useApiKey();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [date, setDate] = useState('');
  const [regionCode, setRegionCode] = useState('');

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
        value={date}
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
      title="Regional Statistics on a Date"
    />
  );
}
