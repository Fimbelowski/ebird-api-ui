import { useState } from 'react';

import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function RecentObservationsOfSpeciesInRegion() {
  const { getRecentObservationsOfSpeciesInRegion } = useEbirdApi();

  const [back, setBack] = useState(14);
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [maxResults, setMaxResults] = useState<number>();
  const [obsLocations, setObsLocations] = useState<string[]>([]);
  const [onlyObsFromHotspots, setOnlyObsFromHotspots] = useState(false);
  const [regionCode, setRegionCode] = useState('');
  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getRecentObservationsOfSpeciesInRegion(
      regionCode,
      speciesCode,
      back,
      onlyObsFromHotspots,
      includeProvisionalObs,
      maxResults,
      obsLocations,
      locale
    );
  }

  return (
    <BasePageTableEbirdObservation
      onSubmit={onSubmit}
      title="Recent Observations of a Species in a Region"
    />
  );
}
