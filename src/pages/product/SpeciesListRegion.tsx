import { useState } from 'react';

import BasePageList from '../../components/BasePageList';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function SpeciesListRegion() {
  const { getSpeciesListForRegion } = useEbirdApi();

  const [regionCode, setRegionCode] = useState('');

  async function request() {
    return await getSpeciesListForRegion(regionCode);
  }

  const formContent = (
    <EbirdRegionCodeInput
      onChange={setRegionCode}
      value={regionCode}
    />
  );

  return (
    <BasePageList
      formContent={formContent}
      request={request}
      requiresApiKey
      title="Species List for a Region"
    />
  );
}
