import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdLocation from '../../../types/EbirdLocation';
import EbirdLocationTableDetailed from '../../../components/EbirdLocationTableDetailed';
import EbirdLocationTableSimple from '../../../components/EbirdLocationTableSimple';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useRequestState from '../../../hooks/useRequestState';

export default function HotspotInfo() {
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [hotspot, setHotspot] = useState<EbirdLocation>();
  const [locationId, setLocationId] = useState('');

  const { getHotspotInfo } = useEbirdApi();

  function onSubmit() {
    setLoading(true);

    getHotspotInfo(locationId)
      .then(async (response) => await response.text())
      .then((data) => {
        setHotspot(JSON.parse(data));

        setRawResponse(data);
        setHasQueried(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      resultsContent={resultsContent}
      title="Hotspot Info"
    />
  );
}
