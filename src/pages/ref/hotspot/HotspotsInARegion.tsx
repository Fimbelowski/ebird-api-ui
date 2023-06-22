import { useState } from 'react';

import BackInput from '../../../components/BaseInput/BackInput';
import BasePageTableEbirdHotspot from '../../../components/BasePageTableEbirdHotspot';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import FormatSelect from '../../../components/FormatSelect';
import useHotspotsInARegion from '../../../services/ebird/hooks/endpoints/ref/hotspot/useHotspotsInARegion';
import ebirdHotspotCsvParser from './ebirdHotspotCsvParser';

export default function HotspotsInARegion() {
  const getRegionHotspots = useHotspotsInARegion();

  const [back, setBack] = useState('');
  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
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
        onChange={setBack}
        value={back}
      />
      <FormatSelect
        onChange={setFormat}
        value={format}
      />
    </>
  );

  return (
    <BasePageTableEbirdHotspot
      formContent={formContent}
      onSubmit={onSubmit}
      parser={format === 'csv' ? ebirdHotspotCsvParser : undefined}
      title="Hotspots in a Region"
    />
  );
}
