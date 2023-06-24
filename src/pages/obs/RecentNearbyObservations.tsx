import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import {
  useRecentNearbyObservations,
  type EbirdRecentNearbyObservationsSortBy,
} from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyObservations';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';
import LocationInputGroup from '../../components/LocationInputGroup/LocationInputGroup';
import BackInput from '../../components/BaseInput/BackInput';
import EbirdTaxonomyCategorySelect from '../../components/EbirdTaxonomyCategorySelect';
import { NumberInput } from '../../components/NumberInput';
import EbirdOnlyObsFromHotspotsInput from '../../components/EbirdOnlyObsFromHotspotsInput';
import EbirdIncludeProvisionalInput from '../../components/EbirdIncludeProvisionalInput';
import MaxResultsInput from '../../components/MaxResultsInput';
import { Select, type SelectOptionArray } from '../../components/Select/Select';
import LocaleSelect from '../../components/LocaleSelect/LocaleSelect';

export default function RecentNearbyObservations() {
  const getRecentNearbyObservations = useRecentNearbyObservations();

  const [back, setBack] = useState('');
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [distance, setDistance] = useState('');
  const [hotspot, setHotspot] = useState(false);
  const [includeProvisional, setIncludeProvisional] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');
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
      hotspot,
      includeProvisional,
      maxResults,
      sortBy,
      locale
    );
  }

  const formContent = (
    <>
      <LocationInputGroup
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <BackInput
        onChange={setBack}
        placeholder="14"
        value={back}
      />
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <NumberInput
        id="distance"
        label="Distance"
        max={50}
        min={0}
        onChange={setDistance}
        placeholder="25"
        value={distance}
      />
      <EbirdOnlyObsFromHotspotsInput
        onChange={setHotspot}
        value={hotspot}
      />
      <EbirdIncludeProvisionalInput
        onChange={setIncludeProvisional}
        value={includeProvisional}
      />
      <MaxResultsInput
        onChange={setMaxResults}
        value={maxResults}
      />
      <Select
        id="sort-by"
        label="Sort By"
        onChange={setSortBy}
        options={sortBySelectOptions}
        value={sortBy}
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
      title="Recent Nearby Observations"
    />
  );
}