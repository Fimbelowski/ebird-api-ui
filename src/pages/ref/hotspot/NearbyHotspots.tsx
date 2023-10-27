import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePageTableEbirdHotspot from '../../../components/BasePageTableEbirdHotspot';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import FormatSelect from '../../../components/FormatSelect';
import useNearbyHotspots from '../../../services/ebird/hooks/endpoints/ref/hotspot/useNearbyHotspots';
import ebirdHotspotCsvParser from './ebirdHotspotCsvParser';
import LocationInputGroup from '../../../components/LocationInputGroup/LocationInputGroup';
import DistanceInput from '../../../components/DistanceInput';
import Fieldset from '../../../components/Fieldset/Fieldset';
import PAGE from './PAGE';

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
      <Fieldset legendText="Location">
        <LocationInputGroup
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <DistanceInput
          max="500"
          onChange={setDistance}
          value={distance}
        />
      </Fieldset>
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
      page={PAGE.NearbyHotspots}
      parser={format === 'csv' ? ebirdHotspotCsvParser : undefined}
    />
  );
}
