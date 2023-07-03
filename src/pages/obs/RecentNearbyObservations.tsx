import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import { useRecentNearbyObservations } from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyObservations';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import EbirdOnlyObservationsFromHotspotsInput from '../../components/EbirdOnlyObservationsFromHotspotsInput';
import IncludeProvisionalObservationsInput from '../../components/IncludeProvisionalObservationsInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import { Select, type SelectOptionArray } from '../../components/Select/Select';
import SpeciesCommonNameLocaleSelect from '../../components/SpeciesCommonNameLocaleSelect';
import type EbirdRecentNearbyObservationsSortBy from '../../types/EbirdRecentNearbyObservationsSortBy';
import DistanceInput from '../../components/DistanceInput';
import Fieldset from '../../components/Fieldset/Fieldset';

export default function RecentNearbyObservations() {
  const getRecentNearbyObservations = useRecentNearbyObservations();

  const [back, setBack] = useState('');
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [distance, setDistance] = useState('');
  const [includeProvisionalObservations, setIncludeProvisionalObservations] =
    useState(false);
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [onlyObservationsFromHotspots, setOnlyObservationsFromHotspots] =
    useState(false);
  const [sortBy, setSortBy] =
    useState<EbirdRecentNearbyObservationsSortBy>('date');

  const sortBySelectOptions: SelectOptionArray<EbirdRecentNearbyObservationsSortBy> =
    [
      {
        label: 'Date',
        value: 'date',
      },
      {
        label: 'Species',
        value: 'species',
      },
    ];

  async function onSubmit() {
    return await getRecentNearbyObservations(
      latitude,
      longitude,
      back,
      category,
      distance,
      onlyObservationsFromHotspots,
      includeProvisionalObservations,
      maxResults,
      sortBy,
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
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
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
        onChange={setIncludeProvisionalObservations}
        value={includeProvisionalObservations}
      />
    </>
  );

  const formOptionsFieldsetContent = (
    <>
      <Select
        id="sort-by"
        label="Sort By"
        onChange={setSortBy}
        options={sortBySelectOptions}
        value={sortBy}
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
      description="Fetches a list of recent observations of birds seen at locations near a given set of coordinates. Results include only the most recent observation for each species in the region specified."
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      title="Recent Nearby Observations"
    />
  );
}
