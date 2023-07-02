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
      allowCountry
      allowSubnational1
      allowSubnational2
      onChange={setRegionCode}
      value={regionCode}
    />
  );

  return (
    <BasePageTableEbirdRegion
      description="Fetches the list of countries or regions that share a border with the specified region."
      onSubmit={onSubmit}
      formContent={formContent}
      requiresApiKey
      title="Adjacent Regions"
    />
  );
}
