import { useState } from 'react';

import BasePage from '../../components/BasePage';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useApiKey from '../../hooks/useApiKey';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function SpeciesListRegion() {
  const { apiKey } = useApiKey();
  const { getSpeciesListForRegion } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [regionCode, setRegionCode] = useState('');

  const formContent = (
    <EbirdRegionCodeInput
      onChange={setRegionCode}
      value={regionCode}
    />
  );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      rawResponse={rawResponse}
      requiresApiKey
      title="Speciest List for a Region"
    />
  );
}
