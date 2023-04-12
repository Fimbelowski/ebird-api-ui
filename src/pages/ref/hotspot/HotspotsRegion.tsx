import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePageTableEbirdHotspot from '../../../components/BasePageTableEbirdHotspot';
import EbirdRegionCodeInput from '../../../components/EbirdRegionCodeInput';
import type EbirdFormat from '../../../types/EbirdFormat';
import FormatSelect from '../../../components/FormatSelect';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function HotspotsRegion() {
  const { getRegionHotspots } = useEbirdApi();

  const [back, setBack] = useState<number>();
  const [format, setFormat] = useState<EbirdFormat>('csv');
  const [regionCode, setRegionCode] = useState('');

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

  return (
    <BasePageTableEbirdHotspot
      formContent={formContent}
      request={request}
      title="Hotspots in a Region"
    />
  );
}
