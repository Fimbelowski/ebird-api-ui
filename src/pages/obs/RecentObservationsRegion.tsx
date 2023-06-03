import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import type EbirdTaxonomyCategory from '../../services/ebird/types/EbirdTaxonomyCategory';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';
import LocationTextarea from '../../components/LocationTextarea';
import MaxResultsInput from '../../components/MaxResultsInput';
import useEbirdApi from '../../services/ebird/useEbirdApi';

export default function RecentObservationsRegion() {
  const { getRecentObservationsInARegion } = useEbirdApi();

  const [back, setBack] = useState(14);
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [locations, setLocations] = useState<string[]>([]);
  const [maxResults, setMaxResults] = useState<number>();
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
        onChange={setRegionCode}
        required
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
