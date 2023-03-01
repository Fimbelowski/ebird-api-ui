import { type ChangeEvent, useState } from 'react';

import BasePage from '../../../components/BasePage';
import DetailedLocationTable from '../../../components/DetailedLocationTable';
import Details from '../../../components/Details';
import type EbirdLocation from '../../../types/EbirdLocation';
import getValueFromChangeEvent from '../../../utilities/getValueFromChangeEvent';
import SimpleLocationTable from '../../../components/SimpleLocationTable';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function HotspotInfo() {
  const [hasQueried, setHasQueried] = useState(false);
  const [hotspot, setHotspot] = useState<EbirdLocation>();
  const [locationId, setLocationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');

  const ebirdApi = useEbirdApi();

  function getHotspotInfo() {
    setLoading(true);

    ebirdApi
      .getHotspotInfo(locationId)
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

  function onLocationIdChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setLocationId(value);
  }

  const formContent = (
    <TextInput
      id="loc-id"
      label="Location ID"
      onChange={onLocationIdChange}
      placeholder="L140473"
      required
      value={locationId}
    />
  );

  const resultsContent =
    hotspot !== undefined ? (
      <>
        <Details summary="Detailed Table">
          <DetailedLocationTable locations={[hotspot]} />
        </Details>
        <Details
          open
          summary="Simplified Table"
        >
          <SimpleLocationTable locations={[hotspot]} />
        </Details>
      </>
    ) : null;

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={getHotspotInfo}
      rawResponse={rawResponse}
      resultsContent={resultsContent}
      title="Hotspot Info"
    />
  );
}
