import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import BackInput from '../../components/BackInput';
import CheckboxInput from '../../components/CheckboxInput';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import LocaleSelect from '../../components/LocaleSelect';
import LocationTextarea from '../../components/LocationTextarea';
import { NumberInput } from '../../components/NumberInput';
import useEbirdApi from '../../hooks/useEbirdApi';

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
      <CheckboxInput
        id="hotspot"
        label="Only Fetch Observations From Hotspots"
        onChange={setOnlyObsFromHotspots}
        value={onlyObsFromHotspots}
      />
      <CheckboxInput
        id="include-provisional"
        label="Include Provisional Observations"
        onChange={setIncludeProvisionalObs}
        value={includeProvisionalObs}
      />
      <NumberInput
        id="max-results"
        label="Max Results"
        max={10000}
        min={1}
        onChange={setMaxResults}
        placeholder="100"
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
      requiresApiKey
      title="Recent Observations in a Region"
    />
  );
}
