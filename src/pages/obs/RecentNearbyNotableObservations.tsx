import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useRecentNearbyNotableObservations from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyNotableObservations';
import type EbirdObservationDetailLevel from '../../types/EbirdObservationDetailLevel';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BackInput';
import EbirdObservationDetailLevelSelect from '../../components/EbirdObservationDetailLevelSelect';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import DistanceInput from '../../components/DistanceInput';
import Fieldset from '../../components/Fieldset/Fieldset';
import PAGE from './PAGE';

export default function RecentNearbyNotableObservations() {
  const getRecentNearbyNotableObservations =
    useRecentNearbyNotableObservations();

  const [back, setBack] = useState('');
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [distance, setDistance] = useState('');
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);

  async function onSubmit() {
    return await getRecentNearbyNotableObservations(
      latitude,
      longitude,
      back,
      detailLevel,
      distance,
      onlyObservationsFromHotspots,
      maxResults,
      locale
    );
  }

  const formContent = (
    <>
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
      detailLevel={detailLevel}
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.RecentNearbyNotableObservations}
    />
  );
}
