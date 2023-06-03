import { useState } from 'react';

import BasePageTableEbirdChecklist from '../../components/BasePageTableEbirdChecklist';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import { NumberInput } from '../../components/NumberInput';
import useEbirdApi from '../../services/ebird/useEbirdApi';

export default function RecentChecklists() {
  const { getRecentChecklists } = useEbirdApi();

  const [maxResults, setMaxResults] = useState(10);
  const [regionCode, setRegionCode] = useState('');

  async function onSubmit() {
    return await getRecentChecklists(regionCode, maxResults);
  }

  const formContent = (
    <>
      <EbirdRegionCodeInput
        onChange={setRegionCode}
        required
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
