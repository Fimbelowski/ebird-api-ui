import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import EbirdHotspotTableDetailed from '../../../components/EbirdHotspotTableDetailed';
import type EbirdFormat from '../../../types/EbirdFormat';
import FormatSelect from '../../../components/FormatSelect';
import EbirdHotspotTableSimple from '../../../components/EbirdHotspotTableSimple';
import parseEbirdHotspotRequestData from '../../../utilities/parseEbirdHotspotRequestData';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useRequestState from '../../../hooks/useRequestState';

export default function RegionHotspots() {
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [back, setBack] = useState('');
  const [format, setFormat] = useState<EbirdFormat>('csv');
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [regionCode, setRegionCode] = useState('');

  const { getRegionHotspots } = useEbirdApi();

  const formContent = (
    <>
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
    </>
  );

  function onBackChange(value: string) {
    setBack(value);
  }

  function onFormatChange(format: EbirdFormat) {
    setFormat(format);
  }

  function onRegionCodeChange(value: string) {
    setRegionCode(value);
  }

  function onSubmit() {
    setLoading(true);

    getRegionHotspots(regionCode, back, format)
      .then(async (response) => await response.text())
      .then((data) => {
        const parsedData = parseEbirdHotspotRequestData(data);
        setHotspots(parsedData);
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

  function ResultsContent() {
    return (
      <>
        <Details summary="Detailed Table">
          <EbirdHotspotTableDetailed hotspots={hotspots} />
        </Details>
        <Details
          open
          summary="Simplified Table"
        >
          <EbirdHotspotTableSimple hotspots={hotspots} />
        </Details>
      </>
    );
  }

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      resultsContent={ResultsContent()}
      title="Hotspots in a Region"
    />
  );
}
