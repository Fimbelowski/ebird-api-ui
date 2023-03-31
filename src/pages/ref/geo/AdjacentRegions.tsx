import { useState } from 'react';

import BasePageTableEbirdRegion from '../../../components/BasePageTableEbirdRegion';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function AdjacentRegions() {
  const { getAdjacentRegions } = useEbirdApi();

  const [regionCode, setRegionCode] = useState('');

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

  return (
    <BasePageTableEbirdRegion
      request={request}
      formContent={formContent}
      requiresApiKey
      title="Adjacent Regions"
    />
  );
}
