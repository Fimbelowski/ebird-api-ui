import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import {
  useRecentNearbyObservations,
  type EbirdRecentNearbyObservationsSortBy,
} from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyObservations';
import type EbirdTaxonomyCategory from '../../types/EbirdTaxonomyCategory';

export default function RecentNearbyObservations() {
  const getRecentNearbyObservations = useRecentNearbyObservations();

  const [back, setBack] = useState('');
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [distance, setDistance] = useState('');
  const [hotspot, setHotspot] = useState(false);
  const [includeProvisional, setIncludeProvisional] = useState();
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');
  const [sortBy, setSortBy] =
    useState<EbirdRecentNearbyObservationsSortBy>('date');

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

  return (
    <BasePageTableEbirdObservation
      onSubmit={onSubmit}
      title="Recent Nearby Observations"
    />
  );
}
