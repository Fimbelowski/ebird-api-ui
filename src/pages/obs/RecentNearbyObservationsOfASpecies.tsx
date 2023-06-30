import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useRecentNearbyObservationsOfASpecies from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyObservationsOfASpecies';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BaseInput/BackInput';
import { NumberInput } from '../../components/NumberInput';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';

export default function RecentNearbyObservationsOfASpecies() {
  const getRecentNearbyObservationsOfASpecies =
    useRecentNearbyObservationsOfASpecies();

  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('');
  const [hotspot, setHotspot] = useState(false);
  const [includeProvisional, setIncludeProvisional] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getRecentNearbyObservationsOfASpecies(
      speciesCode,
      latitude,
      longitude,
      back,
      distance,
      hotspot,
      includeProvisional,
      maxResults,
      locale
    );
  }

  const formContent = (
    <>
      <EbirdSpeciesCodeInput
        onChange={setSpeciesCode}
        required
        value={speciesCode}
      />
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
      <NumberInput
        id="distance"
        label="Distance"
        max={50}
        min={0}
        onChange={setDistance}
        placeholder="25"
        value={distance}
      />
      <EbirdOnlyObservationsFromHotspotsInput
        onChange={setHotspot}
        value={hotspot}
      />
      <EbirdIncludeProvisionalInput
        onChange={setIncludeProvisional}
        value={includeProvisional}
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
      title="Recent Nearby Observations of a Species"
    />
  );
}
