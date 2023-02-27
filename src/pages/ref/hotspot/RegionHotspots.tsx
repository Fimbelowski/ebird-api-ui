import { type ChangeEvent, type FormEvent, useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePage from '../../../components/BasePage';
import csvToArray from '../../../utilities/csvToArray';
import DetailedHotspotTable from '../../../components/DetailedHotspotTable';
import Details from '../../../components/Details';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import Form from '../../../components/Form';
import Format from '../../../types/Format';
import FormatSelect from '../../../components/FormatSelect';
import getValueFromChangeEvent from '../../../utilities/getValueFromChangeEvent';
import isJson from '../../../utilities/isJson';
import ResultsContainer from '../../../components/ResultsContainer';
import SimpleHotspotsTable from '../../../components/SimpleHotspotTable';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useApiKeyRequired from '../../../hooks/useApiKeyRequired';

const FORM_ID = 'region-hotspots';

export default function RegionHotspots() {
  useApiKeyRequired(false);

  const [back, setBack] = useState('');
  const [format, setFormat] = useState<Format>(Format.Csv);
  const [hasQueried, setHasQueried] = useState(false);
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');
  const [regionCode, setRegionCode] = useState('');

  const ebirdApi = useEbirdApi();

  function getRegionHotspots(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    ebirdApi
      .getRegionHotspots(regionCode, back, format)
      .then(async (response) => await response.text())
      .then((data) => {
        setHotspots(
          isJson(data)
            ? JSON.parse(data)
            : csvToArray(data, [
                'locId',
                'countryCode',
                'subnational1Code',
                'subnational2Code',
                'lat',
                'lng',
                'locName',
                'latestObsDt',
                'numSpeciesAllTime',
              ])
        );
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

  function onBackChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setBack(value);
  }

  function onFormatChange(format: Format) {
    setFormat(format);
  }

  function onRegionCodeChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setRegionCode(value);
  }

  function showResults() {
    return hasQueried && !loading;
  }

  return (
    <BasePage title="Hotspots in a Region">
      <Form
        id={FORM_ID}
        loading={loading}
        onSubmit={getRegionHotspots}
      >
        <TextInput
          id="region-code"
          label="Region Code"
          onChange={onRegionCodeChange}
          placeholder="US-CO"
          required
          value={regionCode}
        />
        <BackInput
          id="back"
          onChange={onBackChange}
          value={back}
        />
        <FormatSelect
          id="format"
          onChange={onFormatChange}
          value={format}
        />
      </Form>
      {loading ? <p>Loading...</p> : null}
      {showResults() ? (
        <ResultsContainer>
          <Details summary="Raw Response">{rawResponse}</Details>
          <Details summary="Detailed Table">
            <DetailedHotspotTable hotspots={hotspots} />
          </Details>
          <Details summary="Simplified Table">
            <SimpleHotspotsTable hotspots={hotspots} />
          </Details>
        </ResultsContainer>
      ) : null}
    </BasePage>
  );
}
