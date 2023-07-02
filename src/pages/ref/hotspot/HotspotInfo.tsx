import { useState } from 'react';

import { BasePage } from '../../../components/BasePage/BasePage';
import Details from '../../../components/Details/Details';
import type EbirdLocation from '../../../types/EbirdLocation';
import EbirdLocationTableDetailed from '../../../components/EbirdLocationTableDetailed';
import EbirdLocationTableSimple from '../../../components/EbirdLocationTableSimple';
import { TextInput } from '../../../components/TextInput';
import useHotspotInfo from '../../../services/ebird/hooks/endpoints/ref/hotspot/useHotspotInfo';

export default function HotspotInfo() {
  const getHotspotInfo = useHotspotInfo();

  const [hotspot, setHotspot] = useState<EbirdLocation>();
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
      description="Fetches information about a specified hotspot."
      formContent={formContent}
      onLoad={setHotspot}
      onSubmit={onSubmit}
      resultsContent={resultsContent}
      title="Hotspot Info"
    />
  );
}
