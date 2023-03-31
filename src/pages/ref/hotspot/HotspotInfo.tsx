import { useState } from 'react';

import { BasePage } from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdLocation from '../../../types/EbirdLocation';
import EbirdLocationTableDetailed from '../../../components/EbirdLocationTableDetailed';
import EbirdLocationTableSimple from '../../../components/EbirdLocationTableSimple';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function HotspotInfo() {
  const { getHotspotInfo } = useEbirdApi();

  const [hotspot, setHotspot] = useState<EbirdLocation>();
  const [locationId, setLocationId] = useState('');

  async function request() {
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

  const resultsContent =
    hotspot !== undefined ? (
      <>
        <Details summary="Detailed Table">
          <EbirdLocationTableDetailed locations={[hotspot]} />
        </Details>
        <Details
          open
          summary="Simplified Table"
        >
          <EbirdLocationTableSimple locations={[hotspot]} />
        </Details>
      </>
    ) : null;

  return (
    <BasePage<EbirdLocation>
      formContent={formContent}
      onLoad={setHotspot}
      request={request}
      resultsContent={resultsContent}
      title="Hotspot Info"
    />
  );
}
