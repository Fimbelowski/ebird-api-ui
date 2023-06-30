import { useState } from 'react';

import BackInput from '../../../components/BaseInput/BackInput';
import BasePageTableEbirdHotspot from '../../../components/BasePageTableEbirdHotspot';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import FormatSelect from '../../../components/FormatSelect';
import { NumberInput } from '../../../components/NumberInput';
import useNearbyHotspots from '../../../services/ebird/hooks/endpoints/ref/hotspot/useNearbyHotspots';
import ebirdHotspotCsvParser from './ebirdHotspotCsvParser';
import LocationInputGroup from '../../../components/LocationInputGroup/LocationInputGroup';

export default function NearbyHotspots() {
  const getNearbyHotspots = useNearbyHotspots();

  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('');
  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function onSubmit() {
    return await getNearbyHotspots(latitude, longitude, back, distance, format);
  }

  const formContent = (
    <>
      <LocationInputGroup
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <NumberInput
        id="distance"
        label="Distance (km)"
        max={500}
        min={0}
        onChange={setDistance}
        placeholder="25"
        value={distance}
      />
      <BackInput
        onChange={setBack}
        placeholder="7"
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
      title="Nearby hotspots"
    />
  );
}
