import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';
import LocationTextarea from '../../components/LocationTextarea';
import MaxResultsInput from '../../components/MaxResultsInput';
import useRecentObservationsInARegion from '../../services/ebird/hooks/endpoints/data/obs/useRecentObservationsInARegion';

export default function RecentObservationsInARegion() {
  const getRecentObservationsInARegion = useRecentObservationsInARegion();

  const [back, setBack] = useState('');
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [locations, setLocations] = useState<string[]>([]);
  const [maxResults, setMaxResults] = useState('');
  const [onlyObsFromHotspots, setOnlyObsFromHotspots] = useState(false);
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    return await getRecentObservationsInARegion(
      regionCode,
      back,
      category,
      onlyObsFromHotspots,
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
      <BackInput
        onChange={setBack}
        value={back}
      />
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
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
        onChange={setLocations}
        value={locations}
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
      title="Recent Observations in a Region"
    />
  );
}
