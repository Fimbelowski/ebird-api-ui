import { useState } from 'react';

import BackInput from '../../../components/BaseInput/BackInput';
import BasePageTableEbirdHotspot from '../../../components/BasePageTableEbirdHotspot';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import FormatSelect from '../../../components/FormatSelect';
import useNearbyHotspots from '../../../services/ebird/hooks/endpoints/ref/hotspot/useNearbyHotspots';
import ebirdHotspotCsvParser from './ebirdHotspotCsvParser';
import LocationInputGroup from '../../../components/LocationInputGroup/LocationInputGroup';
import DistanceInput from '../../../components/DistanceInput';

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
      <DistanceInput
        max="500"
        onChange={setDistance}
        value={distance}
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
      description="Fetches a list of hotspots near a given location."
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      parser={format === 'csv' ? ebirdHotspotCsvParser : undefined}
      title="Nearby hotspots"
    />
  );
}
