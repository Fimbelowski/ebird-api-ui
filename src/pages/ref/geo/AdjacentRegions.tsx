import { useState } from 'react';

import { BasePage } from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdRegion from '../../../types/EbirdRegion';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import EbirdRegionTable from '../../../components/EbirdRegionTable';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function AdjacentRegions() {
  const { getAdjacentRegions } = useEbirdApi();

  const [regionCode, setRegionCode] = useState('');
  const [regions, setRegions] = useState<EbirdRegion[]>([]);

  async function request() {
    return await getAdjacentRegions(regionCode);
  }

  const formContent = (
    <EbirdRegionCodeInput
      onChange={setRegionCode}
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
    <BasePage<EbirdRegion[]>
      request={request}
      formContent={formContent}
      onLoad={setRegions}
      requiresApiKey
      resultsContent={resultsContent}
      title="Adjacent Regions"
    />
  );
}
