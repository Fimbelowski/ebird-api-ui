import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import EbirdHotspotTableDetailed from '../../../components/EbirdHotspotTableDetailed';
import type EbirdFormat from '../../../types/EbirdFormat';
import FormatSelect from '../../../components/FormatSelect';
import EBIRD_HOTSPOT_CSV_HEADERS from '../../../utilities/ebirdHotspotCsvHeaders';
import EbirdHotspotTableSimple from '../../../components/EbirdHotspotTableSimple';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function HotspotsRegion() {
  const [back, setBack] = useState('');
  const [format, setFormat] = useState<EbirdFormat>('csv');
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [regionCode, setRegionCode] = useState('');

  const { getRegionHotspots } = useEbirdApi();

  async function request() {
    return await getRegionHotspots(regionCode, back, format);
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        onChange={setRegionCode}
        required
        value={regionCode}
      />
      <BackInput
        id="back"
        onChange={setBack}
        value={back}
      />
      <FormatSelect
        id="format"
        onChange={setFormat}
        value={format}
      />
    </>
  );

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
    <BasePage<EbirdHotspot[]>
      csvHeaders={EBIRD_HOTSPOT_CSV_HEADERS}
      formContent={formContent}
      onLoad={setHotspots}
      request={request}
      resultsContent={ResultsContent()}
      title="Hotspots in a Region"
    />
  );
}
