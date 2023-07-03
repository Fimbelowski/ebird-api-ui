import { useState } from 'react';

import { BasePageKeyValuePairsList } from '../../../components/BasePageKeyValuePairsList';
import type EbirdLocation from '../../../types/EbirdLocation';
import { TextInput } from '../../../components/TextInput';
import useHotspotInfo from '../../../services/ebird/hooks/endpoints/ref/hotspot/useHotspotInfo';

export default function HotspotInfo() {
  const getHotspotInfo = useHotspotInfo();

  const [locationId, setLocationId] = useState('');

  async function onSubmit() {
    return await getHotspotInfo(locationId);
  }

  const formContent = (
    <TextInput
      id="loc-id"
      label="Location ID"
      onChange={setLocationId}
      placeholder="L140473"
      required
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
