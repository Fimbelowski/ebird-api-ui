import { useState } from 'react';

import useNearestObservationsOfASpecies from '../../services/ebird/hooks/endpoints/data/obs/useNearestObservationsOfASpecies';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import IncludeProvisionalObservationsInput from '../../components/IncludeProvisionalObservationsInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import { NumberInput } from '../../components/NumberInput';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';

export default function NearestObservationOfASpecies() {
  const getNearestObservationsOfASpecies = useNearestObservationsOfASpecies();

  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('');
  const [includeProvisionalObservations, setIncludeProvisionalObservations] =
    useState(false);
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);
  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getNearestObservationsOfASpecies(
      speciesCode,
      latitude,
      longitude,
      back,
      onlyObservationsFromHotspots,
      includeProvisionalObservations,
      maxResults,
      locale,
      distance
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
      <EbirdOnlyObservationsFromHotspotsInput
        onChange={setOnlyObservationsFromHotspots}
        value={onlyObservationsFromHotspots}
      />
      <IncludeProvisionalObservationsInput
        onChange={setIncludeProvisionalObservations}
        value={includeProvisionalObservations}
      />
      <MaxResultsInput
        max={3000}
        onChange={setMaxResults}
        placeholder="3000"
        value={maxResults}
      />
      <SpeciesCommonNameLocaleSelect
        onChange={setLocale}
        value={locale}
      />
      <NumberInput
        id="distance"
        label="Within Distance (km)"
        max={50}
        min={0}
        onChange={setDistance}
        placeholder="50"
        value={distance}
      />
    </>
  );

  return (
    <BasePageTableEbirdObservation
      formContent={formContent}
      onSubmit={onSubmit}
      title="Nearest Observations of a Species"
    />
  );
}
