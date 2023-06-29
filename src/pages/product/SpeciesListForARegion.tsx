import { useState } from 'react';

import BasePageList from '../../components/BasePageList/BasePageList';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useSpeciesListForARegion from '../../services/ebird/hooks/endpoints/product/useSpeciesListForARegion';

export default function SpeciesListForARegion() {
  const getSpeciesListForARegion = useSpeciesListForARegion();

  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    return await getSpeciesListForARegion(regionCode);
  }

  const formContent = (
    <EbirdRegionCodeInput
      allowCountry
      allowLocation
      allowSubnational1
      allowSubnational2
      allowUsfws
      onChange={setRegionCode}
      value={regionCode}
    />
  );

  return (
    <BasePageList
      formContent={formContent}
      onSubmit={onSubmit}
      requiresApiKey
      title="Species List for a Region"
    />
  );
}
