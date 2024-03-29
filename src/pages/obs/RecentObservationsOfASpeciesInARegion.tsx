import { useState } from 'react';

import BackInput from '../../components/BackInput';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import IncludeProvisionalObservationsInput from '../../components/IncludeProvisionalObservationsInput';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import MaxResultsInput from '../../components/MaxResultsInput';
import useRecentObservationsOfASpeciesInARegion from '../../services/ebird/hooks/endpoints/data/obs/useRecentObservationsOfASpeciesInARegion';
import LocationsInput from '../../components/LocationsInput';
import PAGE from './PAGE';

export default function RecentObservationsOfASpeciesInARegion() {
  const getRecentObservationsOfASpeciesInARegion =
    useRecentObservationsOfASpeciesInARegion();

  const [back, setBack] = useState('');
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [maxResults, setMaxResults] = useState('');
  const [obsLocations, setObsLocations] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);
  const [regionCode, setRegionCode] = useState('');
  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getRecentObservationsOfASpeciesInARegion(
      regionCode,
      speciesCode,
      back,
      onlyObservationsFromHotspots,
      includeProvisionalObs,
      maxResults,
      obsLocations,
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
      <EbirdRegionCodeInput
        allowCountry
        allowLocation
        allowSubnational1
        allowSubnational2
        onChange={setRegionCode}
        value={regionCode}
      />
      <LocationsInput
        onChange={setObsLocations}
        value={obsLocations}
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
        onChange={setIncludeProvisionalObs}
        value={includeProvisionalObs}
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
      page={PAGE.RecentObservationsOfASpeciesInARegion}
    />
  );
}
