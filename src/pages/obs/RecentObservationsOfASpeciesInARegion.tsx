import { useState } from 'react';

import BackInput from '../../components/BaseInput/BackInput';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import EbirdSpeciesCodeInput from '../../components/EbirdSpeciesCodeInput';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';
import LocationTextarea from '../../components/LocationTextarea';
import MaxResultsInput from '../../components/MaxResultsInput';
import useRecentObservationsOfASpeciesInARegion from '../../services/ebird/hooks/endpoints/data/obs/useRecentObservationsOfASpeciesInARegion';

export default function RecentObservationsOfASpeciesInARegion() {
  const getRecentObservationsOfASpeciesInARegion =
    useRecentObservationsOfASpeciesInARegion();

  const [back, setBack] = useState('');
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [maxResults, setMaxResults] = useState('');
  const [obsLocations, setObsLocations] = useState<string[]>([]);
  const [onlyObsFromHotspots, setOnlyObsFromHotspots] = useState(false);
  const [regionCode, setRegionCode] = useState('');
  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getRecentObservationsOfASpeciesInARegion(
      regionCode,
      speciesCode,
      back,
      onlyObsFromHotspots,
      includeProvisionalObs,
      maxResults,
      obsLocations,
      locale
    );
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        allowCountry
        allowLocation
        allowSubnational1
        allowSubnational2
        onChange={setRegionCode}
        value={regionCode}
      />
      <EbirdSpeciesCodeInput
        onChange={setSpeciesCode}
        required
        value={speciesCode}
      />
      <BackInput
        onChange={setBack}
        value={back}
      />
      <EbirdOnlyObsFromHotspotsInput
        onChange={setOnlyObsFromHotspots}
        value={onlyObsFromHotspots}
      />
      <EbirdIncludeProvisionalInput
        onChange={setIncludeProvisionalObs}
        value={includeProvisionalObs}
      />
      <MaxResultsInput
        onChange={setMaxResults}
        value={maxResults}
      />
      <LocationTextarea
        onChange={setObsLocations}
        value={obsLocations}
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
      title="Recent Observations of a Species in a Region"
    />
  );
}
