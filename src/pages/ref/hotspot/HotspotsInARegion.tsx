import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePageTableEbirdHotspot from '../../../components/BasePageTableEbirdHotspot';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import FormatSelect from '../../../components/FormatSelect';
import useHotspotsInARegion from '../../../services/ebird/hooks/endpoints/ref/hotspot/useHotspotsInARegion';
import ebirdHotspotCsvParser from './ebirdHotspotCsvParser';
import PAGE from './PAGE';

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
        allowCountry
        allowSubnational1
        allowSubnational2
        onChange={setRegionCode}
        value={regionCode}
      />
      <BackInput
        onChange={setBack}
        placeholder="7"
        value={back}
      />
    </>
  );

  const formOptionsFieldsetContent = (
    <FormatSelect
      onChange={setFormat}
      value={format}
    />
  );

  return (
    <BasePageTableEbirdHotspot
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.HotspotsInARegion}
      parser={format === 'csv' ? ebirdHotspotCsvParser : undefined}
    />
  );
}
