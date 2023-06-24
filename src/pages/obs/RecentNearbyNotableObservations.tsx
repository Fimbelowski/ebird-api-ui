import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useRecentNearbyNotableObservations from '../../services/ebird/hooks/endpoints/data/obs/useRecentNearbyNotableObservations';
import type EbirdObservationDetailLevel from '../../types/EbirdObservationDetailLevel';

export default function RecentNearbyNotableObservations() {
  const getRecentNearbyNotableObservations =
    useRecentNearbyNotableObservations();

  const [back, setBack] = useState();
  const [detailLevel, setDetailLevel] =
    useState<EbirdObservationDetailLevel>('simple');
  const [distance, setDistance] = useState('');
  const [hotspot, setHotspot] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [locale, setLocale] = useState('en');
  const [longitude, setLongitude] = useState('');
  const [maxResults, setMaxResults] = useState('');

  async function onSubmit() {
    return await getRecentNearbyNotableObservations(
      latitude,
      longitude,
      back,
      detailLevel,
      distance,
      hotspot,
      maxResults,
      locale
    );
  }

  return (
    <BasePageTableEbirdObservation
      onSubmit={onSubmit}
      title="Recent Nearby Notable Observations"
    />
  );
}
