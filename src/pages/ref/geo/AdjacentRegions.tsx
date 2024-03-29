import { useState } from 'react';

import { BasePageTableEbirdRegion } from '../../../components/BasePageTableEbirdRegion';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import useAdjacentRegions from '../../../services/ebird/hooks/endpoints/ref/geo/useAdjacentRegions';
import PAGE from './PAGE';

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
      formContent={formContent}
      onSubmit={onSubmit}
      page={PAGE.AdjacentRegions}
    />
  );
}
