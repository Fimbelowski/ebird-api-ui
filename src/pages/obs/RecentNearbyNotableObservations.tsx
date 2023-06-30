import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useRecentNearbyNotableObservations from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyNotableObservations';
import type EbirdObservationDetailLevel from '../../types/EbirdObservationDetailLevel';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdObservationDetailLevelSelect from '../../components/EbirdObservationDetailLevelSelect';
import { NumberInput } from '../../components/NumberInput';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';

export default function RecentNearbyNotableObservations() {
  const getRecentNearbyNotableObservations =
    useRecentNearbyNotableObservations();

  const [back, setBack] = useState('');
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [distance, setDistance] = useState('');
  const [hotspot, setHotspot] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');

  async function onSubmit() {
    return await getRecentNearbyNotableObservations(
      latitude,
      longitude,
      back,
      detailLevel,
      distance,
      hotspot,
      maxResults,
      locale
    );
  }

  const formContent = (
    <>
      <LocationInputGroup
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <BackInput
        onChange={setBack}
        value={back}
      />
      <EbirdObservationDetailLevelSelect
        onChange={setDetailLevel}
        value={detailLevel}
      />
      <NumberInput
        id="distance"
        label="Distance"
        max={50}
        min={0}
        onChange={setDistance}
        placeholder="25"
        value={distance}
      />
      <EbirdOnlyObsFromHotspotsInput
        onChange={setHotspot}
        value={hotspot}
      />
      <MaxResultsInput
        onChange={setMaxResults}
        value={maxResults}
      />
      <LocaleSelect
        onChange={setLocale}
        value={locale}
      />
    </>
  );

  return (
    <BasePageTableEbirdObservation
      formContent={formContent}
      onSubmit={onSubmit}
      title="Recent Nearby Notable Observations"
    />
  );
}
