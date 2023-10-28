import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useRecentNearbyObservationsOfASpecies from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyObservationsOfASpecies';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BackInput';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import IncludeProvisionalObservationsInput from '../../components/IncludeProvisionalObservationsInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import DistanceInput from '../../components/DistanceInput';
import Fieldset from '../../components/Fieldset/Fieldset';
import PAGE from './PAGE';

export default function RecentNearbyObservationsOfASpecies() {
  const getRecentNearbyObservationsOfASpecies =
    useRecentNearbyObservationsOfASpecies();

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
    return await getRecentNearbyObservationsOfASpecies(
      speciesCode,
      latitude,
      longitude,
      back,
      distance,
      onlyObservationsFromHotspots,
      includeProvisionalObservations,
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
      <Fieldset legendText="Location">
        <LocationInputGroup
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <DistanceInput
          onChange={setDistance}
          value={distance}
        />
      </Fieldset>
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
    </>
  );

  const formOptionsFieldsetContent = (
    <>
      <MaxResultsInput
        onChange={setMaxResults}
        value={maxResults}
      />
      <SpeciesCommonNameLocaleSelect
        onChange={setLocale}
        value={locale}
      />
    </>
  );

  return (
    <BasePageTableEbirdObservation
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.RecentNearbyObservationsOfASpecies}
    />
  );
}
