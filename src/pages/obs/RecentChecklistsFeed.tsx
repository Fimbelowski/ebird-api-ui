import { useState } from 'react';

import BasePageTableEbirdChecklist from '../../components/BasePageTableEbirdChecklist';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import { NumberInput } from '../../components/NumberInput';
import useRecentChecklistsFeed from '../../services/ebird/hooks/endpoints/data/obs/useRecentChecklistsFeed';

export default function RecentChecklistsFeed() {
  const getRecentChecklists = useRecentChecklistsFeed();

  const [maxResults, setMaxResults] = useState('');
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    return await getRecentChecklists(regionCode, maxResults);
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
      <NumberInput
        id="max-results"
        label="Max Results"
        max={200}
        min={1}
        onChange={setMaxResults}
        placeholder="10"
        value={maxResults}
      />
    </>
  );

  return (
    <BasePageTableEbirdChecklist
      formContent={formContent}
      onSubmit={onSubmit}
      requiresApiKey
      title="Recent Checklists"
    />
  );
}
