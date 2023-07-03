import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import BackInput from '../../components/BaseInput/BackInput';
import IncludeProvisionalObservationsInput from '../../components/IncludeProvisionalObservationsInput';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import MaxResultsInput from '../../components/MaxResultsInput';
import useRecentObservationsInARegion from '../../services/ebird/hooks/endpoints/data/obs/useRecentObservationsInARegion';
import LocationsInput from '../../components/LocationsInput';

export default function RecentObservationsInARegion() {
  const getRecentObservationsInARegion = useRecentObservationsInARegion();

  const [back, setBack] = useState('');
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [locations, setLocations] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    return await getRecentObservationsInARegion(
      regionCode,
      back,
      category,
      onlyObservationsFromHotspots,
      includeProvisionalObs,
      maxResults,
      locations
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
      <LocationsInput
        onChange={setLocations}
        value={locations}
      />
      <BackInput
        onChange={setBack}
        value={back}
      />
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <EbirdOnlyObservationsFromHotspotsInput
        onChange={setOnlyObservationsFromHotspots}
        value={onlyObservationsFromHotspots}
      />
      <IncludeProvisionalObservationsInput
        onChange={setIncludeProvisionalObs}
        value={includeProvisionalObs}
      />
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
      description="Get the list of recent observations of birds seen in a country, state, county, or location. Results include only the most recent observation for each species in the region specified."
      formContent={formContent}
      onSubmit={onSubmit}
      title="Recent Observations in a Region"
    />
  );
}
