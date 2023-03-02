import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdRegion from '../../../types/EbirdRegion';
import EbirdRegionTable from '../../../components/EbirdRegionTable';
import TextInput from '../../../components/TextInput';
import useApiKey from '../../../hooks/useApiKey';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useRequestState from '../../../hooks/useRequestState';

export default function AdjacentRegions() {
  const { apiKey } = useApiKey();
  const { getAdjacentRegions } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [regionCode, setRegionCode] = useState('');
  const [regions, setRegions] = useState<EbirdRegion[]>([]);

  function onSubmit() {
    setLoading(true);

    getAdjacentRegions(apiKey, regionCode)
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setRegions(JSON.parse(data));
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
    <TextInput
      id="region-code"
      label="Region Code"
      onChange={setRegionCode}
      placeholder="US-CO"
      required
      value={regionCode}
    />
  );

  const resultsContent = (
    <Details
      open
      summary="Results Table"
    >
      <EbirdRegionTable regions={regions} />
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
      title="Adjacent Regions"
    />
  );
}
