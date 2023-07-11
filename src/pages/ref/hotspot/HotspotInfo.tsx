import { useState } from 'react';

import { BasePageKeyValuePairsList } from '../../../components/BasePageKeyValuePairsList';
import type EbirdLocation from '../../../types/EbirdLocation';
import useHotspotInfo from '../../../services/ebird/hooks/endpoints/ref/hotspot/useHotspotInfo';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';

export default function HotspotInfo() {
  const getHotspotInfo = useHotspotInfo();

  const [locationId, setLocationId] = useState('');

  async function onSubmit() {
    return await getHotspotInfo(locationId);
  }

  const formContent = (
    <EbirdRegionCodeInput
      allowLocation
      label="Location ID"
      onChange={setLocationId}
      value={locationId}
    />
  );

  return (
    <BasePageKeyValuePairsList<EbirdLocation>
      description="Fetches information about a specified hotspot."
      formContent={formContent}
      onSubmit={onSubmit}
      title="Hotspot Info"
    />
  );
}
