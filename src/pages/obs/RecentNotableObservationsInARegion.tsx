import { useState } from 'react';

import BackInput from '../../components/BaseInput/BackInput';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import type EbirdObservationDetailLevel from '../../types/EbirdObservationDetailLevel';
import EbirdObservationDetailLevelSelect from '../../components/EbirdObservationDetailLevelSelect';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';
import LocationTextarea from '../../components/LocationTextarea';
import MaxResultsInput from '../../components/MaxResultsInput';
import useRecentNotableObservationsInARegion from '../../services/ebird/hooks/endpoints/data/obs/useRecentNotableObservationsInARegion';

export default function RecentNotableObservationsInARegion() {
  const getRecentNotableObservationsInAregion =
    useRecentNotableObservationsInARegion();

  const [back, setBack] = useState('14');
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [lastDetailLevel, setLastDetailLevel] =
    useState<EbirdObservationDetailLevel>();
  const [locale, setLocale] = useState('en');
  const [maxResults, setMaxResults] = useState('');
  const [obsLocations, setObsLocations] = useState<string[]>([]);
  const [onlyObsFromHotspots, setOnlyObsFromHotspots] = useState(false);
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    setLastDetailLevel(detailLevel);

    return await getRecentNotableObservationsInAregion(
      regionCode,
      back,
      detailLevel,
      onlyObsFromHotspots,
      maxResults,
      obsLocations,
      locale
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
      <EbirdObservationDetailLevelSelect
        onChange={setDetailLevel}
        value={detailLevel}
      />
      <EbirdOnlyObsFromHotspotsInput
        onChange={setOnlyObsFromHotspots}
        value={onlyObsFromHotspots}
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
      detailLevel={lastDetailLevel}
      formContent={formContent}
      onSubmit={onSubmit}
      title="Recent Notable Observations in a Region"
    />
  );
}
