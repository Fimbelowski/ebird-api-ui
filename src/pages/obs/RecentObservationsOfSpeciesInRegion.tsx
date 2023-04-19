import { useState } from 'react';

export default function RecentObservationsOfSpeciesInRegion() {
  const [back, setBack] = useState(14);
  const [includeProvisionalObs, setIncludeProvisionalObs] = useState(false);
  const [locale, setLocale] = useState('en');
  const [maxResults, setMaxResults] = useState<number>();
  const [obsLocations, setObsLocations] = useState<string[]>([]);
  const [onlyObsFromHotspots, setOnlyObsFromHotspots] = useState(false);
  const [regionCode, setRegionCode] = useState('');
  const [speciesCode, setSpeciesCode] = useState('');

  return <></>;
}
