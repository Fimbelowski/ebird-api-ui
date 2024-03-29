import { useState } from 'react';

import BackInput from '../../components/BackInput';
import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import type EbirdObservationDetailLevel from '../../types/EbirdObservationDetailLevel';
import EbirdObservationDetailLevelSelect from '../../components/EbirdObservationDetailLevelSelect';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import MaxResultsInput from '../../components/MaxResultsInput';
import useRecentNotableObservationsInARegion from '../../services/ebird/hooks/endpoints/data/obs/useRecentNotableObservationsInARegion';
import LocationsInput from '../../components/LocationsInput';
import PAGE from './PAGE';

export default function RecentNotableObservationsInARegion() {
  const getRecentNotableObservationsInAregion =
    useRecentNotableObservationsInARegion();

  const [back, setBack] = useState('');
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [lastDetailLevel, setLastDetailLevel] =
    useState<EbirdObservationDetailLevel>();
  const [locale, setLocale] = useState('en');
  const [maxResults, setMaxResults] = useState('');
  const [obsLocations, setObsLocations] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    setLastDetailLevel(detailLevel);

    return await getRecentNotableObservationsInAregion(
      regionCode,
      back,
      detailLevel,
      onlyObservationsFromHotspots,
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
    </>
  );

  const formOptionsFieldsetContent = (
    <>
      <EbirdObservationDetailLevelSelect
        onChange={setDetailLevel}
        value={detailLevel}
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
      detailLevel={lastDetailLevel}
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.RecentNotableObservationsInARegion}
    />
  );
}
