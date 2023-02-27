import { type ChangeEvent, type FormEvent, useState } from 'react';

import BasePage from '../../../components/BasePage';
import DetailedLocationTable from '../../../components/DetailedLocationTable';
import Details from '../../../components/Details';
import type EbirdLocation from '../../../types/EbirdLocation';
import Form from '../../../components/Form';
import getValueFromChangeEvent from '../../../utilities/getValueFromChangeEvent';
import ResultsContainer from '../../../components/ResultsContainer';
import SimpleLocationTable from '../../../components/SimpleLocationTable';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useApiKeyRequired from '../../../hooks/useApiKeyRequired';

const FORM_ID = 'hotspot-info';

export default function HotspotInfo() {
  useApiKeyRequired(false);

  const [hasQueried, setHasQueried] = useState(false);
  const [hotspot, setHotspot] = useState<EbirdLocation>();
  const [locationId, setLocationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');

  const ebirdApi = useEbirdApi();

  function getHotspotInfo(event: FormEvent) {
    event.preventDefault();

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

  function Results() {
    if (hotspot === undefined) {
      return null;
    }

    return (
      <ResultsContainer>
        <Details summary="Raw Response">{rawResponse}</Details>
        <Details summary="Detailed Table">
          <DetailedLocationTable locations={[hotspot]} />
        </Details>
        <Details
          open
          summary="Simplified Table"
        >
          <SimpleLocationTable locations={[hotspot]} />
        </Details>
      </ResultsContainer>
    );
  }

  function showResults() {
    return hasQueried && !loading;
  }

  return (
    <BasePage title="Hotspot Info">
      <Form
        id={FORM_ID}
        loading={loading}
        onSubmit={getHotspotInfo}
      >
        <TextInput
          id="loc-id"
          label="Location ID"
          onChange={onLocationIdChange}
          placeholder="L140473"
          required
          value={locationId}
        />
      </Form>
      {loading ? <p>Loading...</p> : null}
      {showResults() ? <Results /> : null}
    </BasePage>
  );
}
