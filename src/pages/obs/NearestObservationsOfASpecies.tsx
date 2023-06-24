import { useState } from 'react';

import { BasePage } from '../../components/BasePage/BasePage';
import useNearestObservationsOfASpecies from '../../services/ebird/hooks/endpoints/data/obs/useNearestObservationsOfASpecies';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';

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

  function onLoad(result: unknown) {
    console.log(result);
  }

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
    <EbirdSpeciesCodeInput
      onChange={setSpeciesCode}
      required
      value={speciesCode}
    />
  );

  return (
    <BasePage
      formContent={formContent}
      onLoad={onLoad}
      onSubmit={onSubmit}
      requiresApiKey
      title="Nearest Observations of a Species"
    />
  );
}
