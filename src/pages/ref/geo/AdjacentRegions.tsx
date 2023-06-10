import { useState } from 'react';

import { BasePageTableEbirdRegion } from '../../../components/BasePageTableEbirdRegion';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import useAdjacentRegions from '../../../services/ebird/hooks/endpoints/ref/geo/useAdjacentRegions';

export default function AdjacentRegions() {
  const getAdjacentRegions = useAdjacentRegions();

  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
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
      onSubmit={onSubmit}
      formContent={formContent}
      requiresApiKey
      title="Adjacent Regions"
    />
  );
}
