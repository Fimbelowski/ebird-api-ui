import { useState } from 'react';

import useNearestObservationsOfASpecies from '../../services/ebird/hooks/endpoints/data/obs/useNearestObservationsOfASpecies';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';
import { NumberInput } from '../../components/NumberInput';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';

export default function NearestObservationOfASpecies() {
  const getNearestObservationsOfASpecies = useNearestObservationsOfASpecies();

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
    return await getNearestObservationsOfASpecies(
      speciesCode,
      latitude,
      longitude,
      back,
      hotspot,
      includeProvisional,
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
      <EbirdOnlyObsFromHotspotsInput
        onChange={setHotspot}
        value={hotspot}
      />
      <EbirdIncludeProvisionalInput
        onChange={setIncludeProvisional}
        value={includeProvisional}
      />
      <MaxResultsInput
        max={3000}
        onChange={setMaxResults}
        placeholder="3000"
        value={maxResults}
      />
      <LocaleSelect
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
